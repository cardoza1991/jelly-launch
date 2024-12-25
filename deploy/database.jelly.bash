#!/bin/bash
echo "Deploying Database Server..."
sudo docker run -d -p 5432:5432 --name database-server postgres
echo "Database Server deployed and running on port 5432!"
