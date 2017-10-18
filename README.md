# How to Run
1. install chrome
2. install node.js v8.7.0
3. install yarn v1.2.1
4. ```yarn && yarn start:dev```

# Environment Variables
- create `.env` file for local
```
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