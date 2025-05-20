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

<img width="1028" alt="Screenshot 2025-05-19 at 2 25 42 PM" src="https://github.com/user-attachments/assets/2b5d02af-27b2-4654-946f-786955e0d2f5" />
<img width="1019" alt="Screenshot 2025-05-19 at 2 25 59 PM" src="https://github.com/user-attachments/assets/2318d72d-ea1b-4d6e-a1bc-ddce50ac9e9f" />
<img width="1028" alt="Screenshot 2025-05-19 at 2 26 12 PM" src="https://github.com/user-attachments/assets/c16da441-9394-4ad3-bf00-d8696aba15a2" />
<img width="1021" alt="Screenshot 2025-05-19 at 2 26 50 PM" src="https://github.com/user-attachments/assets/9b2b24fa-2d3f-4b06-bbc4-b5d58c26046c" />
<img width="1026" alt="Screenshot 2025-05-19 at 2 27 07 PM" src="https://github.com/user-attachments/assets/ef9f9724-c166-429b-9f5f-b3b8fc5af19a" />
<img width="1028" alt="Screenshot 2025-05-19 at 2 27 34 PM" src="https://github.com/user-attachments/assets/24e771ce-ea56-459f-b16c-15b9069ec415" />
<img width="1016" alt="Screenshot 2025-05-19 at 2 28 06 PM" src="https://github.com/user-attachments/assets/d59a25ae-5c01-49d7-acf1-c35f1aff3666" />

