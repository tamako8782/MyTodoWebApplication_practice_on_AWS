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
