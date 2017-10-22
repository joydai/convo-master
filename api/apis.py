
import logging
from collections import defaultdict
from flask import Blueprint
import json
from flask import jsonify
from bson.objectid import ObjectId
import subprocess
import threading
import time


from database import mongo

api = Blueprint('api', __name__)
log = logging.getLogger(__name__)

static_file_loc = '/home/joydai/voiceid/bbt/full_.json'
static_audio_file_loc = '/home/joydai/voiceid/bbt/full.wav'
#static_file_loc = '/Users/joydai/Downloads/full_.json'
#static_audio_file_loc = '/Users/joydai/Downloads/full_.json'

gmm_db_loc = "/home/joydai/voiceid/new_bbt_db"


@api.route('/submit_audio', methods=['GET','POST'])
def submit_audio():
    jobs = mongo.db.jobs
    job_id = jobs.insert({'filepath': static_audio_file_loc, 'status': 'submitted'})
    run_analysis(job_id, static_audio_file_loc)
    return get_data()
    #return jsonify(job_id=str(job_id))


@api.route('/get_status/job/<job_id>', methods=['GET','POST'])
def get_status(job_id):
    jobs = mongo.db.jobs
    job = jobs.find_one({'_id': ObjectId(job_id)})
    return jsonify(status=job['status'])


@api.route('/test', methods=['GET','POST'])
def test():
    job_collection = mongo.db.jobs
    jobs = job_collection.find({'status': 'submitted'})
    for job in jobs:
        print(job)
    return 'test'


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


def run_analysis(job_id, filepath):
    """
    job_collection = mongo.db.jobs
    job_collection.update_one({'_id': ObjectId(job_id)}, {"$set": {"status": "in-progress"}}, upsert=False)

    try:
        subprocess.call(["vid", "-d", gmm_db_loc, "-i", filepath, "-v", "-k", "-f", "json"])
        #print(subprocess.check_output(["pwd"]))
    except Exception as e:
        print(e)
        job_collection.update_one({'_id': ObjectId(job_id)}, {"$set": {"status": "fail"}}, upsert=False)
        return

    job_collection.update_one({'_id': ObjectId(job_id)}, {"$set": {"status": "success"}}, upsert=False)
    return
    """
    time.sleep(10)
    return


def popenAndCall(onExit, popenArgs):
    """
    Runs the given args in a subprocess.Popen, and then calls the function
    onExit when the subprocess completes.
    onExit is a callable object, and popenArgs is a list/tuple of args that
    would give to subprocess.Popen.
    """
    def runInThread(onExit, popenArgs):
        proc = subprocess.Popen(*popenArgs)
        proc.wait()
        onExit()
        return

