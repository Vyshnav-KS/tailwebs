#!/bin/bash

cd teachers_portal
rails s &  

cd ../front_end 
live-server --port=5500 &  

# Wait for both processes to complete
wait
