#!/bin/bash
projectName=$1
if [ -z "$projectName" ]; then
  echo "Please execute with minishift [name]"
  exit
fi
echo "Building $projectName..."
minishift config set vm-driver virtualbox
minishift start
eval $(minishift docker-env)
docker build . -t $projectName
eval $(minishift oc-env)
oc config use-context minishift
oc new-project $projectName
docker login -u developer -p $(oc whoami -t) $(minishift openshift registry)
imagePath=$(minishift openshift registry)/$projectName/$projectName
docker tag $projectName $imagePath
docker push $imagePath
oc project $projectName
sed -e "s/{{projectName}}/$projectName/g" -e "s#{{imagePath}}#$imagePath#g" ./kubernetes.yaml | oc apply -f -
# eval $(echo "oc new-app --image-stream=$projectName --name=$projectName $(cat .env | xargs -n 1 | while read x ; do printf ' --env='$x'' ; done)")
# oc expose dc $projectName --name=$projectName --type=NodePort --port=8080
oc expose service $projectName
minishift openshift service $projectName --in-browser
