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

var testData = []models.MyTodo{
	{
		ID:    1,
		Title: "test Todo",
		State: "InComplete",
	}, {
		ID:    2,
		Title: "test2 Todo",
		State: "Finished",
	},
}

var testDB *sql.DB

func startUpTestDb() error {
	dbUser := os.Getenv("MYSQL_USER")
	dbPassword := os.Getenv("MYSQL_PASSWORD")
	dbDatabase := os.Getenv("MYSQL_DATABASE")
	dbHost := os.Getenv("MYSQL_HOST")

	dbConn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?parseTime=true", dbUser, dbPassword, dbHost, dbDatabase)

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
	cmd := exec.Command("mysql", "-h", "yama-db", "-u", "app", "yamamysql", "--password=admin1234!", "-e", "source /app/src/cleanupDB.sql")
	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}

func setupDB() error {
	cmd := exec.Command("mysql", "-h", "yama-db", "-u", "app", "yamamysql", "--password=admin1234!", "-e", "source /app/src/setupDB.sql")
	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}
