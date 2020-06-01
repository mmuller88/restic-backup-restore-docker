#!/bin/sh

PWD=$(pwd)
docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
-i /local/restic.yaml \
-g nodejs-express-server \
-o local/server
