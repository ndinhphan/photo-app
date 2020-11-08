


## Available Scripts

###  Start api server:
``` 
cd api
npm start
```

### Initialize Database:

```
cd api
mongo photoapp scripts/init.mongo.js
```

## GraphQL playground:
### Open [http://localhost:3000/graphql](http://localhost:3000/graphql) 

## Sample api:

```
query{
  userList{
    id firstname lastname description
  }
}
```
```

```
