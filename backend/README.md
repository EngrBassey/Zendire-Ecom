# Zendire E-Commerce Backend

This repository contains the backend code for the Zendire E-Commerce application. The backend is built using Node.js, Express, MongoDB, Redis, and Stripe. This README provides details on how to set up and get the backend to run.

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Installing MongoDB and Redis](#installing-mongodb-and-redis)
5. [Running the Server](#running-the-server)
6. [Testing the API](#testing-the-api)

---

### Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- **Node.js** (v18.x or higher)
- **npm** (v10.x or higher)
- **MongoDB** (Refer to [Installing MongoDB](#installing-mongodb) for installation guide)
- **Redis** (Refer to [Installing Redis](#installing-redis) for installation guide)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Priceless-P/Zendire-Ecom.git
   cd Zendire-Ecom/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Configuration

1. **Environment Variables:**

   Copy `.env-sample` to `.env` file in the root directory. You can edit the variables to suit your needs.

2. **Ensure the `uploads` directory exists:**

   ```bash
   mkdir uploads
   ```

<details>
<summary><strong>Installing MongoDB and Redis</strong></summary>

#### MongoDB Installation

##### Windows

1. Download the MongoDB installer from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Run the installer and follow the setup instructions.
3. After installation, start MongoDB using `mongod` command.

##### macOS

1. **Using Homebrew:**

   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@4.4
   ```

2. Start MongoDB:

   ```bash
   brew services start mongodb/brew/mongodb-community
   ```

##### Linux

1. **Ubuntu:**

   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   ```

#### Redis Installation

##### Windows

1. Download Redis from [Redis Download](https://github.com/MicrosoftArchive/redis/releases).
2. Extract the zip file and run `redis-server.exe`.

##### macOS

1. **Using Homebrew:**

   ```bash
   brew install redis
   ```

2. Start Redis:

   ```bash
   brew services start redis
   ```

##### Linux

1. **Ubuntu:**

   ```bash
   sudo apt update
   sudo apt install redis-server
   sudo systemctl enable redis-server.service
   sudo systemctl start redis-server.service
   ```

</details>

---

### Running the Server

1. **Start the MongoDB and Redis servers:**

   Make sure your MongoDB and Redis instances are running.

2. **Run the backend server:**

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

### Testing the API

1. **Swagger Documentation:**

   The API documentation is available via Swagger. Navigate to `http://localhost:5000/api-docs` to view and test the API endpoints.

2. **Postman:**

   You can use Postman to test the API endpoints. Refer to the Swagger documentation for details on the endpoints and required parameters.

---

**Initializing Admin and Dummy Products**

To initialize the admin user and dummy products in the database, run the following script:

```bash
npm run initialize
```

This script will create an admin user with provided credentials and populate the database with dummy products. Make sure MongoDB and Redis are running before executing the script.

---

**Thank you for Reading!**

If you have any questions or need further assistance, feel free to reach out to us.
