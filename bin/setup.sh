if [ ! -f package.json ]; then
    echo "Please make sure to run this script from the root directory of this repo."
    exit 1
fi
npm install
cp .env.example .env
