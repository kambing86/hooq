# How to Run
1. install chrome
2. install node.js v8.9.0
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
install minikube
```bash
brew cask install minikube
brew install kubectl
```
start minikube with local registry
```bash
./minikube.sh hooq
```

# How to deploy to Minishift
install minishift
```bash
brew cask install minishift
```
start minishift
```bash
./minishift.sh hooq
```
