package repositories_test

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"os/exec"
	"testing"

	"github.com/tamako8782/MyTodoWebApplication_practice/models"

	_ "github.com/go-sql-driver/mysql"
)

var TestData = []models.MyTodo{
	{
		ID:      1,
		Title:   "first Task",
		Content: "My first Task",
		State:   "InComplete",
	},
	{
		ID:      2,
		Title:   "second Task",
		Content: "My second Task",
		State:   "Finished",
	},
}

var TestCreateData = []models.MyTodo{
	{
		ID:      3,
		Title:   "test3 Todo@create",
		Content: "test Todo third@create",
		State:   "InComplete",
	}, {
		ID:      4,
		Title:   "test4 Todo@create",
		Content: "test Todo fourth@create",
		State:   "Finished",
	},
}

var TestUpdateData = []models.MyTodo{
	{
		ID:      5,
		Title:   "test Todo [before] @update",
		Content: "test Todo [before] @update",
		State:   "NotDoTask",
	}, {
		ID:      5,
		Title:   "test Todo [after] @update",
		Content: "test Todo [after] @update",
		State:   "InComplete",
	},
}

var testDB *sql.DB
var (
	dbUser      = os.Getenv("MYSQL_USER")
	dbPassword  = os.Getenv("MYSQL_PASSWORD")
	dbDatabase  = os.Getenv("MYSQL_DATABASE")
	dbHost      = os.Getenv("MYSQL_HOST")
	dbCleanFile = "cleanupDB.sql"
	dbSetupFile = "setupDB.sql"

	dbConn = fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?parseTime=true", dbUser, dbPassword, dbHost, dbDatabase)
)

func startUpTestDb() error {

	var err error
	testDB, err = sql.Open("mysql", dbConn)
	if err != nil {
		log.Println(err)
	}
	if err = testDB.Ping(); err != nil {
		log.Fatalln(err)
	}

	if err = cleanupDB(); err != nil {
		log.Println(err)
	}

	if err = setupDB(); err != nil {
		log.Println(err)
	}
	return nil

}

func teardown() {
	cleanupDB()
	testDB.Close()
}

func TestMain(m *testing.M) {
	if err := startUpTestDb(); err != nil {
		os.Exit(1)
	}

	m.Run()

	teardown()

}

func cleanupDB() error {
	cmd := exec.Command("mysql", "-h", dbHost, "-u", dbUser, dbDatabase, "--password="+dbPassword, "--protocol=tcp", "-e", fmt.Sprintf("source ../%s", dbCleanFile))
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}

func setupDB() error {
	cmd := exec.Command("mysql", "-h", dbHost, "-u", dbUser, dbDatabase, "--password="+dbPassword, "--protocol=tcp", "-e", fmt.Sprintf("source ../%s", dbSetupFile))
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}
