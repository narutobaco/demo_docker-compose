#!/bin/bash
# Go to main directory
cd node-app/
# Build image
sudo docker build -t learning-docker/node-app:v1 .
# Install dependancy
sudo docker run --rm -v $(pwd):/app -w /app node:13-alpine npm install
# Back to parent directory
cd ..
# Compose app
docker-compose up -d --build --scale app=3