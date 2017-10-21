import time
import threading

from multiprocessing import Manager

from process_pool import Pool


class JobManager(threading.Thread):
    def __init__(self, num_workers, worker_name):
        threading.Thread.__init__(self, name=worker_name)

        self.pool = Pool(num_workers=num_workers, name=worker_name)

        self.in_progress_jobs = Manager().list()
        self.lock = Manager().Lock()

    def run(self):
        while 1:
            try:
                time.sleep(10)
                self.dispatch()
            except Exception:
                # Print to debug console instead of to DB.
                import traceback
                print(traceback.format_exc())

    def dispatch(self):
        raise NotImplementedError("Children must override dispatch()")

    def submit_job(self, work_unit):
        with self.lock:
            if work_unit.get_unique_key() in self.in_progress_jobs:
                return False

            self.in_progress_jobs.append(work_unit.get_unique_key())

        # Remember these shared memory references
        work_unit.in_progress_jobs = self.in_progress_jobs
        work_unit.lock = self.lock

        self.pool.submit(work_unit)

        return True

if __name__ == '__main__':
    pass