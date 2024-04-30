# uploadFile

**Full-Stack Development**

### Idea
I saw this challenge in a Discord community; it was a home-take project, so I wanted to give it a try.


### Instructions
Build a web application that allows users to upload a CSV file with preformatted data and display that data as cards on the website, with the ability to filter the data.

- **DO NOT create 2 repositories**, make sure to include all the code in the same GitHub repository. Create a "frontend" and "backend" folder within your repository and code directly inside them.

- **DO NOT add additional Docker instructions or commands in the readme**, if anything else needs to be executed before starting the application, make sure to include it in your development script.

- **JavaScript files** are only allowed in lib configuration files, all your code MUST be in **TypeScript** and completely **typed**.

**When you finish, deploy your code to a hosting service** like [Render](https://render.com/) or [Vercel](https://vercel.com/). You will be asked to provide the link to your repository and the deployed application(s) at the end, make sure to provide the root link without any paths.

---

## Frontend Features

- It should run on **port 4000**, and everything should be at the **"/"** route as a **Single Page Application (SPA)** using **React**.
- A button to **select a CSV file** from the local machine and another button to **upload the selected file**.
- A **search bar** that allows users to search data within the uploaded CSV file.
- The search bar should **update the displayed cards** to show only matching results.
- The uploaded CSV data should be displayed as **cards on the website**, with each card showing all the data from a single row of the CSV file.
- A **responsive design** that works well on both desktop and mobile devices.
- **Clear and user-friendly error handling**.

## Backend Features

- It should run on **port 3000**.
- The backend should be implemented as a **RESTful API** using **Node**. **(DO NOT use opinionated frameworks like Adonis or Nest)**.
- **The backend must include the following endpoints**:
    - **[POST /api/files]**
        - An endpoint that accepts the upload of a CSV file from the frontend and stores the data in a database or data structure. You must use the "file" key in the request body.
        - This route should return status 200 and an object with the key "message" with the value "The file was successfully uploaded".
        - Or this route should return status 500 and an object with the key "message" with an error message in the value.
    - **[GET /api/users]**
        - It should include an endpoint that allows the frontend to search through the uploaded CSV data. This route should accept a query parameter ?q= for search terms and should search through EVERY column of the CSV. The filter should search for partial matches and be case insensitive.
        - This route should return status 200 and an object with the key "data" with an array of objects inside it.
        - Or this route should return status 500 and an object with the key "message" with an error message in the value.