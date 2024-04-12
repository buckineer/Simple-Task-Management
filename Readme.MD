# Full-Stack Web Application for Task Management

This repository contains the code for a full-stack web application designed to help users manage their personal task lists. The application supports task creation, editing, deletion, and marking tasks as completed. It features a Django-powered RESTful API backend and a ReactJS frontend, with deployment configured for AWS.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Backend (Python/Django)](#backend)
  - [Setup](#setup)
  - [Features](#features)
  - [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Running Tests](#running-tests)
- [Frontend (ReactJS)](#frontend-reactjs)
  - [Setup](#setup-1)
  - [Features](#features-1)
  - [Components](#components)
- [Deployment (AWS)](#deployment-aws)
  - [AWS Configuration](#aws-configuration)
  - [Steps](#steps)
  - [Storing Django Static and Media Files on Amazon S3](#storing-django-static-and-media-files-on-amazon-s3)
  - [Support HTTPS](#support-https)
  - [Monitoring](#monitoring)
- [Security](#security)
- [Screenshots](#screenshots)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Python (3.10 or higher)
- Node.js(16 or higher) and npm
- AWS CLI (configured with your AWS account)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Ambitiont109/DoctusTech.git
   ```
2. Navigate to the backend(taskmanager) directory and install the dependencies:
   ```
   cd taskmanager
   pip install -r requirements.txt
   ```
3. Navigate to the frontend directory and install the dependencies:
   ```
   cd ../frontend
   npm install
   ```

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

## Deployment (AWS)

### AWS Configuration

1. **Amazon RDS** for PostgreSQL database.
2. **Amazon S3** for storing static files.
3. **AWS ECS** for application deployment.
4. **IAM roles** and **VPC** for security.

### Steps

1. **Containerize the application** using Docker. 
    
    `docker build -t taskmanager .`

2. **Push the Docker image** to Amazon ECR.

    ```
    aws ecr get-login-password --region `your-region` | docker login --username AWS --password-stdin `account-id`.dkr.ecr.`your-region`.amazonaws.com
    
    docker tag taskmanager:latest 548925211719.dkr.ecr.ca-central-1.amazonaws.com/django-app:latest
    
    docker push 548925211719.dkr.ecr.ca-central-1.amazonaws.com/django-app:latest
    ```


3. **Create an ECS cluster** 
    
    this time, created the `AWS Fargate (serverless)`    
4. **Create an Task Definitions**

    Created 3 task definitions. *django-app-task*, *django-app-task-create-superuser*, *django-app-task-migrate*    
    Those three definitions are all same except the **command** part of the **containerDefinitions**.
    
    On **Infrastructure requirements** section,
    
      - choose **AWS Fargate**.
      - create a new role for **Task role** and **Task execution Role**. Used both same role. When create a role, defined own new policy that can be added to a new role. Here is sample json of it.

            ```json
            {
              "Version": "2012-10-17",
              "Statement": [
                  {
                      "Sid": "VisualEditor0",
                      "Effect": "Allow",
                      "Action": [
                          "ecr:GetDownloadUrlForLayer",
                          "ecr:BatchGetImage",
                          "ecr:CompleteLayerUpload",
                          "ecr:DescribeImages",
                          "ecr:GetAuthorizationToken",
                          "ecr:DescribeRepositories",
                          "ecr:UploadLayerPart",
                          "ecr:ListImages",
                          "ecr:InitiateLayerUpload",
                          "ecr:BatchCheckLayerAvailability",
                          "ecr:PutImage"
                      ],
                      "Resource": [
                          "*",
                          "arn:aws:ecr:ca-central-1:548925211719:repository/django-app"
                      ]
                  }
              ]
            }
            ```

5. [**Use a static or Elastic IP address for an Amazon ECS task on Fargate**](https://repost.aws/knowledge-center/ecs-fargate-static-elastic-ip-address)

    **Create a network load balancer, and then configure routing of your target group**

    1. Go to `Amazon EC2 Console` and choose **Create** for **Network Load Balancer**.
    2. On the **Create Network Load Balancer** page

        1. for Load balancer name, enter a name for your load balancer.
        2. For **Scheme**, select either **Internet-facing**.
        3. For **IP address type**, select **IPv4**.
        4. Set other information like **Protocol**, **Port** on **Listners and Routing** and **VPC**, and **Security groups** of **Network Mapping** properly.
        5. For **Mappings**, select at least one Availability Zone and one subnet for each Availability Zone. After you tick one of your zone, you should choose **Subnet** and **Ipv4 address**. And Choose **Use an Elastic IP address** for **Ipv4 address**.
        6. on **Listeners and Routing** section, create a **target group**
        
            1.  on **Specify grup details** page,  select **IP addresses**.

                **Note:** The target type **Instances** isn't supported on Fargate.
            2. Choose **Next**
            3. on **Register targets** page, You don't have to add item on **Specify IPs and define ports**
            
                **Reason**:  Load balancers distribute traffic between targets within the target group. When a target group is associated with an Amazon ECS service, Amazon ECS automatically registers and deregisters containers with the target group. Because Amazon ECS handles target registration, you don't need to register targets to your target group.
            4. Choose **Create target group**. Finally target group is created.
        7. In the **Listeners and routing** section, for **Forward to**, select the target group that you created.
        8. Choose **Create load balancer**. Finally Network Load Balancer is created.

5. Create an **Amazon ECS** service.

    **Notes**: 
    -  Choose *Turned on* of Public IP on **Networking** section. If not, pulling ECR image may somtimes fail.
    -  Be sure to specify the target group in the **Load Balancing** section of service definition when you create your service.
      When each task for your service is started, the container and port combination specified in the service definition is registered with your target group. Then, traffic is routed from the load balancer to that container.
    
6. **Set up RDS** for the database and **S3** for static files.
7. **Configure security groups** and **IAM roles** for secure access.


### [Storing Django Static and Media Files on Amazon S3](https://testdriven.io/blog/storing-django-static-and-media-files-on-amazon-s3/)

  1. Create S3 bucket with ACL enabled and disable **Block public acccess**
  2. install **django-storages**, to use S3 as the main Django storage backend, and **boto3**, to interact with the AWS API.
  3. Add `storages` to the `INSTALLED_APPS` in *settings.py*
  4. update the handling of static files in settings.py like following.

      ```
        USE_S3 = os.getenv('USE_S3') == 'TRUE'

        if USE_S3:
            # aws settings
            AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
            AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
            AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
            AWS_DEFAULT_ACL = 'public-read'
            AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
            AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
            # s3 static settings
            AWS_LOCATION = 'static'
            STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/'
            STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
        else:
            STATIC_URL = '/staticfiles/'
            STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

        STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)

        MEDIA_URL = '/mediafiles/'
        MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')

      ```

  5. Run `python manaage.py collectstatic`.

      Static files are being uploaded to the S3 bucket.


### Suport HTTPS
  1. Generate own ssl crt and key file with openssl.

      `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt`
  2. run gunicorn with generated SSL

      `gunicorn --certfile selfsigned.crt --keyfile selfsigned.key --bind 0.0.0.0:443 taskmanager.wsgi:application`
### Monitoring

- Use **AWS CloudWatch** for monitoring application performance and logs.

## Security

- Ensure HTTPS encryption for all communications.
- Use Django's security features and AWS IAM roles to protect against unauthorized access.


## ScreenShots
![List](https://raw.githubusercontent.com/Ambitiont109/Screenshots/main/Doctus-test-assignment/list.png)
![Edit](https://raw.githubusercontent.com/Ambitiont109/Screenshots/main/Doctus-test-assignment/detail.png)
