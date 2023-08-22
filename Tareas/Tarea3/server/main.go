package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type User struct {
	Title string `json:"title"`
	Year  string `json:"year"`
	Genre string `json:"genre"`
}

var db *sql.DB
var err error

func main() {

	//db, err = sql.Open("mysql", "root:123456@tcp(localhost:3306)/dbTarea3")
	db, err = sql.Open("mysql", "root:secret@tcp(db)/dbDocker")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	router := mux.NewRouter()
	//Middleware
	router.Use(mux.CORSMethodMiddleware(router))

	router.HandleFunc("/users", getUser).Methods("GET")
	router.HandleFunc("/createUser", createUser).Methods("POST")
	handler := cors.Default().Handler(router)
	http.ListenAndServe(":8000", handler)
	http.Handle("/", router)
}

// Método que me va a devolver los usuarios
func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var users []User
	result, err := db.Query("SELECT title, year, genre FROM user")
	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	for result.Next() {
		var user User
		err := result.Scan(&user.Title, &user.Year, &user.Genre)
		if err != nil {
			panic(err.Error())
		}
		users = append(users, user)
	}

	json.NewEncoder(w).Encode(users)
}

func createUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	sentenciaSQL := "INSERT INTO user(title,year,genre) VALUES(?,?,?)"

	statement, err := db.Prepare(sentenciaSQL)
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	title := keyVal["title"]
	year := keyVal["year"]
	genre := keyVal["genre"]

	_, err = statement.Exec(title, year, genre)
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprint(w, "Canción-Almacenada")
}
