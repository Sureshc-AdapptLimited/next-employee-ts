# Employee Recognition

Employee CRUD operation with data filter and export.

## Prerequisites

What things you need to install the software and how to install them.

- **Node.js** ***'>=18.17.0'*** (Download and install from [Node.js](https://nodejs.org/))
- **npm** ***'>=9.6.7'***
  
  ```sh
  npm -v
  ```
- **PostgreSQL:** Ensure you have PostgreSQL installed. You can download it from [PostgreSQL](https://www.postgresql.org/download/) official website.
  
   Recommended version: ***'>= 13.0'***

## Installation

1. Open your terminal.

2. Clone the repository
     
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

3. Install dependencies:

   ```sh
   npm install
   ```
4. Set up environment variables:

   Create a ***'.env'*** file in the root of your project and add your environment variables. For example:

   ```sh
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>?schema=public
   AUTH_SECRET=<secret_token>
   NEXTAUTH_URL=http://localhost:3000
   ```

   Example:
   
   ```sh
    DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/mydatabase
   ```

5. Run database migrations:

   If your project uses Prisma or another ORM, run the necessary migration commands. For Prisma, use:

    ```sh
     npx prisma migrate dev --name init
    ```
## Running the Development Server

 To run the development server:

   ```sh
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create an optimized production build:
   ```sh
   npm run build
   ```
To start the production server:

 ```sh
   npm start
 ```

## Folder Structure

```sh
/next-employee-ts
├── /public               # Static assets like images, fonts, etc.
├── /src
│   ├── /app              # New Next.js App directory for routing and layouts
│   │   ├── /api          # API routes
│   │   ├── /components   # Reusable components
│   │   ├── layout.js     # Layouts for pages
│   │   ├── page.js       # Page components (e.g., index.js for the homepage)
│   │   ├── /error        # Custom error pages (optional)
│   │   ├── /not-found    # Custom 404 pages (optional)
│   │   └── /middleware   # Middleware for handling requests (optional)
│   ├── /styles           # Global CSS and styles
│   ├── /lib              # Library utilities (optional)
│   ├── /hooks            # Custom React hooks (optional)
│   ├── /context          # React context providers (optional)
│   ├── /config           # Configuration files (optional)
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── next.config.js        # Custom Next.js configuration (optional)
└── tsconfig.json         # TypeScript configuration (if using TypeScript)

```