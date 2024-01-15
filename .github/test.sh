echo "v$APP_VERSION, full changelog: $RELEASE_HTML_URL, link to download new files: $RELEASE_UPLOAD_URL" >> test.txt
git checkout production
git add . && git commit -am "Add test.txt"
git push