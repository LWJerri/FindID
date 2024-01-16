#!/bin/bash

response=$(curl -s $GITHUB_API_URL/repos/$GITHUB_REPOSITORY/releases/$RELEASE_ID)

latest_url=$(echo "$response" | jq -r '.assets[] | select(.name == "latest.json").browser_download_url')

curl -L $latest_url > latest.json

file_name=$(basename $latest_url)
file_contents=$(cat $file_name)

file_contents=$(echo "$file_contents" | sed 's/""/"With every new version FindID is getting better for you."/g')

echo "$file_contents" > latest.json