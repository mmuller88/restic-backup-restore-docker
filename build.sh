#!/bin/sh

set -e

echo "Build binary using golang docker image"
docker run --rm -ti \
    -v "`pwd`":/go/src/github.com/restic/restic \
    -w /go/src/github.com/restic/restic golang:1.13.6-alpine go run build.go
