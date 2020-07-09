#!/usr/bin/env bash

sls dynamodb install
jest --testPathPattern=./test/integration