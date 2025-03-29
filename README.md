```markdown
# 📚 Bookstore RESTful API - Backend Developer Assignment

A RESTful API for managing books and users in a bookstore application, featuring JWT authentication, CRUD operations, filtering/searching, and robust error handling.

## 🚀 Features

### 1. User Authentication (JWT)
- **Signup**: Create new user accounts with email/password
- **Login**: Authenticate users and return JWT tokens
- **Protected Routes**: All book operations require valid JWT

### 2. Books Management (CRUD)
- Create new books with:  
  `title, author, category, price, rating, published_date`
- Get all books / Get book by ID
- Update existing book details
- Delete books

### 3. Filtering & Search
- **Filter Books** by:
  - Author (partial match, case-insensitive)
  - Category (partial match, case-insensitive)
  - Minimum Rating
  - Minimum Price
- **Search Books** by title (partial matches)

### 4. Error Handling
- Comprehensive HTTP status codes (400, 401, 404, 500)
- Input validation for all requests
- Meaningful error messages

## 🛠 Tech Stack
- **Framework**: Node.js + Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Express Validator
- **Testing**: Postman/Thunder Client

## 🌐 API Endpoints

### Authentication
| Method | Endpoint   | Description          |
|--------|------------|----------------------|
| POST   | /signup    | User registration   |
| POST   | /login     | User login          |

### Books (All require JWT)
| Method | Endpoint          | Description                   |
|--------|-------------------|-------------------------------|
| POST   | /books           | Create new book              |
| GET    | /books           | Get all books                |
| GET    | /books/:id       | Get book by ID               |
| PUT    | /books/:id       | Update book details          |
| DELETE | /books/:id       | Delete book                  |
| GET    | /books/filter    | Filter books                 |
| GET    | /books/search    | Search by title              |

**Filter Parameters** (`GET /books/filter`):
- `?author=<string>` (partial match)
- `?category=<string>` (partial match)
- `?rating=<number>` (min rating)
- `?price=<number>` (min price)

**Search Parameter** (`GET /books/search`):
- `?title=<string>` (partial title match)

## 🛠 Setup & Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/bookstore-api.git
   cd bookstore-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**  
   Create `.env` file:
   ```env
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=mongodb://localhost:27017/bookstore
   PORT=3000
   ```

4. **Start Server**
   ```bash
   npm start
   ```

## 🔍 Testing Examples

**User Registration**:
```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securePass123"}'
```

**Book Filtering**:
```bash
curl -X GET "http://localhost:3000/books/filter?author=Rowling&rating=4.5" \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 🛡 Security
- Passwords stored as hashes using bcrypt
- JWT expiration (recommended: 1h)
- Protected routes middleware
- Sanitized input data

## 📜 Error Responses
Sample error response:
```json
{
  "status": "error",
  "code": 404,
  "message": "Book not found with ID: 5f8d04b3ab35b3b4a8e3f7b2"
}
```

## 📂 Project Structure
```
/bookstore-api
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── utils/
  ├── app.js
  └── package.json
```

Developed as part of backend developer assignment - [@bighnesh0007]  
**Note**: Requires MongoDB instance running locally or update `MONGODB_URI` for cloud connection.
``` 

This README provides comprehensive documentation while maintaining developer-friendly readability. It can be extended with additional sections like deployment instructions, API response examples, or testing guidelines as needed.