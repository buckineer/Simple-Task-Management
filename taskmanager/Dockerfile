# Pull base image
FROM python:3.10-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


# Install dependencies
COPY requirements.txt /code/
RUN pip install -r requirements.txt
RUN pip install gunicorn

# Copy project
COPY . /code/

RUN python manage.py migrate
# Run the application on port 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "taskmanager.wsgi:application"]