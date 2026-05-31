# Redis Basic Implementation

A simple project demonstrating the basic usage of Redis for caching, key-value storage, and data retrieval.

## 🚀 Features

- Connect to Redis server
- Set and get key-value pairs
- Delete keys
- Check key existence
- Set expiration time (TTL)
- Simple Redis client integration

## 🛠️ Tech Stack

- Node.js
- Redis
- JavaScript

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/redis-basic-implementation.git
cd redis-basic-implementation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory.

```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Start Redis Server

If Redis is installed locally:

```bash
redis-server
```

Verify Redis is running:

```bash
redis-cli ping
```

Expected output:

```bash
PONG
```

## ▶️ Usage

### Store Data

```javascript
await redisClient.set("username", "john");
```

### Retrieve Data

```javascript
const value = await redisClient.get("username");
console.log(value);
```

### Delete Data

```javascript
await redisClient.del("username");
```

### Set Expiry Time

```javascript
await redisClient.set("otp", "123456", {
  EX: 60
});
```

## 📖 Redis Commands Demonstrated

| Command | Description |
|----------|-------------|
| SET | Store a value |
| GET | Retrieve a value |
| DEL | Delete a key |
| EXISTS | Check if key exists |
| EXPIRE | Set expiration time |
| TTL | Get remaining lifetime |

## 🔧 Example Output

```bash
Connected to Redis

Data Stored:
username = john

Data Retrieved:
john

Key Deleted Successfully
```

## 🎯 Learning Objectives

This project helps understand:

- Redis fundamentals
- In-memory databases
- Key-value storage
- Cache implementation basics
- Redis client integration in Node.js

## 📚 References

- Redis Official Documentation: https://redis.io/docs
- Node Redis Client: https://github.com/redis/node-redis

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star.
