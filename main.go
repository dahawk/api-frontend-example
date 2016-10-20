package main

import (
	"errors"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/cumulodev/nimbusec"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Controller is somewhat like a brain for this application
type Controller struct {
	tpl        *template.Template
	nimbusec   *nimbusec.API
	reports    ReportList
	reportlogo string
}

// DomainReport specifies a row in the table of the report
type DomainReport struct {
	URL           string `json:"url"`
	Webshell      int    `json:"webshell"`
	Malware       int    `json:"malware"`
	Application   int    `json:"application"`
	Text          int    `json:"content"`
	Reputation    int    `json:"reputation"`
	TLS           int    `json:"tls"`
	Configuration int    `json:"configuration"`
}

// V is an abstract data object like model in a java mvc application
type V map[string]interface{}

func main() {
	ctl := &Controller{
		reportlogo: "/static/img/nimbusec-logo.png",
	}

	rl := os.Getenv("NIMBUSEC_REPORT_LOGO")
	if rl != "" {
		ctl.reportlogo = rl
	}

	// setup clients to whatever
	var errapi error
	ctl.nimbusec, errapi = nimbusec.NewAPI(
		os.Getenv("NIMBUSEC_URL"),
		os.Getenv("NIMBUSEC_KEY"),
		os.Getenv("NIMBUSEC_SECRET"))
	if errapi != nil {
		log.Fatal(errapi)
	}

	var errtpl error
	ctl.tpl, errtpl = template.ParseGlob("public/*.html")
	if errtpl != nil {
		log.Fatalf("failed to parse templates: %v", errtpl)
	}

	// create http router
	router := mux.NewRouter()
	router.HandleFunc("/", ctl.Dashboard)
	router.HandleFunc("/save", ctl.SaveReport)
	//router.HandleFunc("/report/{name}", ctl.OpenReport)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("public")))

	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		Error(w, r, http.StatusNotFound, errors.New("not found"))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Printf("[ info] listening on :%s ...", port)
	app := handlers.LoggingHandler(os.Stdout, router)
	http.ListenAndServe(":"+port, app)
}

// ReportList makes the Domainreports sortable
type ReportList []*DomainReport

func (l ReportList) Len() int {
	return len(l)
}

func (l ReportList) Less(i, j int) bool {
	return l[i].URL < l[j].URL
}

func (l ReportList) Swap(i, j int) {
	l[j], l[i] = l[i], l[j]
}
