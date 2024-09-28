package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/tamako8782/MyTodoWebApplication_practice/controllers"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/task", controllers.ListTaskHandler).Methods(http.MethodGet)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // ReactアプリのURL
		AllowedMethods:   []string{"GET", "POST", "PATCH", "DELETE"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	// CORSミドルウェアをラップ

	myHandler := c.Handler(r)

	log.Println("listen to port :8080")
	http.ListenAndServe(":8080", myHandler)

}
