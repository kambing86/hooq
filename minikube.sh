#!/bin/sh
projectName=$(node -e 'console.log(require("./package.json").name)')
echo "Building $projectName..."
minikube start --insecure-registry localhost:5000
kubectl config use-context minikube
sleep 10s
kubectl apply -f ./minikube-registry.yaml
eval $(minikube docker-env)
docker build . -t $projectName
imagePath=localhost:5000/$projectName
docker tag $projectName $imagePath
docker push $imagePath
kubectl config use-context minikube
kubectl create namespace $projectName
sed -e "s/{{projectName}}/$projectName/g" -e "s#{{imagePath}}#$imagePath#g" ./kubernetes.yaml | kubectl apply -f -
minikube service -n $projectName $projectName
