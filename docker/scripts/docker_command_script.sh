#!/usr/bin/env bash

echo 'starting post script'

mkdir ~/.aws/
cp /app/tc_sf_fullstack_test/docker/aws/credentials ~/.aws/
cp /app/tc_sf_fullstack_test/docker/aws/config ~/.aws/

cd /app/tc_sf_fullstack_test/userservice/
npm i --no-bin-links
sls dynamodb install

#cd /app/tc_sf_fullstack_test/site/
#npm i --no-bin-links

tail -f /dev/null