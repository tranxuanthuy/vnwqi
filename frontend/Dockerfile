# Dockerfile for static frontend
# Place this file at frontend/Dockerfile

FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy all frontend static files
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]