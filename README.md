# Collaborative Drawing App

## What is Next.js?

Next.js is a modern web development framework built on top of React. It enables developers to create fast, scalable, and production-ready web applications with ease. Next.js simplifies routing, improves performance, and supports both server-side and static site rendering, making it ideal for building full-stack applications.

### Key Next.js Features Used in This Project

- **File-based Routing:** Pages and API endpoints are created by adding files to specific folders, making navigation and backend integration straightforward.
- **Server-Side Rendering (SSR):** Pages can be rendered on the server before being sent to the browser, resulting in faster load times and better SEO.
- **API Routes:** Backend logic and endpoints can be defined directly within the app, allowing for seamless integration between frontend and backend code.
- **Static Site Generation (SSG):** Certain pages can be pre-rendered at build time, improving performance and reducing server load.
- **Built-in CSS and CSS-in-JS Support:** Components can be styled using global CSS files, CSS modules, or utility-first frameworks like Tailwind CSS.
- **TypeScript Support:** The framework works natively with TypeScript, providing type safety and a better developer experience.
- **Image Optimization:** Images are automatically optimized for faster loading and better performance.

## What is Convex?

Convex is a backend-as-a-service platform designed for real-time, collaborative applications. It provides a serverless database, real-time sync, and easy backend logic, allowing developers to focus on building features instead of infrastructure.

### Key Convex Features Used in This Project

- **Real-Time Data Sync:** Instantly synchronizes data between clients for collaborative experiences.
- **Serverless Functions:** Write backend logic without managing servers or deployments.
- **Strong Type Safety:** End-to-end type safety for database and functions.
- **Scalable Storage:** Handles structured data and file storage for collaborative apps.

## What is Kinde Authentication?

Kinde is an authentication and user management platform that simplifies adding secure login, registration, and user profile features to applications.

### Key Kinde Features Used in This Project

- **Easy Integration:** Quick setup for authentication flows in modern web apps.
- **Secure Auth:** Handles OAuth, social logins, and passwordless authentication securely.
- **User Management:** Provides user profiles, roles, and permissions out of the box.
- **Session Management:** Manages user sessions and tokens securely.

## What is Socket.IO?

Socket.IO is a JavaScript library for real-time, bidirectional communication between web clients and servers. It is widely used for building collaborative and interactive applications.

### Key Socket.IO Features Used in This Project

- **Real-Time Communication:** Enables instant updates and collaboration between multiple users.
- **Room-Based Messaging:** Supports grouping users into rooms for isolated sessions.
- **Automatic Reconnection:** Handles network interruptions and reconnects users seamlessly.
- **Event-Based Architecture:** Allows custom events for flexible, interactive features.

## Project Flow

1. **User Authentication:**
   - Users sign up or log in to access the drawing platform.
2. **Room Selection/Creation:**
   - Users can create a new drawing room or join an existing one via a unique room code or link.
3. **Real-Time Collaboration:**
   - Inside a room, users draw on a shared canvas. All strokes and actions are instantly synchronized across all connected users using Socket.IO.
4. **Session Management:**
   - Each room maintains its own state, ensuring isolated and efficient collaboration.
5. **Profile & Feedback:**
   - Users can manage their profiles and provide feedback through dedicated UI sections.

## Project Architecture

```
client/
  ├─ src/
  │   ├─ app/           # Next.js app directory (routing, pages, layout)
  │   ├─ components/    # UI components (Canvas, Chat, Navbar, etc.)
  │   ├─ hooks/         # Custom React hooks (drawing, shapes)
  │   ├─ services/      # Socket.IO client setup
  │   └─ utils/         # Drawing utilities
  └─ convex/            # State management/backend logic (Convex)

server/
  ├─ controllers/       # Express controllers (user logic)
  ├─ database/          # Database connection
  ├─ middlewares/       # Auth and error handling
  ├─ models/            # Mongoose schemas
  ├─ routes/            # API routes
  └─ utils/             # Utility functions (JWT, email)
```

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Node.js (Express), Socket.IO
- **Database:** MongoDB (via Mongoose)
- **State/Realtime:** Socket.IO, Convex

## Why This Tech Stack?

- **Next.js & React:** Enables fast, scalable, and SEO-friendly web applications with a great developer experience and easy routing.
- **TypeScript:** Ensures type safety, reduces bugs, and improves code maintainability in a growing codebase.
- **Tailwind CSS:** Enables rapid UI development with utility-first classes, resulting in a modern and responsive design.
- **Socket.IO:** Provides real-time, bidirectional communication for seamless multi-user collaboration and instant canvas updates.
- **Convex:** Simplifies real-time state management and backend logic, making collaborative features robust and scalable.
- **Node.js (Express):** Offers a lightweight, efficient backend for handling API requests, authentication, and session management.
- **MongoDB (Mongoose):** Stores user data and session information flexibly, supporting fast queries and easy scaling for collaborative features.

## Future Enhancements

- **Drawing Tools:** Add more shapes, text, and color options.
- **Export/Import:** Allow users to export canvases as images or import backgrounds.
- **Version History:** Implement undo/redo and canvas history tracking.
- **Mobile Optimization:** Improve touch support and responsiveness.
- **Voice/Video Chat:** Integrate real-time communication for richer collaboration.
- **Public/Private Rooms:** Add room privacy controls and moderation features.
- **AI Assistance:** Smart suggestions for drawing or auto-completion.

---
Feel free to contribute or suggest more features!
