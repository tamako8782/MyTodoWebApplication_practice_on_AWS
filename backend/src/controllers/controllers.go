package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/tamako8782/MyTodoWebApplication_practice/services"
)

type MyTaskControllers struct {
	s *services.MyTaskService
}

func NewMyTaskControllers(s *services.MyTaskService) *MyTaskControllers {
	return &MyTaskControllers{s: s}
}

func (c MyTaskControllers) ListTaskHandler(w http.ResponseWriter, r *http.Request) {
	queryMap := r.URL.Query()

	var page int
	if p, ok := queryMap["page"]; ok && len(p) > 0 {
		var err error
		page, err = strconv.Atoi(p[0])
		if err != nil {
			http.Error(w, "failed get query parameter", http.StatusBadRequest)

		}
	} else {
		page = 1
	}

	log.Println(page)

	taskList, err := c.s.ListTaskService(page)
	if err != nil {
		http.Error(w, "internal exec ", http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(taskList)

}
