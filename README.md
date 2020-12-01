


## Available Scripts
###  Start ui server:
```
cd ui
npm start
```
###  Start api server:
``` 
cd api
npm start
```

### Initialize Database:

```
cd api
node scripts/init.mysql.js
(Run Mysql script in mysql workbench for now)
```

## GraphQL playground:
### Open [http://localhost:3000/graphql](http://localhost:3000/graphql) 
<br>

## example:

```
query{
  userList{
    id username firstname lastname description
  }
}
```
```
query{
  postList{
    _id id userid source visibility date description
  }
}
```
```
mutation{
  userCreate(user:{
    firstname:"Janet",
    usernme: "janetdoe",
    lastname:"Doe",
    description:"whatever the fuck this is",
  })
    {
    id, firstname, lastname, description
  }
}
```
```
mutation{
  userUpdate(id:1, changes:{firstname:"Jean", lastname:"Doe", description:"Updated user"}){
    firstname, lastname, description
  }
}
```
```
mutation UserDelete($id: Int!) {
  userDelete(id: $id)
}
(query variables: {"id":1})
```


```
mutation{
  postCreate(post:{
    userid: 2,
    source: "google.com/img/2",
    visibility: Public,
    description: "samira hack version 2 lole xD!!"
  }){
    _id id userid source visibility date description
  }
}
```

