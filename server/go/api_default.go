/*
 * Restic Restore Server
 *
 * ...
 *
 * API version: 2020-04-04T07:24:59Z
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	// "encoding/json"
	"net/http"
	"strings"
	// "github.com/gorilla/mux"
)

// A DefaultApiController binds http requests to an api service and writes the service results to the http response
type DefaultApiController struct {
	service DefaultApiServicer
}

// NewDefaultApiController creates a default api controller
func NewDefaultApiController(s DefaultApiServicer) Router {
	return &DefaultApiController{service: s}
}

// Routes returns all of the api route for the DefaultApiController
func (c *DefaultApiController) Routes() Routes {
	return Routes{
		{
			"GetSnapshots",
			strings.ToUpper("Get"),
			"/snapshots",
			c.GetSnapshots,
		},
	}
}

// GetSnapshots -
func (c *DefaultApiController) GetSnapshots(w http.ResponseWriter, r *http.Request) {
	result, err := c.service.GetSnapshots()
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}