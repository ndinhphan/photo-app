


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
Check .env file to config mysql server
```

## GraphQL playground:
### Open [http://localhost:3000/graphql](http://localhost:3000/graphql) 
<br>

## User APIs:

```
query user($id: Int!) {
  user(id: $id) {
    firstname
    username
    lastname
    source
    description
  	createdAt
    posts{
      id
    	source
    	description
    	visibility
    	createdAt
    	userId
    }
  }
}
```


```
query {
  userList {
    id
    firstname
    username
    lastname
    email
    source
    description
    createdAt
  }
}
```

```
mutation {
  userCreate(
    user: {
      firstname: "Janet"
      username: "janetdoe"
      lastname: "Doe"
      description: "whatever this is"
      email: "janetdoe@gmail.com"
    }
  ) {
    id
    firstname
    lastname
    description
    source
    email
    createdAt
  }
}
```

```
mutation {
  userUpdate(
    id: 1
    changes: { firstname: "Jean", lastname: "Doe", description: "Updated user" }
  ) {
    firstname
    lastname
    description
    username
    createdAt
  }
}
```

```
mutation UserDelete($id: Int!) {
  userDelete(id: $id)
}
```


## Post APIs:
```
query {
  post(id: 1) {
    id
    source
    description
    visibility
    createdAt
    userId
    author {
      firstname
      username
      lastname
      source
      description
      createdAt
    }
  }
}
```

```
query {
  postList {
    id
    source
    description
    visibility
    createdAt
    userId
    comments{
      id
    	content
   	 	createdAt
      author{
        username
      }
    }
  }
}
```

```
mutation {
  postCreate(
    post: {
      userId: 1
      source: "https://via.placeholder.com/650"
      visibility: Public
      description: "samira hack version 2 lole xD!!!"
    }
  ) {
    id
    source
    description
    visibility
    createdAt
    userId
  }
}
```

```
mutation {
  postUpdate(
    id: 1
    changes: {
      source: "https://via.placeholder.com/440",
      description: "haha poopy!!!",
      visibility:Private
    }
  ) {
    id
    source
    description
    visibility
    createdAt
    userId
  }
}
```

```
mutation {
  postDelete(id: 1)
}
```

## Comments APIs:
```
query {
  comment(id: 1) {
    id
    content
    createdAt
    author {
      firstname
      username
      lastname
      source
      description
      createdAt
    }
    post {
      id
      source
      description
      visibility
      createdAt
      userId
    }
  }
}
```

```
query {
  commentList {
    id
    content
    createdAt
    author{
      username
    }
    post{
      id
      author{
        username
        id
      }
    }
  }
}
```

```
mutation {
  commentCreate(
    comment: { userId: 1, postId: 1, content: "xDDDD" }
  ) {
    id
    content
    createdAt
    author {
      firstname
      username
      lastname
    }
    post {
      source
      description
      createdAt
      userId
    }
  }
}
```


```
mutation{
	commentDelete(id:3)
}
```