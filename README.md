# 📚 Bookstore RESTful API - Backend Developer Assignment

A RESTful API for managing books and users in a bookstore application, featuring JWT authentication, CRUD operations, filtering/searching, and robust error handling.

---

## 🚀 Features

### 🔐 User Authentication (JWT)
- **Signup**: Create new user accounts with email/password.
- **Login**: Authenticate users and return JWT tokens.
- **Protected Routes**: All book operations require a valid JWT.

### 📖 Books Management (CRUD)
- **Create**: Add new books with details: `title, author, category, price, rating, published_date`.
- **Read**: Get all books or fetch a book by ID.
- **Update**: Modify existing book details.
- **Delete**: Remove books from the database.

### 🔍 Filtering & Search
- **Filter Books** by:
  - Author (partial match, case-insensitive).
  - Category (partial match, case-insensitive).
  - Minimum Rating.
  - Minimum Price.
- **Search Books** by title (partial matches).

### ⚠️ Error Handling
- Comprehensive HTTP status codes (`400, 401, 404, 500`).
- Input validation for all requests.
- Meaningful error messages for better debugging.

---

## 🛠 Tech Stack

- **Backend Framework**: Node.js + Express.js 🟢
- **Database**: MongoDB (with Mongoose ODM) 🗄️
- **Authentication**: JSON Web Tokens (JWT) 🔑
- **Validation**: Express Validator ✅
- **Testing**: Postman/Thunder Client 🛠️

---

## 🌐 API Endpoints

### 🛠 Setup & Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/bighnesh0007/Zynetic.git
   cd Zynetic
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Setup Environment Variables**  
   Create a `.env` file and add:
   ```env
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=mongodb://localhost:27017/bookstore
   PORT=3000
   ```
4. **Start Server**
   ```bash
   npm start
   ```

### 🔑 Authentication Routes

#### 1️⃣ Sign Up
- **POST** `/user/signup`
- **Body:**
  ```json
  {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "phone": "1234567890",
      "address": "123 Main St"
  }
  ```

#### 2️⃣ Sign In
- **POST** `/user/signin`
- **Body:**
  ```json
  {
      "email": "john@example.com",
      "password": "password123"
  }
  ```
- **Response:** JWT Token on successful login.

### 📚 Book Routes (Require Authentication)

All book routes (except `/book/all`) require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

#### 📜 1. Get All Books
- **GET** `/book/all`
- Public route, no authentication required.

#### 📝 2. Create Book
- **POST** `/book/create`
- **Body:**
  ```json
  {
      "title": "Book Title",
      "author": "Author Name",
      "category": "Fiction",
      "price": 29.99,
      "rating": 4.5
  }
  ```

#### 🔍 3. Get Book by ID
- **GET** `/book/:id`

#### ✏️ 4. Update Book
- **PUT** `/book/:id`
- **Body:** (Same as create book)

#### ❌ 5. Delete Book
- **DELETE** `/book/:id`

#### 🔎 6. Filter Books
- **GET** `/book/filter`
- **Query Parameters:**
  - `author` (partial match)
  - `category` (partial match)
  - `price` (minimum price)
  - `rating` (minimum rating)
- **Example:** `/book/filter?author=John&category=Fiction&price=20&rating=4`

#### 🔠 7. Search by Title
- **GET** `/book/filter/:title`
- Searches books by title (case-insensitive).

---

## 🔬 Testing with Postman

### 🌍 Environment Setup
1. Create a new environment in Postman.
2. Add variable `baseUrl` with value `http://localhost:8000`.
3. Add variable `token` (this will store the JWT token).

### 🧪 User Authentication Flow
1. **Sign Up** a new user.
2. **Sign In** to get JWT token.
3. **Save Token Automatically** in Postman:
   - Go to the **Tests** tab in Postman.
   - Add this script:
   ```javascript
   if (pm.response.code === 200) {
       pm.environment.set("token", pm.response.json().token);
   }
   ```

### 🔗 Making Authenticated Requests
- For protected routes, add this header:
  ```
  Authorization: Bearer {{token}}
  ```

### ✅ Testing Flow
1. **Sign up** a new user.
2. **Sign in** to get a token.
3. **Create** a new book.
4. **Fetch** all books.
5. **Get** a specific book by ID.
6. **Update** book details.
7. **Filter** books.
8. **Delete** a book.

---

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:
- ✅ `200`: Success
- ✅ `201`: Created
- ❌ `400`: Bad Request
- ❌ `401`: Unauthorized
- ❌ `404`: Not Found
- ❌ `500`: Server Error

### 📜 Sample Error Response:
```json
{
  "status": "error",
  "code": 404,
  "message": "Book not found with ID: 5f8d04b3ab35b3b4a8e3f7b2"
}
```

---

## 🏗️ Project Structure

```
/bookstore-api
  ├── controllers/   # Handles business logic
  ├── models/        # Mongoose schema definitions
  ├── routes/        # Express routes
  ├── middleware/    # JWT authentication & validation
  ├── utils/         # Helper functions
  ├── app.js         # Entry point
  └── package.json   # Dependencies
```

---

## 🛡 Security Measures
- 🔐 **Passwords stored as hashes** using bcrypt.
- ⏳ **JWT expiration** (Recommended: 1 hour).
- 🔒 **Middleware to protect routes**.
- 🚀 **Sanitized input data** to prevent SQL injection.

---

## 📢 Developed By
- **[@bighnesh0007](https://github.com/bighnesh0007)** 🚀
- **Note**: Requires MongoDB instance running locally or update `MONGODB_URI` for cloud connection.

---

