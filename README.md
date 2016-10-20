# api-frontend-example
This frontend is just for demonstration use. You may extend or modify to your liking. There are currently 2 endpoints defined:

`/` --> fetch report data and show it as dashboard

`/save` --> Output of the report data as JSON



To run this application, you need go (https://golang.org) to be installed, and GOPATH to be set.

## Installation

In the repository directory:

Fetch the go dependencies and build the application:

    go get
    go build

Build the static frontend files:

    npm install
    grunt

Set the environment variables, described under `Setup`.

Start the server

    ./api-frontend-example

## Setup

The application is configured over environment variables. These have to be set to get it running:

Name | Required | Description
---- | -------- | -----------
NIMUBSEC_KEY | x | Nimbusec API Key
NIMUBSEC_SECRET | x | Nimbusec API Secret
NIMUBSEC_URL | x | Nimbusec API URL
NIMBUSEC_REPORT_LOGO |  | If you want your own logo on the report, set this option. Defaults to static folder `/static/img/nimbusec-logo.png` but you can also use an URL like `https://nimbusec.com/images/logo/logo-200-54.png`
PORT |  | Defaults to port `3000`

Once done you may open the application in your browser pointing to http://localhost:3000 .

## Modifications

As it is an example, you can modify the application to your needs anytime. If you like to change the templates, images or anything static -> have a look in the `public` folder. 
