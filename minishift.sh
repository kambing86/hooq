#!/bin/bash
minishift config set vm-driver virtualbox
minishift start
eval $(minishift docker-env)
docker build . -t hooq
eval $(minishift oc-env)
oc config use-context minishift
docker login -u developer -p $(oc whoami -t) $(minishift openshift registry)
docker tag hooq $(minishift openshift registry)/myproject/hooq
docker push $(minishift openshift registry)/myproject/hooq
eval $(echo "oc new-app --image-stream=hooq --name=hooq $(cat .env | xargs -n 1 | while read x ; do printf ' --env='$x'' ; done)")
oc expose dc hooq --name=hooq --type=NodePort --port=8080
oc expose service hooq
minishift openshift service hooq --in-browser