import { createBullBoard } from '@bull-board/api/src';
import { BullAdapter } from '@bull-board/api/src/queueAdapters/bull';
import { ExpressAdapter } from '@bull-board/express/src';
import Queue3 from 'bull';
import { QueueScheduler, Worker } from 'bullmq';
import express from 'express';

const redisOptions = {
  port: 6379,
  host: 'localhost',
  password: '',
};

const createQueue = (name: string) => new Queue3(name, { redis: redisOptions });

async function insertJob(queueName: string) {
  const queueScheduler = new QueueScheduler(queueName, {
    connection: redisOptions,
  });
  await queueScheduler.waitUntilReady();

  new Worker(
    queueName,
    async (job) => {
      for (let i = 0; i <= 100; i++) {
        await job.updateProgress(i);
        await job.log(`Processing job at interval ${i}`);
      }

      return { jobId: `This is the return value of job (${job.id})` };
    },
    { connection: redisOptions }
  );
}

const run = async () => {
  const app = express();

  const testQueue = createQueue('testQueue');

  await insertJob(testQueue.name);

  app.use('/job', (req, res) => {
    const opts = req.query.opts || ({} as any);

    testQueue.add('Add', { title: req.query.title }, opts);

    res.json({
      ok: true,
    });
  });

  const serverAdapter: any = new ExpressAdapter();
  serverAdapter.setBasePath('/ui');

  createBullBoard({
    queues: [new BullAdapter(testQueue)],
    serverAdapter,
  });

  app.use('/ui', serverAdapter.getRouter());

  app.listen(3000, () => {
    console.log('Running on 3000...');
    console.log('For the UI, open http://localhost:3000/ui');
    console.log('Make sure Redis is running on port 6379 by default');
    console.log('To populate the queue, run:');
    console.log('  curl http://localhost:3000/add?title=Example');
    console.log('To populate the queue with custom options (opts), run:');
    console.log('  curl http://localhost:3000/add?title=Test&opts[delay]=10');
  });
};

run().catch((e) => console.error(e));
