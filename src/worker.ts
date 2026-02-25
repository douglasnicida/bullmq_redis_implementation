import { ConnectionOptions, Job, Worker, WorkerOptions } from "bullmq";
import { VirtualThings } from "./interfaces/bullmq.interface.js";
import { QUEUE_KEY } from "./queue.js";
import cliProgress, { SingleBar } from "cli-progress";
import { bars, multibar } from "./multibar.js";

export function startWorker(redisConnection: ConnectionOptions) {
    const workerConfig: WorkerOptions = {
        connection: redisConnection,
        concurrency: 5,
    };

    const worker = new Worker(QUEUE_KEY, async (job) => {
        const total = job.data.items.length;
        const jobIdentifier = job.id!.toString();

        let bar = bars.get(jobIdentifier);

        if (!bar) {
            bar = multibar.create(total, 0, { name: job.data.name });
            bars.set(jobIdentifier, bar);
        }

        for (let i = 0; i < total; i++) {
            await new Promise(r => setTimeout(r, 1000));
            bar.update(i + 1);
        }

        bar.update(total, {
            name: `\x1b[32m${job.data.name} completed\x1b[0m`,
        });
    }, workerConfig);

    worker.on("completed", (job) => {
        multibar.log(`\x1b[32m${job.data.name}\x1b[0m \x1b[36mcompleted\x1b[0m`);
        bars.delete(job.id!.toString());
    });

    worker.on("failed", (job, err) => {
        multibar.emit("error", new Error(`Job ${job?.data.name}(${job?.id}) failed`));
    });

    return worker;
}