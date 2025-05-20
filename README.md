# Role-Based Permission Management System

## Technical Overview

This application demonstrates a role-based access control (RBAC) system with a React frontend and simulated backend services. The system manages user permissions, authentication, and displays content based on authorization levels.

## Technology Stack

### Frontend

- **React**: UI library for building component-based interfaces
- **TypeScript**: Static typing for JavaScript to enhance code quality and IDE support
- **Vite**: Modern build tool and development server with HMR (Hot Module Replacement)
- **React Router**: Client-side routing solution
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality UI components built on Radix UI primitives

### State Management

- **Context API**: React's built-in state management for auth contexts
- **TanStack Query**: Data fetching and state management library

### Authentication & Authorization (Simulated)

- **JWT-like tokens**: Simulated using mock services
- **Permission-based access control**: Read, write, and delete permissions
- **Session management**: Token refresh mechanisms

### Mocking Backend

- **Mock data services**: In-memory data manipulation mimicking API calls
- **Service layer**: Abstraction for CRUD operations on mock data

## Project Structure

```
src/
├── components/       # UI components organized by feature
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and mock database
├── pages/            # Top-level page components
├── services/         # Service layer for data operations
└── types/            # TypeScript type definitions
```

## Authentication Flow

1. User submits credentials
2. Auth service validates against mock database
3. On success, tokens are generated and stored in localStorage
4. AuthContext maintains user state throughout the application
5. Token refresh mechanism simulates session extension

## Permission System

The application implements three permission levels:

- **Read**: Basic access to view content
- **Write**: Ability to create new content
- **Delete**: Ability to remove content

The `permissionService.ts` provides functions to:

- Retrieve user permissions
- Update permissions for specific users
- Check if users have specific permissions

## Mock Data Layer

The `mock-data.ts` file serves as an in-memory database with functions for:

- CRUD operations on users, comments, and sessions
- Password reset token management
- Session creation and validation

## Development Instructions

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Testing Credentials

| Email              | Password    | Permissions         |
| ------------------ | ----------- | ------------------- |
| admin@example.com  | password123 | read, write, delete |
| reader@example.com | password123 | read                |
| writer@example.com | password123 | read, write         |

## Technical Considerations

- This application uses client-side mocking to demonstrate functionality without a backend
- For production use, replace mock services with actual API calls
- The authentication system simulates JWT behavior but lacks actual cryptographic security
- Token expiration and refresh mechanisms are simplified for demonstration purposes

## Screenshots

![alt text](<public/Images/Screenshot 2025-05-19 at 2.25.42 PM.png>)
![alt text](<public/Images/Screenshot 2025-05-19 at 2.25.59 PM.png>)
![alt text](<public/Images/Screenshot 2025-05-19 at 2.26.12 PM.png>)
![alt text](<public/Images/Screenshot 2025-05-19 at 2.26.50 PM.png>)
![alt text](<public/Images/Screenshot 2025-05-19 at 2.27.07 PM.png>)
![alt text](<public/Images/Screenshot 2025-05-19 at 2.27.34 PM.png>)
![alt text](<public/Images/Screenshot 2025-05-19 at 2.28.06 PM.png>)
