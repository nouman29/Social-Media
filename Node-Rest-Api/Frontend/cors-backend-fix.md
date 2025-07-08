# Backend CORS Configuration Fix

## The Problem
When using `withCredentials: true`, the backend cannot use wildcard (`*`) for `Access-Control-Allow-Origin`.

## Backend Fix (Express.js with cors)

```javascript
// In your backend server file (e.g., index.js or app.js)
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

## Alternative Backend Fix (Manual CORS)

```javascript
// Manual CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

## Why This Happens
- `withCredentials: true` tells the browser to include cookies in the request
- For security, browsers require the exact origin (not `*`) when credentials are included
- Your backend must specify the exact frontend URL in `Access-Control-Allow-Origin` 