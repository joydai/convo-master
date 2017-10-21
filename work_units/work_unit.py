from multi_process import WorkUnit
import subprocess
from database import mongo
from bson.objectid import ObjectId


class JobWorkUnit(WorkUnit):
    def __init__(self, filepath, job_id):
        WorkUnit.__init__(self)

        self.filepath = filepath
        self.job_id = job_id

    def get_unique_key(self):
        return self.job_id

    def start(self):
        job_collection = mongo.db.jobs
        job_collection.update_one({'_id': ObjectId(self.job_id)}, {"$set": {"status": "in-progress"}}, upsert=False)

        try:
            #subprocess.call(["vid", "-i", self.filepath, "-v", "-k", "-f", "json"])
            print(subprocess.check_output(["pwd"]))
        except Exception as e:
            print(e)
            job_collection.update_one({'_id': ObjectId(self.job_id)}, {"$set": {"status": "fail"}}, upsert=False)
            return

        job_collection.update_one({'_id': ObjectId(self.job_id)}, {"$set": {"status": "success"}}, upsert=False)
        return
