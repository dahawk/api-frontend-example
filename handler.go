package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"sort"
	"time"
)

// Dashboard returns shows the current produced report
func (ctl *Controller) Dashboard(w http.ResponseWriter, r *http.Request) {
	today := time.Now().Format("2006-01-02")
	rd := map[int]*DomainReport{}

	issues, err := ctl.nimbusec.GetIssues()
	if err != nil {
		http.Error(w, err.Error(), http.StatusGatewayTimeout)
		return
	}

	domains, err := ctl.nimbusec.FindDomains("")
	if err != nil {
		http.Error(w, err.Error(), http.StatusGatewayTimeout)
		return
	}

	for _, domain := range domains {
		rd[domain.Id] = &DomainReport{
			URL: domain.Name,
		}
	}

	for _, issue := range issues {
		//log.Printf("processing DomainID %d --> rd %+v --> issue %+v\n", issue.DomainID, rd[issue.DomainID], issue)
		domainid := issue.DomainID
		category := issue.Category
		severity := issue.Severity
		if rd[domainid] == nil {
			log.Printf("no domain for issue %+v\n", issue)
			continue
		}

		switch category {
		case "webshell":
			rd[domainid].Webshell = severity
		case "malware":
			rd[domainid].Malware = severity
		case "tls":
			rd[domainid].TLS = severity
		case "application":
			rd[domainid].Application = severity
		case "text":
			rd[domainid].Text = severity
		case "reputation":
			rd[domainid].Reputation = severity
		case "configuration":
			rd[domainid].Configuration = severity
		}
	}

	// sort domains by name
	reports := make(ReportList, 0, len(rd))
	for _, value := range rd {
		reports = append(reports, value)
	}
	sort.Sort(reports)

	ctl.reports = reports

	if ctl.devmode {
		ctl.tpl, _ = template.ParseGlob("public/*.html")
	}
	err = ctl.tpl.ExecuteTemplate(w, "report.html", V{
		"reports": ctl.reports,
		"today":   today,
	})
	if err != nil {
		log.Printf("%+v", err)
	}
}

// SaveReport returns the report data in json format which can be saved and used in other apps or opened in this one again
func (ctl *Controller) SaveReport(w http.ResponseWriter, r *http.Request) {
	JSON(w, r, http.StatusOK, ctl.reports)
}

// JSON encodes v as json and writes it to the ResponseWriter.
func JSON(w http.ResponseWriter, r *http.Request, status int, v interface{}) error {
	w.Header().Add("content-type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if v == nil {
		return nil
	}

	return json.NewEncoder(w).Encode(v)
}

// Error sends an JSON error response back to the client and logs the error.
func Error(w http.ResponseWriter, r *http.Request, status int, err error) error {
	return JSON(w, r, status, map[string]string{
		"error": err.Error(),
	})
}
