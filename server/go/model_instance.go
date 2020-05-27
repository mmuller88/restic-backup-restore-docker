/*
 * Restic Restore Server
 *
 * ... 
 *
 * API version: 2020-04-04T07:24:59Z
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

type Instance struct {

	// User Instance Identifier created with node uuid
	AlfInstanceId map[string]interface{} `json:"alfInstanceId"`

	Status Status `json:"status"`

	AdminCredentials InstanceAdminCredentials `json:"adminCredentials"`
}