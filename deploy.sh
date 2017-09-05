grunt
aws s3 sync ./dist/ s3://fucking-eu-cookies/ --exclude '*' --include "*.js" --cache-control "public, max-age=2592000" --content-type="application/javascript;charset=utf-8" --delete
aws s3 sync ./dist/ s3://fucking-eu-cookies/ --exclude ".gitignore" --exclude "*.js" --cache-control "public, max-age=2592000" --delete