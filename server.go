package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Score struct {
	name  string
	score int
}

func main() {

	db, err := sql.Open("mysql",
		"root:password@tcp(127.0.0.1:3306)/prod")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	leaderboard := func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			fmt.Println("Geting High Scores")
			w.Header().Set("Content-Type", "application/json")
			je := json.NewEncoder(w)

			posts, err := db.Query("select name, score from highscores")

			defer posts.Close()

			for posts.Next() {
				var name string
				var score int
				if err := posts.Scan(&name, &score); err != nil {
					log.Fatal(err)
				}
				fmt.Printf("%s", name)
				fmt.Printf("%v", score)
				// Do something (can be a function that I pass as a parameter)
			}

			if err != nil {
				return
			}
			je.Encode(posts)

		case "POST":
			fmt.Println("Post Request")
			insert, err := db.Query("INSERT INTO highscore VALUES('" + "')")
			if err != nil {
				panic(err.Error())
			}
			defer insert.Close()
		}
	}

	fs := http.FileServer(http.Dir("./client_src/build"))
	http.Handle("/", fs)
	http.HandleFunc("/leaderboard", leaderboard)
	http.ListenAndServe(":8080", nil)
}
