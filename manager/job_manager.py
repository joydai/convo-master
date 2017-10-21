import multi_process
from work_units.work_unit import WorkUnit


class JobManager(multi_process.JobManager):
    def __init__(self, num_workers, worker_name):
        JobManager.__init__(self, num_workers=num_workers, worker_name=worker_name)

    def dispatch(self):
        db_session = DBSession()
        try:
            inventory_jobs = db_session.query(InventoryJob).filter(
                or_(InventoryJob.status == JobStatus.SCHEDULED, InventoryJob.status == JobStatus.IN_PROGRESS)).all()

            if len(inventory_jobs) > 0:
                for inventory_job in inventory_jobs:
                    self.submit_job(InventoryWorkUnit(inventory_job.host_id, inventory_job.id))

        except Exception:
            logger.exception('Unable to dispatch inventory job')
        finally:
            db_session.close()


if __name__ == '__main__':
    pass
