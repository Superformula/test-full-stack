#!/usr/bin/env bash

docker exec -it $(docker container ls -f name=tc_sf_fullstack_test -q) /usr/bin/env bash