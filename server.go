package main

import (
	"net/http"
	"fmt"
)

leaderboard := func( w http.ResponseWriter, r *http.Request ) {
	switch r.Method {
	case "GET":
		fmt.Println("Get Request");

	case "POST":
		fmt.Println("Post Request");
	}

}

func main() {
	fs := http.FileServer(http.Dir("./client_src/build"))
	http.Handle("/", fs)
	http.HandleFunc("/leaderboard", leaderboard)
	http.ListenAndServe(":8080", nil)
}
