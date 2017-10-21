# =============================================================================
# Copyright (c) 2016, Cisco Systems, Inc
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# Redistributions of source code must retain the above copyright notice,
# this list of conditions and the following disclaimer.
# Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
# THE POSSIBILITY OF SUCH DAMAGE.
# =============================================================================
from werkzeug.contrib.fixers import ProxyFix
import logging
import os

from flask import Flask, Response, render_template_string, send_from_directory
from flask_cors import CORS
from database import mongo
from api.apis import api

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)

log = logging.getLogger(__name__)

app = Flask(__name__)
app.register_blueprint(api, url_prefix='/api')
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
FE_DIR = os.path.join(CURRENT_DIR, 'react/build/')
FE_ROOT_URL = '/home/'

# https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
# This is required in development mode at least, where ember app is served via localhost:4200
# and it makes calls to REST API (XMLHttpRequest) located at localhost:5000
headers = ['accept', 'origin', 'Content-Type']
origins = ['http://localhost:3000/*', 'http://localhost:5000/*']
CORS(app, origins=origins, resources=['/api/*', '/static/*'], allow_headers=headers, supports_credentials=True)
logging.getLogger('flask_cors').level = logging.DEBUG

app.config['MONGO_DBNAME'] = 'convodb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/convodb'

mongo.init_app(app)

abc = 'a'
@app.route(FE_ROOT_URL)
def ui():
    """Render the index.html page with the necessary context variables substituted in."""
    with open('{0}/index.html'.format(FE_DIR)) as f:
        template_string = f.read()
    rendered_template = render_template_string(template_string)
    response = Response(response=rendered_template, status=200)
    response.add_etag()
    return response


@app.route('{}<path:path>'.format(FE_ROOT_URL))
def render_assets_for_ui(path):
    """Send the user the static asset from the React blueprint

    :param str path: the path of the static file. e.g. image/icon.png, assets/index.js.
    :returns: the assets file content
    """
    return send_from_directory(FE_DIR, path)


@app.route("/")
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"


if __name__ == '__main__':
    app.run(host='0.0.0.0', use_reloader=False, threaded=True, debug=False)
