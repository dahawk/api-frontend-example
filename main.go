package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"text/template"

	"github.com/cumulodev/nimbusec"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

var (
	tpl    *template.Template
	key    string
	secret string
	apiurl string
)

// Data for templates
type Data struct {
	Bundles []nimbusec.Bundle
	Results []nimbusec.Result
	Users   []nimbusec.User
	Domains []nimbusec.Domain
}

func main() {
	port := flag.String("port", "3000", "Port used for webserver")
	flag.StringVar(&key, "key", "", "nimbusec API key")
	flag.StringVar(&secret, "secret", "", "nimbusec API secret")
	flag.StringVar(&apiurl, "apiurl", "https://api-dev.nimbusec.com/", "nimbusec API url")
	flag.Parse()

	var err error
	tpl, err = template.ParseGlob("public/*.html")
	if err != nil {
		log.Fatalf("failed to parse templates: %v", err)
	}

	router := mux.NewRouter()
	router.HandleFunc("/", getIndex)
	router.HandleFunc("/results/{q}/", getResults)
	router.HandleFunc("/users", getUsers)
	router.HandleFunc("/demoins", addDemo)
	router.HandleFunc("/reset", reset)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("public")))

	log.Printf("[ info] listening on :%s ...", *port)
	app := handlers.LoggingHandler(os.Stdout, router)
	http.ListenAndServe(":"+*port, app)
}

func reset(w http.ResponseWriter, r *http.Request) {
	api, err := nimbusec.NewAPI(apiurl, key, secret)
	if err != nil {
		log.Fatal(err)
	}

	// find and delete Demodomain
	domains, err := api.FindDomains("name eq \"expired.badssl.com\"")
	if err != nil {
		log.Fatal(err)
	}
	for _, d := range domains {
		api.DeleteDomain(&d, true)
	}
}

func addDemo(w http.ResponseWriter, r *http.Request) {
	api, err := nimbusec.NewAPI(apiurl, key, secret)
	if err != nil {
		log.Fatal(err)
	}

	bundles, err := api.FindBundles(nimbusec.EmptyFilter)
	if err != nil {
		log.Fatal(err)
	}

	var bundle = ""
	if bundles != nil {
		bundle = bundles[0].Id
	}

	domain := nimbusec.Domain{
		Bundle:    bundle,
		Name:      "expired.badssl.com",
		Scheme:    "https",
		DeepScan:  "https://expired.badssl.com",
		FastScans: []string{"https://expired.badssl.com/"},
	}
	_, err = api.CreateDomain(&domain)
	if err != nil {
		log.Fatal(err)
	}

	tpl.ExecuteTemplate(w, "data.html", nil)
}

func getIndex(w http.ResponseWriter, r *http.Request) {
	api, err := nimbusec.NewAPI(apiurl, key, secret)
	if err != nil {
		log.Fatal(err)
	}

	bundles, err := api.FindBundles(nimbusec.EmptyFilter)
	if err != nil {
		log.Fatal(err)
	}

	domains, err := api.FindDomains(nimbusec.EmptyFilter)
	if err != nil {
		log.Fatal(err)
	}

	data := Data{
		Bundles: bundles,
		Domains: domains,
	}
	tpl.ExecuteTemplate(w, "index.html", data)
}

func getResults(w http.ResponseWriter, r *http.Request) {
	api, err := nimbusec.NewAPI(apiurl, key, secret)
	if err != nil {
		log.Fatal(err)
	}

	vars := mux.Vars(r)
	q := vars["q"]

	filter := "severity ge 1"
	if q == "red" {
		filter = "severity eq 3"
	}
	if q == "yel" {
		filter = "severity eq 2"
	}

	// Get all infected domains
	domains, err := api.FindInfected(filter)
	if err != nil {
		log.Fatal(err)
	}

	// Get all results of infected domains
	var allres []nimbusec.Result
	for _, domain := range domains {
		results, err := api.FindResults(domain.Id, filter)
		if err != nil {
			log.Fatal(err)
		}
		for _, result := range results {
			allres = append(allres, result)
		}
	}

	data := Data{
		Results: allres,
	}

	tpl.ExecuteTemplate(w, "results.html", data)
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	api, err := nimbusec.NewAPI(apiurl, key, secret)
	if err != nil {
		log.Fatal(err)
	}

	users, err := api.FindUsers(nimbusec.EmptyFilter)
	if err != nil {
		log.Fatal(err)
	}

	data := Data{
		Users: users,
	}

	tpl.ExecuteTemplate(w, "users.html", data)
}
