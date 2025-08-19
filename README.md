# Members Only

An exclusive clubhouse where members can write anonymous posts. Built with Node.js, Express, and PostgreSQL.

## Features

- User authentication with Passport.js
- Anonymous posts visible to all visitors
- Member-only content (author names and timestamps)
- Admin controls for message deletion
- Secret passcode system for membership

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```
   DB_STRING=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret
   COMMUNITY_SECRET=your_membership_secret
   ADMIN_SECRET=your_admin_secret
   PORT=3000
   ```
4. Setup database:
   ```bash
   node config/populatedb.js your_database_url
   ```
5. Start the server:
   ```bash
   node app.js
   ```

## Usage

- **Sign up** to create an account
- **Join Community** with secret code to see message authors
- **Become Admin** with admin code to delete messages
- **Post messages** that appear anonymous to non-members

## Tech Stack

- Node.js & Express
- PostgreSQL
- Passport.js (authentication)
- EJS (templating)
- bcryptjs (password hashing)