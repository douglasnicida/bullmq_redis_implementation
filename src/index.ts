import "dotenv/config";
import express from "express";
import { Redis } from "ioredis";
import { createQueue, addJob } from "./queue.js";
import { startWorker } from "./worker.js";
import { setupDashboard } from "./dashboard.js";
import { jobMoveThingsData1, jobMoveThingsData2 } from "./constants/data.const.js";

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, API_PORT } = process.env;

if (!REDIS_HOST || !REDIS_PORT || !API_PORT) {
  throw new Error("Missing env");
}

// CREATING THE REDIS CONNECTION FOR BULLMQ
const connection = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  password: REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

// CREATING THE QUEUE
const queue = createQueue(connection);

// START WORKER
startWorker(connection);

// ADDJOB
await addJob(queue, jobMoveThingsData2);
await addJob(queue, jobMoveThingsData1);

// EXPRESS AND DASHBOARD BULLMQ/UI
const app = express();
const dashboard = setupDashboard(queue);

// ROUTE MIDDLEWARE FOR DASHBOARD UI
app.use("/admin/queues", dashboard.getRouter());

app.listen(Number(API_PORT), () => {
  console.log(`Server running on ${API_PORT}`);
});