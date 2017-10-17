# How to Run
1. install chrome
2. install node.js v8.6.0
3. install yarn v1.1.0
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

# How to deploy
```bash
heroku login
heroku container:login
heroku git:remote -a kambing86-hooq
heroku container:push web
```

# How to deploy to Minikube
start minikube with local registry
```bash
eval $(minikube docker-env)
docker build . -t hooq
docker tag hooq localhost:5000/hooq
docker push localhost:5000/hooq
kubectl run hooq --env="MOVIE_DB_3_KEY=<API_KEY>" --image=localhost:5000/hooq --port=8080
kubectl expose deployment hooq --type=NodePort
minikube service hooq --url
```