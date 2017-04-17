cd ../anCheckout
grunt build --force
rm -rf ../anCheckoutApp/www
mkdir ../anCheckoutApp/www
cp -rf dist/* ../anCheckoutApp/www/
cd ../anCheckoutApp
cordova build android
