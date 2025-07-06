# Haldiram Homepage Replica Backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Configure your MySQL database connection in `.env`:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```
   Replace USER, PASSWORD, HOST, PORT, and DATABASE with your Hostinger MySQL credentials.

3. Run Prisma migrations:
   ```sh
   npx prisma migrate dev --name init
   ```

4. Start the server:
   ```sh
   npm start
   ```

The API will be available at `http://localhost:4000/api/products`.

## Admin Endpoints

- `POST /api/admin/login` — Login as admin (body: `{ username, password }`). Returns `{ token }`.
- `POST /api/admin/products` — Create product (requires `Authorization: Bearer <token>`)
- `PUT /api/admin/products/:id` — Update product (requires `Authorization: Bearer <token>`)
- `DELETE /api/admin/products/:id` — Delete product (requires `Authorization: Bearer <token>`)

Set admin credentials in `.env`:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password
ADMIN_TOKEN=supersecrettoken
``` 