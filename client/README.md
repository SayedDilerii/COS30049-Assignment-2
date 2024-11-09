<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<div >
<h1>COS30049 - Assignment 3</h1>

  <p>
    This assignment aims to guide students through the development of a complete machine learning project, focusing on real-world applications that involve both regression and classification tasks. The assignment challenges students to apply their technical skills to practical scenarios.
  </p>
</div>

<!-- ABOUT THE PROJECT -->

### About The Project:

Climate change has a lot of risks, the unpredictable change of the climate in a region often causes delayed mitigation and significant losses as the residents of the impacted areas are unprepared towards the sudden changes that’s happening. One of the most unpredictable damage due to climate change is the increasing occurrence of bushfires. Using the past weather data set and bushfire data set that’s based in the United States, we develop a web application that could predict the weather and potential bushfire. This project uses machine learning techniques to ensure the accuracy of the prediction. This report talks about the process of collecting and transforming the relevant data, choosing the machine learning model, and implementing the predictive model.

## Built with using

- React.js
- Typescript
- Vite
- Tailwind CSS
- Lucide React
- Sonner
- Vaul
- Date-fns
- react-google-maps

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## First time setup and usage:

This is an example of how to list things you need to use the software and how to install them.

- Create a `.env` file inside of `client` folder.

- Paste the follwing inside of the `.env` file:

  ```
  VITE_APP_API_URL="http://localhost:3000/api"
  ```

  - **NOTE: IF YOU MODIFIED THE SERVER PORT FROM IT'S DEFAULT PORT 3000, THE NEWLY ASSIGNED PORT MUST BE CHANGED IN THE ABOVE GIVEN PORT**

  <br/>

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

- You should see the following output in the terminal - ctrl + click the Local link to:

  ```
  Local: http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  ```

- **PLEASE ENSURE YOU HAVE THE LATEST PYTHON INSTALLED!!!**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Root Directory Structure - `client`

```sh
client
├── node_modules          # code dependencies
├── public                # images, favicons
├── src                   # Source entry
├── .env                  # environment variables
├── .gitignore            # ignore
├── components.json       # Shadcn configuration
├── eslint.config.js
├── index.html            # Base HTML entry
├── package-lock.json
├── package.json          # dev and main dependencies
├── postcss.config.js     # Tailwind config
├── README.md
├── tailwind.config.json
├── tsconfig.app.json
├── tsconfig.json         # Typescript Configuration
├── tsconfig.node.json
└── vite.config.ts
```

## Directory Structure - `client/src`

```sh
/src
├── components        # React functional components
├── constants         # Static Objects, Variables, etc.
├── hooks             # React hooks
├── pages             # One .tsx per page
├── lib               # Utils、tools、services
├── providers         # Context providers
├── types             # Typescript types
├── App.tsx           # File entry
├── main.tsx          # File entry
├── index.css         # File entry
└── vite-env.d.ts
```

## Contact Information

- Anthony Tang
- Gloria Shifra Halim
- Sayed Dileri - [@x](https://x.com/SayedDileri) - 103866234@student.swin.edu.au

<p align="right">(<a href="#readme-top">back to top</a>)</p>
