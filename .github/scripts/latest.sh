#!/bin/bash

echo $RELEASE_ID

response=$(curl -s https://api.github.com/repos/LWJerri/FindID/releases/$RELEASE_ID)

latest_url=$(echo "$response" | jq -r '.assets | last(.[]).browser_download_url')

curl -LJO $latest_url

file_name=$(basename $latest_url)
file_contents=$(cat $file_name)

file_contents=$(echo "$file_contents" | sed 's/""/"Some new version notes..."/g')

echo "$file_contents" > latest.json

git add latest.json
git commit -m "Update latest.json"
git push