#!/bin/bash
echo "Deploying Web Server..."
sudo docker run -d -p 8080:80 --name web-server nginx
echo "Web Server deployed and running on port 8080!"
