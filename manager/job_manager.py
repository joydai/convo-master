import multi_process
from work_units.work_unit import JobWorkUnit
from database import mongo


class JobManager(multi_process.JobManager):
    def __init__(self, num_workers, worker_name):
        JobManager.__init__(self, num_workers=num_workers, worker_name=worker_name)

    def dispatch(self):
        job_collection = mongo.db.jobs
        jobs = job_collection.find({'status': 'submitted'})
        for job in jobs:
            self.submit_job(JobWorkUnit(job['filepath']))


if __name__ == '__main__':
    pass
