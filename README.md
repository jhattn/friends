# Friends Service

Microservice for managing friends.

## Features

- Send Friend Invites
- Accept Friend Invites
- Remove Friends
- Friends List

## Setup

1. Clone the repository.

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DB_USER=your_db_user
    DB_HOST=localhost
    DB_NAME=friends
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```

4. Run database migrations:

    ```bash
    npx db-migrate up --config database.js
    ```

5. Start the service:

    ```bash
    npm run dev
    ```

6. Open the test page:

    Open your browser and navigate to `http://localhost:8081/test`.

## Endpoints

- **POST /friends/invite**: Send a friend invite.
- **POST /friends/accept**: Accept a friend invite.
- **DELETE /friends/remove**: Remove a friend.
- **GET /friends/list/:userId**: Get the list of friends.

## Postman Collection

Import the provided Postman collection to test the endpoints:

- `friends.postman_collection.json`



npx db-migrate create initial-schema --sql-file --config ./database.js

npx db-migrate up --config database.js 