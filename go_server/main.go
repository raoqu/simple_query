package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type QueryRequest struct {
	Username string `json:"username"`
	Mobile   string `json:"mobile"`
}

func queryHandler(w http.ResponseWriter, r *http.Request) {
	var request QueryRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		httpResponseError(w, err)
		return
	}

	response := fmt.Sprintf("username: %s\nmobile: %s", request.Username, request.Mobile)
	httpResponseText(w, response)
}

func main() {

	http.HandleFunc("/api/query", queryHandler)
	http.ListenAndServe("127.0.0.1:7777", nil)
}
