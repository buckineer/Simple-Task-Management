## Backend

### Setup

1. **Clone the repository**

    ```
    git clone <repository-url>
    cd backend
    ```

2. **Install dependencies**

    ```
    pip install -r requirements.txt
    ```
3. **Set Environment Variable** 

    Make `.env` file referencing the `.env.example` file

4. **Migrate the database**

    ```
    python manage.py migrate
    ```

5. **Run the server**

    ```
    python manage.py runserver
    ```

### Features

- RESTful API for task management (CRUD operations).
- Authentication and authorization with Django's built-in system and JWT.
- Filtering, sorting, and searching tasks using DjangoFilterBackend, OrderingFilter, and SearchFilter.
- Unit tests for reliability.
- Integrate React compiled bundle on `render_react` view

### API Endpoints

Our RESTful API supports the following operations for managing tasks:
- **Create Task**: `POST /api/tasks/`
- **Read Tasks**: `GET /api/tasks/`
- **Update Task**: `PUT /api/tasks/{task_id}/`
- **Delete Task**: `DELETE /api/tasks/{task_id}/`
- **Mark Task as Completed**: `PATCH /api/tasks/{task_id}/`

### Authentication

- Use JWT for secure authentication. Obtain tokens at `/api/token/` and refresh tokens at `/api/token/refresh/`.

### Running Tests

To ensure code quality and reliability, run the following command:
```
pytest
```
