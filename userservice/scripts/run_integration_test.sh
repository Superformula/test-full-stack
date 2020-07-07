#!/usr/bin/env bash

sls remove --stage test
sls deploy --stage test

jest --testPathPattern=./test/integration
