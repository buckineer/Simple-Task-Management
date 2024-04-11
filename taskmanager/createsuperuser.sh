#!/bin/bash

# superuser_details.sh
# Make sure to replace the placeholders with your actual superuser details.

USERNAME='admin@admin.com'
EMAIL='admin@admin.com'
PASSWORD='admin'


# Exporting environment variables for non-interactive superuser creation
export DJANGO_SUPERUSER_USERNAME=$USERNAME
export DJANGO_SUPERUSER_EMAIL=$EMAIL
export DJANGO_SUPERUSER_PASSWORD=$PASSWORD

# Create superuser
python manage.py createsuperuser --noinput --username $USERNAME --email $EMAIL

# Unset the environment variables for security
unset DJANGO_SUPERUSER_USERNAME
unset DJANGO_SUPERUSER_EMAIL
unset DJANGO_SUPERUSER_PASSWORD

echo "Superuser $USERNAME created."
