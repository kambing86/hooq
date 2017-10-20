# How to Run
1. install chrome
2. install node.js v8.7.0
3. install yarn v1.2.1
4. ```yarn && yarn start```

# Environment Variables
- create `.env` file for local and deployment
```
NODE_ENV=production
MOVIE_DB_3_KEY=<API_KEY>
```

# Key Features
- Express with Webpack 2
- React with Redux / React Router
- GraphQL (https://github.com/graphql/graphql-js)
- Offline storage with localForage (https://github.com/localForage/localForage)
- Support Typescript
- Docker in Heroku (https://kambing86-hooq.herokuapp.com)
- Docker in Kubernetes / Minikube
- Docker in Openshift / Minishift

# How to deploy to Heroku
```bash
#!/bin/bash
heroku login
heroku container:login
heroku git:remote -a kambing86-hooq
heroku container:push web
```

# How to deploy to Minikube
start minikube with local registry
```bash
#!/bin/bash
eval $(minikube docker-env)
docker build . -t hooq
docker tag hooq localhost:5000/hooq
docker push localhost:5000/hooq
kubectl config use-context minikube
kubectl run hooq --image=localhost:5000/hooq --env="MOVIE_DB_3_KEY=<API_KEY>" --port=8080
kubectl expose deployment hooq --type=NodePort
minikube service hooq
```

# How to deploy to Minishift
start minishift
```bash
#!/bin/bash
eval $(minishift docker-env)
docker build . -t hooq
eval $(minishift oc-env)
oc config use-context minishift
docker login -u developer -p $(oc whoami -t) $(minishift openshift registry)
docker tag hooq $(minishift openshift registry)/myproject/hooq
docker push $(minishift openshift registry)/myproject/hooq
oc new-app --image-stream=hooq --name=hooq --env="MOVIE_DB_3_KEY=<API_KEY>"
oc expose dc hooq --name=hooq --type=NodePort --port=8080
oc expose service hooq
minishift openshift service hooq --in-browser
```

# Export yaml
```bash
oc export all --as-template=hooq > hooq.yaml
kubectl get --export -o yaml > minikube.yaml
# or
kubectl get po,deployment,rc,rs,ds,no,job -o yaml > minikube.yaml
for n in $(kubectl get -o=name pvc,configmap,serviceaccount,secret,ingress,service,deployment,statefulset,hpa,job,cronjob)
do
    mkdir -p $(dirname $n)
    kubectl get -o=yaml --export $n > $n.yaml
done
```