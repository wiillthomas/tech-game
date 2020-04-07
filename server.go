package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type Score struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
}

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Fatal("Couldn't open env file")
	}

	sqlRootPass := os.Getenv("MYSQL_ROOT_PASSWORD")

	fmt.Printf("%s", sqlRootPass)

	connectionString := "root:" + sqlRootPass + "@tcp(db)/prod"

	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	leaderboard := func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":

			fmt.Println("Geting High Scores")
			w.Header().Set("Content-Type", "application/json")

			var output []Score

			posts, err := db.Query("select name, score from highscores order by score desc limit 5;")

			defer posts.Close()

			for posts.Next() {
				var name string
				var score int
				if err := posts.Scan(&name, &score); err != nil {
					log.Fatal(err)
				}
				post := Score{name, score}
				output = append(output, post)
			}

			if err != nil {
				fmt.Println("error")
				return
			}

			json.NewEncoder(w).Encode(output)

		case "POST":
			fmt.Println("Post Request")
			w.Header().Set("Content-Type", "application/json")
			jd := json.NewDecoder(r.Body)

			aScore := &Score{}

			err := jd.Decode(&aScore)

			if err != nil {
				fmt.Println("err decoding")
				w.WriteHeader(http.StatusBadRequest)
				return
			}

			insert, err := db.Query("INSERT INTO highscores VALUES('" + aScore.Name + "','" + strconv.Itoa(aScore.Score) + "')")

			if err != nil {
				fmt.Println("err posting to db")

				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			defer insert.Close()

			fmt.Println("Post Success")
			w.WriteHeader(http.StatusOK)

		}
	}

	fs := http.FileServer(http.Dir("./client_src/build"))

	http.Handle("/", fs)
	http.HandleFunc("/api/leaderboard", leaderboard)
	http.ListenAndServe(":8080", nil)
}
