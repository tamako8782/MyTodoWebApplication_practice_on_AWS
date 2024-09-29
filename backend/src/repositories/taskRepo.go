package repositories

import (
	"database/sql"
	"log"

	"github.com/tamako8782/MyTodoWebApplication_practice/models"
)

const (
	todoPerPage = 100
)

func ListTaskRepo(db *sql.DB, page int) ([]models.MyTodo, error) {

	sqlStr := `
		select task_id ,title, task_state
		from task
		limit ? offset ?;
	`

	rows, err := db.Query(sqlStr, todoPerPage, ((page - 1) * todoPerPage))
	if err != nil {
		log.Println(err)
	}

	taskArray := make([]models.MyTodo, 0)
	for rows.Next() {
		var task models.MyTodo
		rows.Scan(&task.ID, &task.Title)

		taskArray = append(taskArray, task)
	}

	return taskArray, nil

}
