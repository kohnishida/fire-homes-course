# Fire Homes – Real Estate Web Application

## Overview
Fire Homes is a fully functional real estate web application built with Next.js 15 and Firebase.
Users can browse property listings, register or log in, save their favorite properties, and administrators can manage property listings and images.

The goal of this project was to build a production-ready application that reflects real-world web development requirements, including authentication, role-based authorization, data persistence, and security.

---

## Demo
- Live Demo: https://firestore-realestate.vercel.app/
- Test Account
  - Email: `user@example.com`
  - Password: `testTest@0000`

For security reasons, admin credentials are not included in this README.

## Local Setup
This project uses Firebase (Auth, Firestore, Storage).
To run it locally, please create your own Firebase project and configure environment variables.

### Prerequisites
- Node.js (LTS recommended)
- npm (or pnpm/yarn — use one consistently)

#### 1) Clone & Install
```bash
git clone https://github.com/kohnishida/fire-homes.git
cd fire-homes
npm install# Fire Homes – Real Estate Web Application

## Overview
Fire Homes is a fully functional real estate web application built with Next.js 15 and Firebase.
Users can browse property listings, register or log in, save their favorite properties, and administrators can manage property listings and images.

The goal of this project was to build a production-ready application that reflects real-world web development requirements, including authentication, role-based authorization, data persistence, and security.

---

## Demo
- Live Demo: https://firestore-realestate.vercel.app/
- Test Account
  - Email: `user@example.com`
  - Password: `testTest@0000`

For security reasons, admin credentials are not included in this README.

## Local Setup
This project uses Firebase (Auth, Firestore, Storage).
To run it locally, please create your own Firebase project and configure environment variables.

### Prerequisites
- Node.js (LTS recommended)
- npm (or pnpm/yarn — use one consistently)

#### 1) Clone & Install
```bash
git clone https://github.com/kohnishida/fire-homes.git
cd fire-homes
npm install
```

#### 2) Create a Firebase project

In Firebase Console, create a new project and enable:
- Authentication
  - Email/Password
  - Google (optional)
- Firestore Database
- Cloud Storage

#### 3) Create a Service Account key (for Firebase Admin SDK)

This project uses Firebase Admin SDK on the server side.

1. Google Cloud Console → **IAM & Admin** → **Service Accounts**
2. Select your service account → **Keys** → **Add key** → **Create new key (JSON)**
3. Download the JSON key and map its values into `.env.local` (next step)

#### 4) Create `.env.local`

Create a `.env.local` file in the project root **(do not commit it)**:

```bash
# Firebase Admin SDK (Server-side)
FIREBASE_PRIVATE_KEY_ID="YOUR_PRIVATE_KEY_ID"
FIREBASE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="YOUR_SERVICE_ACCOUNT_EMAIL"
FIREBASE_CLIENT_ID="YOUR_CLIENT_ID"

# App config
ADMIN_EMAIL="admin@example.com"
```

**Notes**
- FIREBASE_KEY should include line breaks as `\n` exactly as shown above.
- Make sure `.env.local` is ignored by Git (included in `.gitignore`).

#### 5) Run locally
```bash
npm run dev
```
Open: `http://localhost:3000`

#### Optional: Enable admin features (local)
Admin access is granted to the user whose email matches `ADMIN_EMAIL` in `.env.local`.
1. Set `ADMIN_EMAIL` in `.env.local`
2. Sign up / log in with that email address
3. The app will treat this user as an admin (role-based access: admin/user)

## Features
- User authentication with Firebase Auth (Email/Password and Google)
- Admin access control: Admin users can create, update, and delete properties (based on `ADMIN_EMAIL`)
- Property search and filtering for end-users
- Favorite properties per user stored in Firestore (`/favourites/{userUid}` as a map of `{propertyId}: true`)
- Image upload and management with Firebase Cloud Storage
- Protected routes for authenticated users

## Tech Stack
- Next.js 15 (App Router, Server Components, Server Actions)
- TypeScript
- Firebase (Auth, Firestore, Cloud Storage)
- Tailwind CSS / shadcn/ui
- React Hook Form + Zod for form validation


## Architecture & Design Decisions
- **Server Components** handle data fetching and authentication-dependent logic to reduce client-side JavaScript and improve performance
- **Client Components** manage interactive UI elements like forms, modals, and buttons
- Server Actions handle CRUD operations securely on the server
- After login, `revalidatePath` is used to refresh server-rendered pages to reflect the authenticated state
- Favorites are stored as a map in `/favourites/{userUid}` for simple reads and writes

## Firestore Data Structure
```txt
/favourites/{userUid}
  - {propertyId}: boolean

/properties/{propertyId}
  - address1: string
  - address2: string
  - bathrooms: number
  - bedrooms: number
  - city: string
  - description: string
  - images: string[]
  - postcode: string
  - price: number
  - status: "for-sale" | "sold" | "draft" | "withdrawn"
```
- Properties are stored in a flat structure for efficient filtering and querying
- Favorites are isolated per user for scalability and security
- Admin access is determined by `ADMIN_EMAIL` (server-side), not stored in Firestore.

## Security
- Firestore Security Rules restrict data access based on authentication and ownership
  - Users can only access their own favourites document: `/favourites/{userUid}`
- Admin-only operations are enforced on the server (Server Actions) by checking `ADMIN_EMAIL`
- Firebase Storage access is restricted to authenticated users (and admin-only operations are enforced server-side)

## Future Improvements / Learning Points
- Improve search performance with additional Firestore indexes
- Add internationalization (i18n) for multi-language support
- Implement automated testing for critical features
- Optimize image loading performance
- Explore server-side caching strategies for frequently accessed property listings

## What I Learned
- Building a full-stack application with Next.js 15 and Firebase
- Implementing secure authentication and role-based authorization
- Designing Firestore data structures for scalability and performance
- Integrating TypeScript, Zod, Tailwind CSS, shadcn/ui, and React Hook Form to create robust, type-safe, and user-friendly interfaces# Fire Homes – Real Estate Web Application

## Overview
Fire Homes is a fully functional real estate web application built with Next.js 15 and Firebase.
Users can browse property listings, register or log in, save their favorite properties, and administrators can manage property listings and images.

The goal of this project was to build a production-ready application that reflects real-world web development requirements, including authentication, role-based authorization, data persistence, and security.

---

## Demo
- Live Demo: https://firestore-realestate.vercel.app/
- Test Account
  - Email: `user@example.com`
  - Password: `testTest@0000`

For security reasons, admin credentials are not included in this README.

## Local Setup
This project uses Firebase (Auth, Firestore, Storage).
To run it locally, please create your own Firebase project and configure environment variables.

### Prerequisites
- Node.js (LTS recommended)
- npm (or pnpm/yarn — use one consistently)

#### 1) Clone & Install
```bash
git clone https://github.com/kohnishida/fire-homes.git
cd fire-homes
npm install
```

#### 2) Create a Firebase project

In Firebase Console, create a new project and enable:
- Authentication
  - Email/Password
  - Google (optional)
- Firestore Database
- Cloud Storage

#### 3) Create a Service Account key (for Firebase Admin SDK)

This project uses Firebase Admin SDK on the server side.

1. Google Cloud Console → **IAM & Admin** → **Service Accounts**
2. Select your service account → **Keys** → **Add key** → **Create new key (JSON)**
3. Download the JSON key and map its values into `.env.local` (next step)

#### 4) Create `.env.local`

Create a `.env.local` file in the project root **(do not commit it)**:

```bash
# Firebase Admin SDK (Server-side)
FIREBASE_PRIVATE_KEY_ID="YOUR_PRIVATE_KEY_ID"
FIREBASE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="YOUR_SERVICE_ACCOUNT_EMAIL"
FIREBASE_CLIENT_ID="YOUR_CLIENT_ID"

# App config
ADMIN_EMAIL="admin@example.com"
```

**Notes**
- FIREBASE_KEY should include line breaks as `\n` exactly as shown above.
- Make sure `.env.local` is ignored by Git (included in `.gitignore`).

#### 5) Run locally
```bash
npm run dev
```
Open: `http://localhost:3000`

#### Optional: Enable admin features (local)
Admin access is granted to the user whose email matches `ADMIN_EMAIL` in `.env.local`.
1. Set `ADMIN_EMAIL` in `.env.local`
2. Sign up / log in with that email address
3. The app will treat this user as an admin (role-based access: admin/user)

## Features
- User authentication with Firebase Auth (Email/Password and Google)
- Admin access control: Admin users can create, update, and delete properties (based on `ADMIN_EMAIL`)
- Property search and filtering for end-users
- Favorite properties per user stored in Firestore (`/favourites/{userUid}` as a map of `{propertyId}: true`)
- Image upload and management with Firebase Cloud Storage
- Protected routes for authenticated users

## Tech Stack
- Next.js 15 (App Router, Server Components, Server Actions)
- TypeScript
- Firebase (Auth, Firestore, Cloud Storage)
- Tailwind CSS / shadcn/ui
- React Hook Form + Zod for form validation


## Architecture & Design Decisions
- **Server Components** handle data fetching and authentication-dependent logic to reduce client-side JavaScript and improve performance
- **Client Components** manage interactive UI elements like forms, modals, and buttons
- Server Actions handle CRUD operations securely on the server
- After login, `revalidatePath` is used to refresh server-rendered pages to reflect the authenticated state
- Favorites are stored as a map in `/favourites/{userUid}` for simple reads and writes

## Firestore Data Structure
```txt
/favourites/{userUid}
  - {propertyId}: boolean

/properties/{propertyId}
  - address1: string
  - address2: string
  - bathrooms: number
  - bedrooms: number
  - city: string
  - description: string
  - images: string[]
  - postcode: string
  - price: number
  - status: "for-sale" | "sold" | "draft" | "withdrawn"
```
- Properties are stored in a flat structure for efficient filtering and querying
- Favorites are isolated per user for scalability and security
- Admin access is determined by `ADMIN_EMAIL` (server-side), not stored in Firestore.

## Security
- Firestore Security Rules restrict data access based on authentication and ownership
  - Users can only access their own favourites document: `/favourites/{userUid}`
- Admin-only operations are enforced on the server (Server Actions) by checking `ADMIN_EMAIL`
- Firebase Storage access is restricted to authenticated users (and admin-only operations are enforced server-side)

## Future Improvements / Learning Points
- Improve search performance with additional Firestore indexes
- Add internationalization (i18n) for multi-language support
- Implement automated testing for critical features
- Optimize image loading performance
- Explore server-side caching strategies for frequently accessed property listings

## What I Learned
- Building a full-stack application with Next.js 15 and Firebase
- Implementing secure authentication and role-based authorization
- Designing Firestore data structures for scalability and performance
- Integrating TypeScript, Zod, Tailwind CSS, shadcn/ui, and React Hook Form to create robust, type-safe, and user-friendly interfaces
```

#### 2) Create a Firebase project

In Firebase Console, create a new project and enable:
- Authentication
  - Email/Password
  - Google (optional)
- Firestore Database
- Cloud Storage

#### 3) Create a Service Account key (for Firebase Admin SDK)

This project uses Firebase Admin SDK on the server side.

1. Google Cloud Console → **IAM & Admin** → **Service Accounts**
2. Select your service account → **Keys** → **Add key** → **Create new key (JSON)**
3. Download the JSON key and map its values into `.env.local` (next step)

#### 4) Create `.env.local`

Create a `.env.local` file in the project root **(do not commit it)**:

```bash
# Firebase Admin SDK (Server-side)
FIREBASE_PRIVATE_KEY_ID="YOUR_PRIVATE_KEY_ID"
FIREBASE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="YOUR_SERVICE_ACCOUNT_EMAIL"
FIREBASE_CLIENT_ID="YOUR_CLIENT_ID"

# App config
ADMIN_EMAIL="admin@example.com"
```

**Notes**
- FIREBASE_KEY should include line breaks as `\n` exactly as shown above.
- Make sure `.env.local` is ignored by Git (included in `.gitignore`).

#### 5) Run locally
```bash
npm run dev
```
Open: `http://localhost:3000`

#### Optional: Enable admin features (local)
Admin access is granted to the user whose email matches `ADMIN_EMAIL` in `.env.local`.
1. Set `ADMIN_EMAIL` in `.env.local`
2. Sign up / log in with that email address
3. The app will treat this user as an admin (role-based access: admin/user)

## Features
- User authentication with Firebase Auth (Email/Password and Google)
- Admin access control: Admin users can create, update, and delete properties (based on `ADMIN_EMAIL`)
- Property search and filtering for end-users
- Favorite properties per user stored in Firestore (`/favourites/{userUid}` as a map of `{propertyId}: true`)
- Image upload and management with Firebase Cloud Storage
- Protected routes for authenticated users

## Tech Stack
- Next.js 15 (App Router, Server Components, Server Actions)
- TypeScript
- Firebase (Auth, Firestore, Cloud Storage)
- Tailwind CSS / shadcn/ui
- React Hook Form + Zod for form validation


## Architecture & Design Decisions
- **Server Components** handle data fetching and authentication-dependent logic to reduce client-side JavaScript and improve performance
- **Client Components** manage interactive UI elements like forms, modals, and buttons
- Server Actions handle CRUD operations securely on the server
- After login, `revalidatePath` is used to refresh server-rendered pages to reflect the authenticated state
- Favorites are stored as a map in `/favourites/{userUid}` for simple reads and writes

## Firestore Data Structure
```txt
/favourites/{userUid}
  - {propertyId}: boolean

/properties/{propertyId}
  - address1: string
  - address2: string
  - bathrooms: number
  - bedrooms: number
  - city: string
  - description: string
  - images: string[]
  - postcode: string
  - price: number
  - status: "for-sale" | "sold" | "draft" | "withdrawn"
```
- Properties are stored in a flat structure for efficient filtering and querying
- Favorites are isolated per user for scalability and security
- Admin access is determined by `ADMIN_EMAIL` (server-side), not stored in Firestore.

## Security
- Firestore Security Rules restrict data access based on authentication and ownership
  - Users can only access their own favourites document: `/favourites/{userUid}`
- Admin-only operations are enforced on the server (Server Actions) by checking `ADMIN_EMAIL`
- Firebase Storage access is restricted to authenticated users (and admin-only operations are enforced server-side)

## Future Improvements / Learning Points
- Improve search performance with additional Firestore indexes
- Add internationalization (i18n) for multi-language support
- Implement automated testing for critical features
- Optimize image loading performance
- Explore server-side caching strategies for frequently accessed property listings

## What I Learned
- Building a full-stack application with Next.js 15 and Firebase
- Implementing secure authentication and role-based authorization
- Designing Firestore data structures for scalability and performance
- Integrating TypeScript, Zod, Tailwind CSS, shadcn/ui, and React Hook Form to create robust, type-safe, and user-friendly interfaces