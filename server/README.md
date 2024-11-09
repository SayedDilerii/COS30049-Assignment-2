# FireGuard Backend Server =)

### First time setup and usage:

This is an example of how to list things you need to use the software and how to install them.

- Ensure you have Node.js installed and running on the following version:

  ```
  v18.20.4
  ```

- Enter at server directory within your terminal and install node_modules directory - run:

  ```
  npm install
  ```

- To start the backend server - run:

  ```
  npm run dev
  ```

- You should see the following output in the terminal:

  ```
  Server is running on port 3000
  Connected to SQLite database
  ```

- **PLEASE ENSURE YOU HAVE THE LATEST PYTHON INSTALLED!!!**

<br/>

# Common issues:

- **node_modules error:**

  - You may find issues where the server cannot actually start due to an error relating to node_modules. Please delete the node_moules folder and re-run **First time setup and usage** steps.

- **cannot start server due to occupied port 3000:**

  - This happens when a certain port required by a resource is taken up. There is two ways to resolve this:

    - **Option 1:** Kill the resource using up port 3000 in order to run the backend server
    - **Option 2:** Modify the default port 3000 on `app.ts` to run on your desired port. Doing this will require you to modify the api uri used on `.env` file on `client/.env`. You must replace the default port with your newly modified port.

<br/>

# Api documentation

Api documentation can be view in http://localhost:3000/docs. This route will only work in development mode and the backend server must be running.

### Directory Structure - `server`

<hr/>
<br/>

```sh
server
├── node_modules          # code dependencies
├── src                   # Source entry
├── components.json       # Shadcn configuration
├── package-lock.json
├── package.json          # dev and main dependencies
├── database.sqlite       # SQLITE database
├── README.md
├── tsconfig.json         # Typescript Configuration
└── .gitignore            # ignore
```

<br/>

### Directory Structure - `server/src`

<hr/>
<br/>

```sh
/src
├── controllers       # Route controllers
├── docs              # OPENAPI - Swagger API route schema
├── enums
├── middleware        # Zod validation middleware
├── schema            # zod validation schema
├── types
├── utilities         # Database, Swagger
├── app.ts            # Express App base class
├── index.ts          # Server entry point
└── router.ts         # Express Router - initialises all API routes.
```

## Contact Information

- Sayed Dileri - [@x](https://x.com/SayedDileri) - 103866234@student.swin.edu.au

<p align="right">(<a href="#readme-top">back to top</a>)</p>
