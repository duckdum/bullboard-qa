import { BullBoardRequest, ControllerHandlerReturnType } from '../../typings/app';
import { BaseAdapter } from '../queueAdapters/base';
import { queueProvider } from '../providers/queue';
import { STATUSES } from '../constants/statuses';

async function retryAll(
  _req: BullBoardRequest,
  queue: BaseAdapter
): Promise<ControllerHandlerReturnType> {
  const jobs = await queue.getJobs([STATUSES.failed]);
  await Promise.all(jobs.map((job) => job.retry()));

  return { status: 200, body: {} };
}

export const retryAllHandler = queueProvider(retryAll);
