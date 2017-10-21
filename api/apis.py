
import logging
from flask import Blueprint

api = Blueprint('api', __name__)
log = logging.getLogger(__name__)


@api.route('/hello', methods=['GET','POST'])
def hello():
    return "hello world"
