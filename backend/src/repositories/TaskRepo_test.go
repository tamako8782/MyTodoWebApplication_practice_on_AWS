package repositories_test

import (
	"log"
	"testing"

	"github.com/tamako8782/MyTodoWebApplication_practice/models"
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
	testTask := TestCreateData[0]

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

func TestDetailRepo(t *testing.T) {

	tests := []struct {
		testTitle string
		excpted   models.MyTodo
	}{
		{
			testTitle: "subtest1",
			excpted:   TestData[0],
		},
		{
			testTitle: "subtest2",
			excpted:   TestData[1],
		},
	}

	for _, test := range tests {
		t.Run(test.testTitle, func(t *testing.T) {
			got, err := repositories.DetailTaskRepo(test.excpted.ID, testDB)
			if err != nil {
				t.Fatal(err)
			}

			if got.ID != test.excpted.ID {
				t.Errorf("ID:get %d but want %d\n", got.ID, test.excpted.ID)
			}
		})
	}

}
