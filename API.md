# API Documentation

Postman Documentation: https://documenter.getpostman.com/view/27071391/2sBXVcjsGA

All endpoints require a Bearer token in the `Authorization` header (e.g., `Bearer <token>`). Obtain a token by logging in via `/auth/login`.

## Auth

| Method | Endpoint       | Description       | Request Body                                    | Response                       |
| ------ | -------------- | ----------------- | ----------------------------------------------- | ------------------------------ |
| POST   | /auth/register | Register new user | `{ "email": "string", "password": "string" }`   | `{ "access_token": "string" }` |
| POST   | /auth/login    | Login user        | `{ "username": "email", "password": "string" }` | `{ "access_token": "string" }` |

## Products

| Method | Endpoint      | Description                                     | Request Body                            | Response          |
| ------ | ------------- | ----------------------------------------------- | --------------------------------------- | ----------------- |
| GET    | /products     | Get all products (optional `?query` for search) | -                                       | Array of products |
| GET    | /products/:id | Get product by ID                               | -                                       | Product object    |
| POST   | /products     | Create new product                              | `{ "name": "string", "price": number }` | Created product   |
| PATCH  | /products/:id | Update product by ID                            | Partial `{ "name"?, "price"? }`         | Updated product   |
| DELETE | /products/:id | Delete product by ID                            | -                                       | Deleted product   |

**Notes**:

- Search query: Use `?query=<string>` for name (LIKE match) or `?query=<number>` for exact price match.
- Validation: Uses class-validator; invalid requests return 400 errors.
