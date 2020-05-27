# restic-backup-restore-docker
A Docker Image for backuping files with restic and restoring them with a go server created with openApi

# Create Go Server
This are the instructions to create the server out from the swagger file

```BASH
docker run --rm -v {PWD}:/local openapitools/openapi-generator-cli generate
-i restic.yaml
-g k6
-o /local/k6-test/
–skip-validate-spec
```