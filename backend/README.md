# SWE Backend

A simple Express/MongoDB backend for the SWE project (authentication, product management, vendors, and orders).

## Features

- User authentication (JWT)
- Role-based access control for admin/vendor actions
- Product and order management
- Vendor onboarding flow
- Cloudinary for image uploads

## Prerequisites

- Node.js (>= 14)
- npm
- MongoDB (connection string)

## Environment

Create a `.env` file in the project root with at least the following variables:

- `PORT` - port to run the server (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - secret for signing JWTs
- Cloudinary (if used): `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

## Install

```bash
npm install
```

## Run

Start the server in development:

```bash
npm start
```

Or (if you have a dev script with nodemon):

```bash
npm run dev
```

## Tests

Run the test suite:

```bash
npm test
```
