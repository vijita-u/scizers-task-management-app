# Task Management Application

## Overview
As per the guidelines mentioned in the assignment document, this web application is created using React and TypeScript. 
For this project, I chose Vite over Create React App (CRA) due to dependency version conflicts encountered with CRA. Vite offers faster development builds, modern tooling, and better support for handling dependencies, making it an efficient choice for this application 

## Technologies Used
- React
- TypeScript
- Ant Design
- CSS
- Axios
- JSON Server
- dayjs

## Choices
1. **Responsiveness** - To ensure the table is responsive, I implemented a horizontal scrollbar, drawing inspiration from Notion's table component for its clean and intuitive design.
2. **No sort feature** - I initially thought about adding an automatic sorting feature that would move completed tasks to the bottom, but I decided to skip it. I felt it was more user-friendly to keep things simple and accessible, similar to how Notion handles it.

## Features
1. Pagination - limited to 5 entries for easier testing
2. API Integration with a mock server
3. Edit and Delete task functionality
4. Updated the Datepicker component to restrict users from selecting past dates
5. Notification added on Form submit and update for better UI
6. Ant Design's form validation added

## Project Structure
```
- /src
  - /api
    - api.ts
    - apiUtils.ts
  - /components
    - Body.css
    - Body.tsx
    - TaskForm.css
    - TaskForm.tsx
    - TaskTable.tsx
  - /utils
    - types.ts
  - App.css
  - App.tsx
  - main.tsx
- db.json
```

## Steps to Run the App Locally

### Installation
1. Clone the repository
   ```
     git clone https://github.com/vijita-u/scizers-task-management-app.git
   ```
2. Install dependencies using npm:
   ```
     npm install
   ```
3. Run the development server:
   ```
     npm run dev
   ```
4. Start JSON Server [JSON Server Github Repo](https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file)
   ```
   json-server --watch db.json
   ```
   Go to  http://localhost:5001/ to access server. 
   If you're running your own mock server, ensure that it's up and running on the same host as the frontend app.

### Deployment
This app has been deployed on Netlify: [Link](https://scizers-task-app.netlify.app/)
