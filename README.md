# Joushfoods E-commerce Website

A complete fullstack e-commerce website built with React, TypeScript, Node.js, Express, and MySQL. This project provides a modern e-commerce platform for Joushfoods with full functionality including product management, shopping cart, admin panel, and more.

## 🚀 Features

### Frontend (React + TypeScript)
- **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- **Product Catalog**: Browse products by categories with filtering and search
- **Shopping Cart**: Full cart functionality with quantity management
- **Product Details**: Detailed product pages with add to cart
- **Admin Panel**: Complete CRUD operations for products
- **Search Functionality**: Search products by name and description
- **Category Filtering**: Filter by product categories and dietary preferences

### Backend (Node.js + Express)
- **RESTful API**: Complete API for product management
- **Admin Authentication**: Secure admin login and token-based authentication
- **Database Integration**: MySQL database with Prisma ORM
- **Product Categories**: Support for all required categories:
  - South Indian Snacks
  - Authentic Snacks
  - Authentic Pickles (Veg & Non-Veg)
  - Sweets and Hots
  - Dry Fruits and Nuts

## 📁 Project Structure

```
joushfoods-website/
├── src/                          # Frontend React app
│   ├── components/               # Reusable UI components
│   ├── pages/                   # Page components
│   ├── context/                 # React context (Cart)
│   └── ...
├── server/                      # Backend Node.js app
│   ├── prisma/                  # Database schema and migrations
│   ├── index.js                 # Express server
│   ├── seed.js                  # Database seeding script
│   └── ...
└── ...
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL database (local or hosted)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd joushfoods-website
```

### 2. Backend Setup
```bash
cd server
npm install
```

### 3. Database Configuration
Create a `.env` file in the `server` directory:
```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password
ADMIN_TOKEN=supersecrettoken
```

### 4. Database Migration & Seeding
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database with sample products
npm run seed
```

### 5. Start Backend Server
```bash
npm start
```
The backend will run on `http://localhost:4000`

### 6. Frontend Setup
```bash
# From the root directory
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

## 🎯 Usage

### Customer Features
1. **Browse Products**: Visit `/products` to see all products
2. **Category Filtering**: Use category filters or navigation menu
3. **Search**: Use the search bar in the header
4. **Add to Cart**: Click "Add to Cart" on any product
5. **View Cart**: Click the cart icon in the header
6. **Product Details**: Click on any product to view details

### Admin Features
1. **Access Admin Panel**: Visit `/admin`
2. **Login**: Use credentials from `.env` file
3. **Manage Products**: Add, edit, or delete products
4. **Category Management**: Products are automatically categorized

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products

### Admin Endpoints (Require Authentication)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

## 🗄️ Database Schema

### Product Table
```sql
- id (Primary Key)
- name (String)
- description (String)
- image (String - URL)
- price (Float)
- category (Enum)
- veg (Boolean)
```

### Categories
- `SOUTH_INDIAN_SNACKS`
- `AUTHENTIC_SNACKS`
- `AUTHENTIC_PICKLES`
- `SWEETS_AND_HOTS`
- `DRY_FRUITS_AND_NUTS`

## 🚀 Deployment

### Production Deployment Steps

#### 1. Prepare the Frontend
1. Update the API URL in `src/lib/config.ts` to point to your production backend:
   ```typescript
   export const API_URL = 'https://your-production-api-url.com/api';
   ```
2. Build the frontend:
   ```bash
   npm run build
   ```
3. The build output will be in the `dist` directory

#### 2. Prepare the Backend
1. Create a `.env` file in the server directory with your production credentials:
   ```
   DB_HOST=your_production_db_host
   DB_USER=your_production_db_user
   DB_PASSWORD=your_production_db_password
   DB_NAME=your_production_db_name
   DB_PORT=3306
   
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_admin_password
   ADMIN_TOKEN=your_secure_admin_token
   
   PORT=4000
   ```
2. Install production dependencies:
   ```bash
   cd server
   npm install --production
   ```

#### 3. Deployment Options

##### Option 1: Shared Hosting (Hostinger, etc.)
1. Upload the `dist` directory contents to your web hosting public directory (e.g., `public_html`)
2. Upload the `server` directory to a location outside your public directory
3. Set up a MySQL database in your hosting control panel
4. Configure your web server to proxy API requests to your Node.js server
5. Start the Node.js server using the hosting provider's Node.js support or via SSH:
   ```bash
   cd /path/to/server
   npm start
   ```

##### Option 2: Vercel (Frontend) + Separate Backend
1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Deploy the frontend to Vercel:
   - Sign up or log in to [Vercel](https://vercel.com)
   - Click "Import Project" and select your repository
   - Use the following settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables if needed
   - Click "Deploy"
3. Deploy the backend separately to a service like:
   - DigitalOcean
   - Heroku
   - Railway
   - Render
   - Or any VPS provider

##### Option 3: Docker Deployment
1. Create a `Dockerfile` in the project root:
   ```dockerfile
   # Build stage
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   # Production stage
   FROM node:18-alpine
   WORKDIR /app
   COPY --from=build /app/dist ./dist
   COPY server ./server
   WORKDIR /app/server
   RUN npm install --production
   EXPOSE 4000
   CMD ["node", "index.js"]
   ```
2. Build and run the Docker container:
   ```bash
   docker build -t joushfoods-app .
   docker run -p 4000:4000 joushfoods-app
   ```

#### 4. Database Setup in Production
1. Create the necessary database tables using the SQL schema
2. Ensure your database user has appropriate permissions
3. Update the connection details in your server's `.env` file

## 🛡️ Security Features
- Admin authentication with JWT-like tokens
- Protected admin routes
- Input validation
- CORS configuration

## 📱 Responsive Design
- Mobile-first approach
- Responsive navigation
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🔄 State Management
- React Context for cart state
- Local storage persistence
- Real-time cart updates

## 🎨 UI/UX Features
- Modern, clean design
- Smooth animations and transitions
- Loading states
- Error handling
- User feedback

## 📝 License
This project is for educational purposes.

## 🤝 Contributing
Feel free to submit issues and enhancement requests!

---

**Note**: This is a fullstack implementation ready for deployment on Hostinger or any other hosting platform. The backend uses MySQL which is compatible with Hostinger's database offerings.
