#!/bin/bash

DAY=day09
esbuild ./src/${DAY}/main.ts --bundle --platform=node | node
