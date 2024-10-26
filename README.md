# Product Management App

An efficient and user-friendly product management platform that enables users to manage their product listings. Sign up or log in to easily add, update, and organize products, including editing details like price, description, and quantity.

_Get Started:_ [Product Management App](https://product-management-giva.vercel.app/)

## Overview

The platform simplifies product management for e-commerce businesses. Whether you need to add new products, edit details, or keep your inventory up-to-date, this app provides an intuitive interface to streamline these tasks. The frontend is built using Next.js, while the backend is powered by Node.js and Express.

## Project Layout

- **product_management_app/**: Houses the client-side Next.js codebase, responsible for the user interface.
- **express-api/**: Contains the server-side code using Node.js/Express, handling API calls and business logic.

## Getting Started

### System Requirements

Ensure that your development environment includes:

- _Node.js_ (version 14 or newer) - [Download Node.js](https://nodejs.org/)
- _npm_ (comes with Node.js) or _yarn_ - for dependency management
- _Git_ - [Download Git](https://git-scm.com/)

### Setup Guide

Follow these steps to set up the project locally:

1. _Clone the Repository_

```
    git clone https://github.com/Shubh152/product_management_GIVA
    cd product_management_GIVA
```

2. _Install Frontend Dependencies_

```
    cd product_management_app
    npm install
```

3. _Install Backend Dependencies_

```
    cd ../express-api
    npm install
```

## Running the Application

### Launching the Frontend

1. Navigate to the frontend directory:

```
    cd ../product_management_app
```

2. Run the Next.js development server:
```
    npm run dev
```

3. The frontend will be accessible on [http://localhost:3000](http://localhost:3000).

### Starting the Backend

1. Open a separate terminal window, navigate to the backend directory:
```
    cd ../express-api
```

2. Generate Prisma Client
```
    npx prisma generate dev
```

3. Start the Express server:
```
    node index.js
```

4. The backend will run on [http://localhost:5000](http://localhost:5000).

## Environment Variables
the following environment variable have to be setup in the express-api directory for intiailising the backend server.
```
DATABASE_URL
AWS_ENDPOINT
AWS_ACCESS
AWS_SECRET

COVER_IMAGE_BUCKET='cover-images'
JWT_SECRET='giva_admin_secret'
ADMIN_KEY='adminsecretsignup'
```
## Admin Access

Only Authorised Users can edit, add and delete products. To signup as an authorised user you have to setup ADMIN_KEY environment variable and use its value in the signup form. This will create your account in the application. After this, signin using your credentials and you are will have admin priveleges.

## Live Deployment

The platform is currently live and hosted on the following services:
- *Frontend*: Deployed on [Vercel](https://product-management-giva.vercel.app/)
- *Backend*: Deployed on [Render](https://product-management-giva.onrender.com/)

You can visit the links above to interact with the live application and explore its features.

---
With this guide, you should be up and running in no time. Happy product management!

