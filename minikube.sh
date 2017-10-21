#!/bin/bash
projectName=$1
if [ -z "$projectName" ]; then
  echo "Please execute with minikube [name]"
  exit
fi
echo "Building $projectName..."
minikube start --insecure-registry localhost:5000
kubectl config use-context minikube
kubectl apply -f ./minikube-registry.yaml
eval $(minikube docker-env)
docker build . -t $projectName
imagePath=localhost:5000/$projectName
docker tag $projectName $imagePath
docker push $imagePath
kubectl config use-context minikube
kubectl create namespace $projectName
sed -e "s/{{projectName}}/$projectName/g" -e "s#{{imagePath}}#$imagePath#g" ./kubernetes.yaml | kubectl apply -f -
# eval $(echo "kubectl run $projectName --image=localhost:5000/$projectName $(cat .env | xargs -n 1 | while read x ; do printf ' --env='$x'' ; done) --port=8080")
# kubectl expose deployment $projectName --type=NodePort
minikube service -n $projectName $projectName
