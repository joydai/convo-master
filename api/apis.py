
import logging
from collections import defaultdict
from flask import Blueprint
import json
from flask import jsonify

from database import mongo

api = Blueprint('api', __name__)
log = logging.getLogger(__name__)

static_file_loc = '~/voiceid/bigbang/full_.json'
#static_file_loc = '/Users/joydai/Downloads/full_.json'


@api.route('/get_status', methods=['GET'])
def get_status():
    star = mongo.db.stars
    star_id = star.insert({'name': 'tom', 'distance': 101})
    new_star = star.find_one({'_id': star_id})
    return 'name {} distance {}'.format(new_star['name'], new_star['distance'])


@api.route('/get_data', methods=['GET'])
def get_data():
    data = get_json_data()
    total_time = data["duration"]
    segments = []
    speakers = defaultdict(int)
    duration_data = []

    for specs in data["selections"]:
        if specs["speaker"] != 'unknown':
            speaker = specs["speaker"]

        else:
            speaker = min(specs["speakers"], key=specs["speakers"].get)

        speakers[speaker] += specs["endTime"] - specs["startTime"]
        segments.append({"speaker": speaker,
                         "start_time": specs["startTime"],
                         "end_time": specs["endTime"]})

    segments.sort(key=lambda spec: spec["start_time"])

    for key in speakers:
        duration_data.append({"speaker": key, "duration": speakers[key]})
    return jsonify(total_time=total_time, segments=segments, durations=duration_data)


def get_json_data():
    with open(static_file_loc, 'r') as result_file:
        data = result_file.read().replace('\'', '"')
        json_data = json.loads(data)
    return json_data
