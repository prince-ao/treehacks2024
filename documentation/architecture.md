# prescriptionRx Software Architecture & Design

- Author(s): Prince Addo
- Date: February 16, 2024
- Version: v1

## Table of contents

## Introduction

### Definitions

- CRUD: Create Read Update Delete
- AWS: Amazon Web Service
- JWT: JSON Web Token

### Purpose of document

The purpose of this document is to act as a complete software architecture for **prescriptionRx**.

### Scope of the application

#### Must have

- Home:
  - User is able to create a profile
  - User is able to see a dashboard which health categories
    - The dashboard updates in real time
  - Clicking on a health categories brings up a list of recommended medications for that category
  - Clicking on a medication brings more details (side effects, etc.) of said medication
  - User should be able to see prices of medications
- Profile
  - Show stats on a user's health
- Chat
  - User should be able to chat and get accurate answers from the llm
  - User should be able to CRUD their chat
- Settings:
  - Settings feature

#### Should have

- User can search for any medication and see if we would recommend it

#### Could have

- User can search for a particular medication that they were recommended

#### Wont have

## Architecture goal

The goal of this architecture is to:

- Implement all the features
- Use the least number of components
- Minimize cost
- Let the backend handle all the technical heavy-lifting and the frontend be pretty

## Technology Stack

### Frontend

- Language: Typescript
- Framework: Expo + React Native
- Routing: Expo Router
- Styling: NativeWind
- Hosting: Intel
- Runtime: Bun (MIND BLOWN!!! THIS MIGHT WIN THE BUN PRIZE)

### Backend

- Language: Typescript
- Framework: ElysiaJS
- ORM: Prisma
- Relational Database: PostgreSQL
- Vector Database: ?
- LLM: Together.ai
- Cache: Redis
- Object Store: AWS (maybe change)
- Runtime: Bun (Sponsors)

### External APIs

- [Terra API](https://docs.tryterra.co/)
- Together.ai

## Relational Database Design

- Database: prescription_rx

### Tables

**_User:_**

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(320) NOT NULL,
  password VARCHAR(100) NOT NULL,
  profile_image VARCHAR(500),
  created DATETIME
);
```

**_Terra Account:_**

```sql
CREATE TABLE terra_accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id NOT NULL REFERENCES users(id),
  terra_user_id TEXT NOT NULL,
  terra_resource TEXT NOT NULL,
  terra_reference_id TEXT NOT NULL
);
```

**_Medication Recommendation:_**

```sql
CREATE TABLE medication_recommendations (
  id SERIAL PRIMARY KEY NOT NULL
  user_id INT NOT NULL REFERENCES users(id),
  recommended_dosage TEXT,
  date_of_recommendation TIMESTAMP NOT NULL,
  price TEXT NOT NULL,
  reason_for_recommendation TEXT NOT NULL,
  medication_name TEXT NOT NULL,
  medication_image TEXT NOT NULL
);
```

**_Current Medication:_**

```sql
CREATE TABLE current_medications (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id NOT NULL REFERENCES users(id),
  medication_name TEXT,
  dosage TEXT
);
```

**_Saved Message:_**

```sql
CREATE TABLE saved_messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  messages JSON NOT NULL,
  created DATETIME NOT NULL,
  updated DATETIME NOT NULL
);
```

**_Setting Preference:_**

```sql
CREATE TABLE setting_preferences (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id NOT NULL REFERENCES users(id),
  dark_mode BOOLEAN NOT NULL
);
```

## Vector Database Design

- Database: prescription_rx

### Collections

**_user_vitals_**

- Description: Used to index user's medical data for the chat with **chat with health data** feature

## Backend Details

### Routes

#### POST /web-hook

- _Probably the hardest route to implement_

#### POST _/auth/signup_

- Request
  - body
    - username
    - email
    - password
- Response
  - JWT Token

#### POST _/auth/login_

- Request
  - body
    - (username or email)
    - password
- Response
  - JWT Token

#### POST _/accounts_

- Request
  - headers
    - Auth: JWT Token
  - body
    - user_id
    - resource
    - reference_id
- Response
  ```json
  {
    "message": "success"
  }
  ```

#### GET _/accounts_

- Request
  - headers
    - Auth: JWT Token
- Response
  ```json
  [
    { // note: might be better to return in their native datatype for increase speed
      "user_id": "string",
      "resource": "string",
      "reference_id": "string"
    }
    .
    .
    .
  ]
  ```

#### GET _/home/dashboard_

- Request
  - headers
    - Auth: JWT Token
- Response
  ```json
   {
    "user": {
      "name": "string",
      "age": 0,
      "profile_image": "string",
      // significant health metrics
    },
    "dashboard": {
      "cardiovascular_health": {
        "status": "green | yellow | red",
      },
      "respiratory Health": {
        "status": "green | yellow | red"
      }
      .
      .
      .
    }
   }
  ```

#### WS _/home/dashboard/ws_

- description: websocket for rolling dashboard
- Message Types
  - Initialize base data
  - Send updated dashboard
  - Send updating health metrics

#### GET _/medication/recommendation?category=\<string\>_

- Request
  -headers
  - Auth: JWT Token
  - query
    - category: string
- Response
  ```json
  {
    "name": "string",
    "medication_image": "string",
    "price": 0 // prices can't be negative
  }
  ```

#### GET _/medication/details?btl=\<string\>_

- Request
  - headers
    - Auth: JWT Token
  - query
    - btl // short for bottle
- Response
  ```json
  {
    "name": "string",
    "reason_for_recommendation": "string",
    "description": "string",
    "side_effects": "string",
    "medication_image": "string",
    "recommended_dosage": "string",
    "price": 0 // prices can't be negative
  }
  ```

#### WS _/profile/\<category\>_

- description: websocket for getting category data
- Message Types
  - Initialize base data
  - Send updated data

#### WS _/chat_

- description: websocket for chatting with llm
- Message Types
  - Send bot message
  - Receive user message

#### GET _chat/message_

- Request
  - headers
    - Auth: JWT Token
- Response
  ```json
  {
    "message_id": "string",
    "title": "string"
  }
  ```

#### POST _/chat/message_

- Request
  - headers
    - Auth: JWT Token
  - body
    - message: string:json
- Response
  ```json
  {
    "message": "success"
  }
  ```

#### GET _chat/message/<id>_

- Request
  - headers
    - Auth: JWT Token
- Response
  ```json
  {
    "message_id": "string",
    "message": "string:json"
  }
  ```

## Other

### $3K questions

#### How do we guarantee user privacy?

- encryption in-transit and at-rest
- chat messages are not saved unless you want to save them

#### How will this idea generate income and potentially scale to billions of dollars?

### Pitch

- With the advent of artificial intelligence we can use the technology to detect health problems,
  but users can't take actionable steps towards improving those conditions. That's where our app comes in.
  Predictive + Actionable

### Color scheme logic

- Signup based (save users default preferences in database upon sign up)
