package repositories_test

import (
	"log"
	"testing"

	"github.com/tamako8782/MyTodoWebApplication_practice/repositories"
)

func TestListTaskRepo(t *testing.T) {

	expectedNum := 3
	log.Println("test")
	got, err := repositories.ListTaskRepo(testDB, 1)
	if err != nil {

		t.Fatal(err)
	}

	if num := len(got); num != expectedNum {
		t.Errorf("want %d but got %d todo\n", expectedNum, num)

	}

}

func TestCreateTaskRepo(t *testing.T) {
	testTask := TestData[0]

	exceptedNum := 4

	exec, err := repositories.CreateTaskRepo(testDB, testTask)
	if err != nil {
		t.Fatal(err)
	}

	if exec.ID != exceptedNum {
		t.Errorf("new task id is expected %d but got %d \n", exceptedNum, exec.ID)
	}

	t.Cleanup(func() {
		const sqlStr = `
		delete from task
		where task_id=?;
		`
		testDB.Exec(sqlStr, exec.ID)
	})

}
