# # Dockerfile for FastAPI backend
# # Place this file at backend/Dockerfile

# FROM python:3.12-slim

# # Set working directory
# WORKDIR /app

# # Install system dependencies (if needed)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     build-essential \
#   && rm -rf /var/lib/apt/lists/*

# # Copy and install Python dependencies
# COPY requirements.txt ./
# RUN pip install --no-cache-dir --upgrade pip \
#  && pip install --no-cache-dir -r requirements.txt

# # Copy application code
# COPY app ./app
# # (Optional) Copy test suite if you want to run tests inside container
# COPY pytest.ini ./
# COPY tests ./tests

# # Expose FastAPI default port
# EXPOSE 8000

# # Startup command
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

### Dockerfile for the FastAPI Backend
# use official Python runtime as a parent image
FROM python:3.12-slim

# 2. Install system build dependencies for compiling packages like scikit-learn
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      gcc \
      gfortran \
      libopenblas-dev \
      liblapack-dev \
      python3-dev && \
    rm -rf /var/lib/apt/lists/*

# set working directory
WORKDIR /app

# copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# copy the application code
COPY app/ ./app

# expose the port your app runs on
EXPOSE 8000

# start the FastAPI server with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
