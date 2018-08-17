rm -r ./build/*
grunt
aws s3 sync ./build/ s3://fucking-eu-cookies/ --exclude '*' --include "*.js" --exclude "*beta/*" --cache-control "public, max-age=600" --content-type="application/javascript;charset=utf-8" --delete
aws s3 sync ./build/ s3://fucking-eu-cookies/ --exclude ".gitignore" --exclude "*beta/*" --exclude "*.js" --cache-control "public, max-age=600" --delete