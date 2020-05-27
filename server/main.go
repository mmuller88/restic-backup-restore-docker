/*
 * Restic Restore Server
 *
 * ...
 *
 * API version: 2020-04-04T07:24:59Z
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package main

import (
	"log"
	"net/http"

	openapi "github.com/mmuller88/restic-backup-restore-docker/server/go"
)

func main() {
	log.Printf("Server started")

	InstancesApiService := openapi.NewInstancesApiService()
	InstancesApiController := openapi.NewInstancesApiController(InstancesApiService)

	router := openapi.NewRouter(InstancesApiController)

	log.Fatal(http.ListenAndServe(":8080", router))
}
