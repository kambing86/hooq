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
```
heroku login
heroku container:login
heroku git:remote -a kambing86-hooq
heroku container:push web
```