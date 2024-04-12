## Frontend (ReactJS)

### Setup

1. **Navigate to the frontend directory**

    ```
    cd frontend
    ```

2. **Install dependencies**

    ```
    npm install
    ```

3. **Start the development server**

    ```
    npm start
    ```

### Features

- User-friendly task management interface.
- Responsive design for various devices.
- State management with React Hooks ('@reduxjs/toolkit).
- Use Axios for Rest API call. Intercept the request and do automatic authentication. Retry with refresh token if access token is not working
- Integration with backend API for real-time data manipulation.
- Used `TailwindCSS` for mobile responsive design and `notistack` for notification 
- Created Reusable Core components
    - `Form`, `Input`, `InputCheckbox`, `Textarea`, components with `react-hook-form`
    - `PaginationButton`, `SearchInput`, `Loading`, with `tailwindcss`


### Components

- `TaskGrid` - Display all tasks.
- `TaskDetail` - Form for adding/editing tasks.

