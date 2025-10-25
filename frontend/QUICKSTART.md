# 🚀 Quick Start Guide

## Option 1: Automated Setup (Recommended)

Run the setup script:

```bash
# Make the script executable
chmod +x setup.sh

# Run setup
./setup.sh

# Or run setup and start server immediately
./setup.sh start
```

## Option 2: Manual Setup

### Step 1: Install Dependencies

```bash
yarn install
```

### Step 2: Configure Environment (if needed)

The `.env.example` file is already provided. If you want to use mock API:

```bash
# .env should contain:
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCK_API=true
```

### Step 3: Start Development Server

```bash
yarn dev
```

The application will start at **http://localhost:3000**

---

## 🎯 First Steps After Starting

### Using Mock API (Default)

1. **Navigate to** http://localhost:3000
2. **Click "Sign Up"** or use existing mock users:
   - Email: `admin@example.com` (any password works)
   - Email: `john.doe@example.com` (any password works)
   - Email: `jane.smith@example.com` (any password works)

3. **Explore the features**:
   - Dashboard: Overview of your account
   - Profile: Edit your user information
   - Users: View all registered users

### Using Real Backend API

1. **Update `.env`**:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_USE_MOCK_API=false
   ```

2. **Restart the dev server**:
   ```bash
   yarn dev
   ```

3. **Register a new account** or login with existing credentials

---

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server (port 3000) |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |
| `yarn format` | Format code with Prettier |

---

## 🔍 Project Structure Overview

```
src/
├── domain/          # Business entities & interfaces
├── infrastructure/  # API clients & repositories
├── application/     # Use cases & hooks
└── presentation/    # React components & pages
```

**See [README.md](./README.md) for complete documentation.**

---

## 🐛 Troubleshooting

### Port 3000 already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change the port in vite.config.ts
```

### Dependencies installation fails

```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

### TypeScript errors

```bash
# Restart your IDE/editor
# Or restart the TypeScript server
```

---

## ✅ What's Included

- ✅ Complete authentication system (Login/Register)
- ✅ User profile management
- ✅ User list view
- ✅ Protected routes
- ✅ Mock API for testing
- ✅ Clean Architecture implementation
- ✅ TypeScript throughout
- ✅ TailwindCSS styling
- ✅ Responsive design

---

## 📚 Next Steps

1. **Read the [README.md](./README.md)** for architecture details
2. **Explore the code** starting from `src/presentation/pages/`
3. **Try adding new features** following the Clean Architecture pattern
4. **Connect to your backend** by updating the `.env` file

---

**Happy coding! 🎉**
