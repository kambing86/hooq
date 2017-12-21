#!/bin/sh
projectName=$(node -e 'console.log(require("./package.json").name)')
echo "Building $projectName..."
minishift config set vm-driver virtualbox
minishift start
# minishift openshift config set --patch '{"routingConfig": {"subdomain": "'$(minishift ip)'.xip.io"}}'
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
oc expose service $projectName
minishift openshift service $projectName --in-browser
