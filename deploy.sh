rm -r ./build/*
grunt
find ./build/ -type f -exec gzip "{}" \; -exec mv "{}.gz" "{}" \;
aws s3 sync ./build/ s3://fucking-eu-cookies/ --exclude '*' --include "*.js" --cache-control "public, max-age=604800" --content-encoding gzip --content-type="application/javascript;charset=utf-8" --delete
aws s3 sync ./build/ s3://fucking-eu-cookies/ --exclude ".gitignore" --exclude "*.js" --cache-control "public, max-age=604800" --content-encoding gzip --delete