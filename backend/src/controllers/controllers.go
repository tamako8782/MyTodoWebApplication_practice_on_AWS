package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/tamako8782/MyTodoWebApplication_practice/models"
)

func ListTaskHandler(w http.ResponseWriter, r *http.Request) {
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

	taskList := models.TestData

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(taskList)

}
