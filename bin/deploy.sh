#! /bin/bash

log_file="$(date +'%B%d-%H%M%S')".log
log_folder=/home/github/logs

cd /home/github/Lunch_Time

echo "==== git log ====" >> $log_folder/$log_file
echo "$(git log --name-status HEAD^..HEAD)" >> $log_folder/$log_file
echo "==== docker ps ====" >> $log_folder/$log_file
echo "$(docker ps)" >> $log_folder/$log_file

docker-compose -f docker-compose.prod.yml stop >> $log_folder/$log_file
echo "==== docker ps after stop ====" >> $log_folder/$log_file
echo "$(docker ps)" >> $log_folder/$log_file
sleep 5

docker-compose -f docker-compose.prod.yml up -d --build >> $log_folder/$log_file
echo "==== docker ps after run ====" >> $log_folder/$log_file
echo "$(docker ps)" >> $log_folder/$log_file
