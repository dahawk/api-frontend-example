# api-frontend-example
This frontend is just for demonstration use. You may extend or modify to your liking.

To run this application, you need go to be installed, and GOPATH to be set.

Start the server simply with

    go get
    go run main.go -key abc -secret abc

Open the application in a browser with http://localhost:3000

## Parameters

See available parameters by running

    go run main.go -h

port: OPTIONAL, specify the port the webserver should be listen. Default 3000

key: REQUIRED nimbusec api key

secret: REQUIRED nimbusec api secret

apiurl: OPTIONAL, set a different api url 
