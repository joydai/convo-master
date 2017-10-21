# set up virtual environment
rm -rf .tox
tox --recreate
# ./copy-front-end-to-main-webapp.sh

echo "Created python env at CURRENT_DIR/.tox/py27"
echo "Run ./runserver.sh to activate the env and start server."
