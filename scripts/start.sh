#!/bin/bash

DAY=day04
esbuild ./src/${DAY}/main.ts --bundle --platform=node | node
