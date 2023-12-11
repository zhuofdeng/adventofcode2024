#!/bin/bash

DAY='day10'
esbuild ./src/${DAY}/main.ts --bundle --platform=node | node
