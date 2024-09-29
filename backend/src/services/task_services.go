package services

import (
	"log"

	"github.com/tamako8782/MyTodoWebApplication_practice/models"
	"github.com/tamako8782/MyTodoWebApplication_practice/repositories"
)

func (s MyTaskService) ListTaskService(page int) ([]models.MyTodo, error) {

	var Tasks []models.MyTodo
	Tasks, err := repositories.ListTaskRepo(s.db, page)
	if err != nil {
		log.Println(err)
	}

	return Tasks, nil
}
