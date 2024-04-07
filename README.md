# Social App API Documentation

## Table of Contents

- [Users](#users)
- [Posts](#posts)
- [Comments](#comments)

## Users

### Add Hobby

Add a new hobby to a user.

- **Method**: POST
- **URL**: `http://localhost:3000/api/users/{userId}/hobbies`
- **Request Body**:
  ```json
  {
      "name": "Movies",
      "description": "Watching Movies"
  }
  ```
- **Response**: Not specified

### Delete Hobby

Delete a hobby from a user.

- **Method**: DELETE
- **URL**: `http://localhost:3000/api/users/{userId}/hobbies/{hobbyId}`
- **Request Body**:
  ```json
  {
      "name": "Movies",
      "description": "Watching Movies"
  }
  ```
- **Response**: Not specified

### All Users

Get all users.

- **Method**: GET
- **URL**: `http://localhost:3000/api/users`
- **Response**: Not specified

### Single User

Get a single user.

- **Method**: GET
- **URL**: `http://localhost:3000/api/users/{userId}`
- **Response**: Not specified

### Create User

Create a new user.

- **Method**: POST
- **URL**: `http://localhost:3000/api/users`
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "birthData": {
      "year": 1990,
      "day": 15,
      "month": 6,
      "city": "New York"
    },
    "educationData": {
      "schoolName": "ABC School",
      "universityName": "XYZ University",
      "schoolGraduationYear": 2010,
      "universityGraduationYear": 2014
    },
    "hobbies": [
      {
        "name": "Reading",
        "description": "I love reading books."
      },
      {
        "name": "Cooking",
        "description": "I enjoy cooking new dishes."
      }
    ],
    "posts": []
  }
  ```
- **Response**: Not specified

### Delete User

Delete a user.

- **Method**: DELETE
- **URL**: `http://localhost:3000/api/users/{userId}`
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "birthData": {
      "year": 1990,
      "day": 15,
      "month": 6,
      "city": "New York"
    },
    "educationData": {
      "schoolName": "ABC School",
      "universityName": "XYZ University",
      "schoolGraduationYear": 2010,
      "universityGraduationYear": 2014
    },
    "hobbies": [
      {
        "name": "Reading",
        "description": "I love reading books."
      },
      {
        "name": "Cooking",
        "description": "I enjoy cooking new dishes."
      }
    ],
    "posts": []
  }
  ```
- **Response**: Not specified

## Posts

### All Posts

Get all posts.

- **Method**: GET
- **URL**: `http://localhost:3000/api/posts`
- **Response**: Not specified

### User Posts

Get posts of a specific user.

- **Method**: GET
- **URL**: `http://localhost:3000/api/posts/user/{userId}`
- **Response**: Not specified

### Single Post

Get a single post.

- **Method**: GET
- **URL**: `http://localhost:3000/api/posts/{postId}`
- **Response**: Not specified

### Delete Post

Delete a post.

- **Method**: DELETE
- **URL**: `http://localhost:3000/api/posts/{postId}`
- **Response**: Not specified

### Create Post

Create a new post.

- **Method**: POST
- **URL**: `http://localhost:3000/api/posts`
- **Request Body**:
  ```json
  {
    "title": "Sample Post Title",
    "description": "This is a sample post description.",
    "user": "65ed8596c13af4a6f20e03ef"
  }
  ```
- **Response**: Not specified

## Comments

### Create Comment

Create a new comment.

- **Method**: POST
- **URL**: `http://localhost:3000/api/comments`
- **Request Body**:
  ```json
  {
      "text": "second Comment",
      "user": "65ed8596c13af4a6f20e03ef",
      "post": "65edc1416d02c4d40854c4c5"
  }
  ```
- **Response**: Not specified

### Create Reply

Create a reply to a comment.

- **Method**: POST
- **URL**: `http://localhost:3000/api/comments`
- **Request Body**:
  ```json
  {
      "text": "third level Comment",
      "parentComment": "65edc2800be88789cd2726b2",
      "user": "65ed8596c13af4a6f20e03ef",
      "post": "65edc1416d02c4d40854c4c5"
  }
  ```
- **Response**: Not specified

### All Comments

Get all comments.

- **Method**: GET
- **URL**: `http://localhost:3000/api/comments`
- **Response**: Not specified

### Single Comment

Get a single comment.

- **Method**: GET
- **URL**: `http://localhost:3000/api/comments/{commentId}`
- **Response**: Not specified

### Delete Comment

Delete a comment.

- **Method**: DELETE
- **URL**: `http://localhost:3000/api/comments/{commentId}`
- **Response**: Not specified

Please replace `{userId}`, `{hobbyId}`, `{postId}`, and `{commentId}` with actual IDs when making requests.
