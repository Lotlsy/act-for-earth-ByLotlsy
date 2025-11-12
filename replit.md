# Climate Action Educational Website (SDG 13)

## Overview

This is an interactive educational website focused on Climate Action (UN Sustainable Development Goal 13). The application provides information about the causes and effects of climate change, and encourages users to take action by offering an interactive pledge system. Built with React and Express, it features engaging visual elements including before/after image sliders, interactive checklists, and a nature-inspired design focused on environmental awareness.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture with route-based code organization

**UI Component Strategy**
- shadcn/ui component library using Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with a custom design system
- Design system follows nature-inspired theme with primary colors: green (#2ecc71) for environmental action and blue (#3498db) for earth/water/sky
- Custom CSS variables for theming, supporting both light and dark modes
- Typography uses Poppins/Roboto font families for clean, modern readability

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and API request handling
- React Hook Form with Zod validation for form state and validation
- Local component state using React hooks for UI interactions

**Interactive Features**
- Custom before/after image slider component for visual climate change comparisons
- Interactive checklist for user climate actions
- Scroll-based animations using Intersection Observer API
- Form handling with client-side validation before API submission

### Backend Architecture

**Server Framework**
- Express.js server handling API routes and static file serving
- ESM (ECMAScript Modules) throughout the codebase
- Development mode uses Vite middleware for seamless SSR-like development experience
- Production mode serves pre-built static assets from dist/public

**API Design**
- RESTful API endpoints under `/api` namespace
- POST `/api/pledges` - Create new climate action pledge
- GET `/api/pledges` - Retrieve all pledges
- JSON request/response format with Content-Type validation
- Centralized error handling with appropriate HTTP status codes

**Data Validation Layer**
- Zod schemas shared between client and server for consistent validation
- Input sanitization happens at API boundary before data storage
- Type-safe data models using TypeScript and Drizzle Zod integration

### Data Storage Solutions

**Database Architecture**
- Drizzle ORM for type-safe database interactions
- PostgreSQL configured as the target database (Neon serverless PostgreSQL)
- Schema-first approach with migrations managed in `/migrations` directory
- Current implementation uses in-memory storage (MemStorage class) as fallback/development mode

**Data Models**
- Pledges table with fields: id (UUID), name, email, message, createdAt (timestamp)
- UUID primary keys generated via PostgreSQL's `gen_random_uuid()`
- Timestamps automatically managed with `defaultNow()` constraint
- No user authentication system - pledges are public and anonymous beyond name/email

**Migration Strategy**
- Schema definitions in `shared/schema.ts` for cross-platform sharing
- `drizzle-kit push` command for schema synchronization
- Type inference from schema to TypeScript types for compile-time safety

### External Dependencies

**UI Component Libraries**
- @radix-ui/* - Accessible, unstyled component primitives (accordion, dialog, dropdown, etc.)
- embla-carousel-react - Touch-enabled carousel functionality
- lucide-react - Icon system
- class-variance-authority & clsx - Conditional className management
- tailwind-merge - Tailwind class conflict resolution

**Database & Data**
- @neondatabase/serverless - Serverless PostgreSQL driver
- drizzle-orm - TypeScript ORM for SQL databases
- drizzle-zod - Zod schema generation from Drizzle schemas
- connect-pg-simple - PostgreSQL session storage (configured but not actively used)

**Form & Validation**
- react-hook-form - Performant form state management
- @hookform/resolvers - Form validation resolver integration
- zod - TypeScript-first schema validation

**Development Tools**
- @replit/vite-plugin-* - Replit-specific development enhancements (cartographer, dev banner, runtime error overlay)
- tsx - TypeScript execution for development server
- esbuild - Fast JavaScript bundler for production builds

**Build & Tooling**
- TypeScript with strict mode enabled
- Path aliases configured (@/, @shared/, @assets/) for clean imports
- PostCSS with Tailwind and Autoprefixer
- Vite plugins for React and development enhancements

**Notes on Architecture**
- The application is configured for PostgreSQL but currently uses in-memory storage, suggesting the database connection may need to be established
- Environment variable `DATABASE_URL` is required for database connectivity
- The design guidelines emphasize educational content presentation with strong visual storytelling through images and interactive elements
- All form submissions are validated both client-side (React Hook Form + Zod) and server-side (Zod schema validation in API routes)