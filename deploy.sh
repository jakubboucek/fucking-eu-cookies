rm -r ./build/*
grunt
find ./build/ -regex ".*\.\(js\|html\)" -type f -exec gzip "{}" \; -exec mv "{}.gz" "{}" \;
aws s3 sync ./build/ s3://fucking-eu-cookies/ --exclude ".gitignore" --cache-control "public, max-age=604800" --content-encoding gzip --delete