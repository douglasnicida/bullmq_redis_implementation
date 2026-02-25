import { ConnectionOptions, Queue } from "bullmq";
import { VirtualThings } from "./interfaces/bullmq.interface.js";

export const QUEUE_KEY = "bull-queue-1";

export function createQueue(connection: ConnectionOptions) {
    // CREATING THE QUEUE (EQUIVALENT TO THE BULL ON BULL)
    return new Queue<VirtualThings>(QUEUE_KEY, {
        connection,
    });
}

export async function addJob(queue: Queue<VirtualThings>, jobData: VirtualThings) {
    await queue.add(`job-${jobData.name}`, jobData, {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 5000,
        },
    });
}