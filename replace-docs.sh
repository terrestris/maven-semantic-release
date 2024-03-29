#!/bin/bash

# File to modify
file_to_modify="README.md"

# Read the stdin content into a variable
stdin_content=$(cat - | sed 's/\\/\\\\/g')

# Use awk to replace the content between <!-- AUTOGEN --> with stdin_content
awk -v stdin_content="$stdin_content" '
  /<!-- AUTO_GENERATED_OPTIONS -->/ {
    print
    print stdin_content
    getline
    while (! /<!-- AUTO_GENERATED_OPTIONS -->/) {
      getline
    }
    print
    next
  }
  {
    print
  }
' "$file_to_modify" > temp_file

# Replace the original file with the modified one
mv temp_file "$file_to_modify"
