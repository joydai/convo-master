from manager.job_manager import JobManager
import os


def dispatch():
    job_manager = JobManager(4, 'Job-Manager')
    job_manager.start()

    print('job manager started')


def process_count(processname):
    try:
        return os.popen("ps -Af").read().count(processname)
    except:
        return -1


if __name__ == '__main__':
    if process_count('dispatcher') > 1:
        print('dispatcher is already running.')
    else:
        dispatch()
