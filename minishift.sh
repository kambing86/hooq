#!/bin/bash
projectName=$1
echo "Building $projectName..."
minishift config set vm-driver virtualbox
minishift start
eval $(minishift docker-env)
docker build . -t $projectName
eval $(minishift oc-env)
oc config use-context minishift
docker login -u developer -p $(oc whoami -t) $(minishift openshift registry)
docker tag $projectName $(minishift openshift registry)/myproject/$projectName
docker push $(minishift openshift registry)/myproject/$projectName
eval $(echo "oc new-app --image-stream=$projectName --name=$projectName $(cat .env | xargs -n 1 | while read x ; do printf ' --env='$x'' ; done)")
oc expose dc $projectName --name=$projectName --type=NodePort --port=8080
oc expose service $projectName
minishift openshift service $projectName --in-browser
