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

func (s MyTaskService) CreateTaskService(task models.MyTodo) (models.MyTodo, error) {

	addtask, err := repositories.CreateTaskRepo(s.db, task)
	if err != nil {
		log.Println(err)
		return models.MyTodo{}, err
	}

	return addtask, nil
}

func (s MyTaskService) DetailTaskService(id int) (models.MyTodo, error) {
	task, err := repositories.DetailTaskRepo(id, s.db)
	if err != nil {
		log.Println(err)
		return models.MyTodo{}, err
	}

	return task, nil
}
