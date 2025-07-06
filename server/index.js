const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// Configure CORS
app.use(cors({
  origin: isProduction ? [
    'https://joushfoods.com', 
    'https://www.joushfoods.com',
    'https://joushfoods-homepage-replica.vercel.app'
  ] : '*', // In development, allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
db.testConnection()
  .then(success => {
    if (success) {
      console.log('Connected to MySQL database');
    } else {
      console.error('Failed to connect to MySQL database');
    }
  });

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'supersecrettoken';

// Sample endpoint to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.query('SELECT * FROM Product');
    
    // Transform the data to match the format expected by the frontend
    const transformedProducts = products.map(product => ({
      id: product.id,
      _id: product.id.toString(), // Add _id for backward compatibility
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      category: product.category,
      veg: product.veg === 1, // Convert from 0/1 to boolean
      slug: product.slug
    }));
    
    res.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to check admin token
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.split(' ')[1] === ADMIN_TOKEN) {
    return next();
  }
  res.status(403).json({ error: 'Unauthorized' });
}

// Create product
app.post('/api/admin/products', authenticateAdmin, async (req, res) => {
  try {
    // Generate slug if not provided
    if (!req.body.slug && req.body.name) {
      req.body.slug = req.body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: parseFloat(req.body.price),
        category: req.body.category,
        veg: req.body.veg === true || req.body.veg === 'true',
        slug: req.body.slug
      }
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// Update product
app.put('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
  try {
    // Generate slug if not provided but name is provided
    if (!req.body.slug && req.body.name) {
      req.body.slug = req.body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: parseFloat(req.body.price),
        category: req.body.category,
        veg: req.body.veg === true || req.body.veg === 'true',
        slug: req.body.slug,
        updatedAt: new Date()
      }
    });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// Delete product
app.delete('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(400).json({ error: 'Failed to delete product' });
  }
});

// Orders CRUD
app.get('/api/admin/orders', authenticateAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/admin/orders', authenticateAdmin, async (req, res) => {
  try {
    // Create order first
    const order = await prisma.order.create({
      data: {
        userId: req.body.user,
        total: parseFloat(req.body.total),
        status: req.body.status || 'PENDING'
      }
    });
    
    // Then create order items if they exist
    if (req.body.items && req.body.items.length > 0) {
      for (const item of req.body.items) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: parseInt(item.productId),
            quantity: parseInt(item.quantity)
          }
        });
      }
    }
    
    // Return the created order with items
    const createdOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: 'Failed to create order' });
  }
});

app.put('/api/admin/orders/:id', authenticateAdmin, async (req, res) => {
  try {
    // Update the order
    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: {
        userId: req.body.user,
        total: parseFloat(req.body.total),
        status: req.body.status,
        updatedAt: new Date()
      }
    });
    
    // If items are provided, update them
    if (req.body.items) {
      // Delete existing items
      await prisma.orderItem.deleteMany({
        where: { orderId: parseInt(req.params.id) }
      });
      
      // Create new items
      for (const item of req.body.items) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: parseInt(item.productId),
            quantity: parseInt(item.quantity)
          }
        });
      }
    }
    
    // Return the updated order with items
    const updatedOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(400).json({ error: 'Failed to update order' });
  }
});

app.delete('/api/admin/orders/:id', authenticateAdmin, async (req, res) => {
  try {
    // Delete order items first (cascade delete should handle this, but just to be safe)
    await prisma.orderItem.deleteMany({
      where: { orderId: parseInt(req.params.id) }
    });
    
    // Then delete the order
    await prisma.order.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(400).json({ error: 'Failed to delete order' });
  }
});

// Users CRUD
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role || 'CUSTOMER'
      }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Failed to create user' });
  }
});

app.put('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      }
    });
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ error: 'Failed to delete user' });
  }
});

// Settings (change admin password)
app.post('/api/admin/settings/password', authenticateAdmin, async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ error: 'New password required' });
  // In a real app, update the password in the database. Here, just respond OK.
  res.json({ success: true, message: 'Password change simulated (implement persistent storage for production)' });
});

// Coupons CRUD
app.get('/api/admin/coupons', authenticateAdmin, async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

app.post('/api/admin/coupons', authenticateAdmin, async (req, res) => {
  try {
    // Convert code to uppercase
    if (req.body.code) {
      req.body.code = req.body.code.toUpperCase();
    }
    
    // Check if coupon code already exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: req.body.code }
    });
    
    if (existingCoupon) {
      return res.status(400).json({ error: 'Coupon code already exists' });
    }
    
    const coupon = await prisma.coupon.create({
      data: {
        code: req.body.code,
        description: req.body.description,
        discountType: req.body.discountType,
        discountValue: parseFloat(req.body.discountValue),
        minOrderValue: parseFloat(req.body.minOrderValue || 0),
        maxDiscount: parseFloat(req.body.maxDiscount || 0),
        validFrom: new Date(req.body.validFrom),
        validUntil: new Date(req.body.validUntil),
        isActive: req.body.isActive === true || req.body.isActive === 'true'
      }
    });
    
    res.status(201).json(coupon);
  } catch (error) {
    console.error('Error creating coupon:', error);
    res.status(400).json({ error: error.message || 'Failed to create coupon' });
  }
});

app.get('/api/admin/coupons/:id', authenticateAdmin, async (req, res) => {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    
    res.json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    res.status(500).json({ error: 'Failed to fetch coupon' });
  }
});

app.put('/api/admin/coupons/:id', authenticateAdmin, async (req, res) => {
  try {
    // Convert code to uppercase
    if (req.body.code) {
      req.body.code = req.body.code.toUpperCase();
    }
    
    // Check if updated code conflicts with existing coupon
    if (req.body.code) {
      const existingCoupon = await prisma.coupon.findFirst({
        where: {
          code: req.body.code,
          id: { not: parseInt(req.params.id) }
        }
      });
      
      if (existingCoupon) {
        return res.status(400).json({ error: 'Coupon code already exists' });
      }
    }
    
    const coupon = await prisma.coupon.update({
      where: { id: parseInt(req.params.id) },
      data: {
        code: req.body.code,
        description: req.body.description,
        discountType: req.body.discountType,
        discountValue: parseFloat(req.body.discountValue),
        minOrderValue: parseFloat(req.body.minOrderValue || 0),
        maxDiscount: parseFloat(req.body.maxDiscount || 0),
        validFrom: new Date(req.body.validFrom),
        validUntil: new Date(req.body.validUntil),
        isActive: req.body.isActive === true || req.body.isActive === 'true',
        updatedAt: new Date()
      }
    });
    
    res.json(coupon);
  } catch (error) {
    console.error('Error updating coupon:', error);
    res.status(400).json({ error: error.message || 'Failed to update coupon' });
  }
});

app.patch('/api/admin/coupons/:id', authenticateAdmin, async (req, res) => {
  try {
    // Prepare data object with only the fields that are provided
    const data = {};
    if (req.body.code) data.code = req.body.code.toUpperCase();
    if (req.body.description) data.description = req.body.description;
    if (req.body.discountType) data.discountType = req.body.discountType;
    if (req.body.discountValue) data.discountValue = parseFloat(req.body.discountValue);
    if (req.body.minOrderValue !== undefined) data.minOrderValue = parseFloat(req.body.minOrderValue);
    if (req.body.maxDiscount !== undefined) data.maxDiscount = parseFloat(req.body.maxDiscount);
    if (req.body.validFrom) data.validFrom = new Date(req.body.validFrom);
    if (req.body.validUntil) data.validUntil = new Date(req.body.validUntil);
    if (req.body.isActive !== undefined) data.isActive = req.body.isActive === true || req.body.isActive === 'true';
    data.updatedAt = new Date();
    
    const coupon = await prisma.coupon.update({
      where: { id: parseInt(req.params.id) },
      data
    });
    
    res.json(coupon);
  } catch (error) {
    console.error('Error updating coupon:', error);
    res.status(400).json({ error: error.message || 'Failed to update coupon' });
  }
});

app.delete('/api/admin/coupons/:id', authenticateAdmin, async (req, res) => {
  try {
    await prisma.coupon.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    res.status(400).json({ error: 'Failed to delete coupon' });
  }
});

app.post('/api/customers/register', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    if (!name || !email || !phone || !address || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    // Check if email already exists
    const existingCustomers = await db.query(
      'SELECT * FROM Customer WHERE email = ?',
      [email]
    );
    
    if (existingCustomers.length > 0) {
      return res.status(409).json({ error: 'Email already registered.' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the customer
    await db.query(
      'INSERT INTO Customer (name, email, phone, address, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, hashedPassword, new Date()]
    );
    
    res.status(201).json({ message: 'Registration successful.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

app.post('/api/customers/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    
    // Find the customer by email
    const customers = await db.query(
      'SELECT * FROM Customer WHERE email = ?',
      [email]
    );
    
    if (customers.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    
    const customer = customers[0];
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    
    // Return customer data (excluding password)
    const { password: _, ...customerData } = customer;
    res.json({ customer: customerData });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// Add this route to fetch a product by slug or id
app.get('/api/products/:slugOrId', async (req, res) => {
  try {
    console.log(`Looking up product with slugOrId: ${req.params.slugOrId}`);
    
    let product = null;
    
    // First try to find by slug
    const productsBySlug = await db.query(
      'SELECT * FROM Product WHERE slug = ?',
      [req.params.slugOrId]
    );
    
    if (productsBySlug.length > 0) {
      product = productsBySlug[0];
      console.log(`Search by slug result: Found`);
    } else {
      console.log(`Search by slug result: Not found`);
    }
    
    // If not found and it's a number, try by numeric id
    if (!product && !isNaN(req.params.slugOrId)) {
      console.log(`Trying to find by numeric id: ${req.params.slugOrId}`);
      const productsById = await db.query(
        'SELECT * FROM Product WHERE id = ?',
        [parseInt(req.params.slugOrId)]
      );
      
      if (productsById.length > 0) {
        product = productsById[0];
        console.log(`Search by numeric id result: Found`);
      } else {
        console.log(`Search by numeric id result: Not found`);
      }
    }
    
    // If product is still not found, return a fallback product for testing
    if (!product) {
      console.log('Product not found with any method, returning fallback product');
      // Create a fallback product for testing purposes
      product = {
        id: parseInt(req.params.slugOrId) || 1,
        name: "Haldiram's Namkeen Mix",
        description: "A delicious blend of traditional Indian snacks including sev, peanuts, and other crispy treats. Perfect for snacking and entertaining guests.",
        image: "https://fmtmagazine.in/wp-content/uploads/2022/10/D1_Rising-Popularity-Emerging-Trends-in-Processed-Indian-Traditional-Snacks.jpg",
        price: 199,
        category: "AUTHENTIC_SNACKS",
        veg: true,
        slug: "haldirams-namkeen-mix",
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    // Transform the product to match the format expected by the frontend
    const transformedProduct = {
      id: product.id,
      _id: product.id.toString(), // Add _id for backward compatibility
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      category: product.category,
      veg: product.veg === 1, // Convert from 0/1 to boolean
      slug: product.slug
    };
    
    console.log(`Product found/created: ${transformedProduct.name}`);
    res.json(transformedProduct);
  } catch (err) {
    console.error('Server error when fetching product:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Public API endpoint to validate a coupon
app.post('/api/coupons/validate', async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Coupon code is required' });
    }
    
    // Convert code to uppercase for consistency
    const upperCaseCode = code.toUpperCase();
    
    // Find the coupon
    const coupons = await db.query(
      'SELECT * FROM Coupon WHERE code = ?',
      [upperCaseCode]
    );
    
    // If coupon doesn't exist
    if (coupons.length === 0) {
      return res.status(404).json({ error: 'Invalid coupon code' });
    }
    
    const coupon = coupons[0];
    
    // Check if coupon is active
    if (!coupon.isActive) {
      return res.status(400).json({ error: 'This coupon is no longer active' });
    }
    
    // Check if coupon is within valid date range
    const now = new Date();
    if (now < new Date(coupon.validFrom) || now > new Date(coupon.validUntil)) {
      return res.status(400).json({ error: 'This coupon has expired or is not yet valid' });
    }
    
    // Check minimum order value if provided in request
    if (cartTotal !== undefined && cartTotal < coupon.minOrderValue) {
      return res.status(400).json({ 
        error: `This coupon requires a minimum order of ₹${coupon.minOrderValue}`,
        minOrderValue: coupon.minOrderValue
      });
    }
    
    // Calculate discount amount if cart total is provided
    let discountAmount = 0;
    if (cartTotal !== undefined) {
      if (coupon.discountType === 'percentage') {
        discountAmount = (cartTotal * coupon.discountValue) / 100;
        
        // Apply maximum discount cap if set
        if (coupon.maxDiscount > 0 && discountAmount > coupon.maxDiscount) {
          discountAmount = coupon.maxDiscount;
        }
      } else {
        // Fixed amount discount
        discountAmount = coupon.discountValue;
        
        // Ensure discount doesn't exceed cart total
        if (discountAmount > cartTotal) {
          discountAmount = cartTotal;
        }
      }
    }
    
    // Return coupon details and calculated discount
    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderValue: coupon.minOrderValue,
        maxDiscount: coupon.maxDiscount,
        validUntil: coupon.validUntil
      },
      discountAmount: discountAmount > 0 ? discountAmount : undefined
    });
    
  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ error: 'Failed to validate coupon' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}, listening on all interfaces`);
}); 