#!/usr/bin/env bash

sls deploy --stage test

jest --testPathPattern=./test/integration
