# Full Stack Blog Website(Aurora Blog)

A complete full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. Features include user authentication, CRUD operations for blog posts, image uploads, and a rich text editor.

## 🚀 Features

- **User Authentication**: Signup, Login, and Logout with JWT tokens stored in httpOnly cookies
- **Blog Posts**: Create, Read, Update, and Delete blog posts
- **Image Upload**: Upload images for blog posts using Multer
- **Rich Text Editor**: TinyMCE editor for creating and editing blog content
- **Protected Routes**: Only logged-in users can view and create posts
- **Author Permissions**: Only post authors can edit or delete their own posts
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **Toast Notifications**: User-friendly success/error messages
## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cookie-parser** - Cookie management

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **React Hook Form** - Form handling
- **TinyMCE** - Rich text editor
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 🎯 Usage
1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **View Posts**: Browse all blog posts on the home page
4. **Create Post**: Click "Add Post" to create a new blog post with title, image, and content
5. **View Post Details**: Click on any post to view full content
6. **Edit/Delete**: Only the post author can edit or delete their own posts
- **Tailwind CSS** - Styling

## 🔒 Security Features
- Passwords are hashed using bcrypt
- JWT tokens stored in httpOnly cookies
- Protected routes require authentication
- Author-only permissions for edit/delete operations
- CORS configured for secure cross-origin requests
