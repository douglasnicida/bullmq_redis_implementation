# 🐂 BullMQ Queue Demo

A demonstration of job queue processing using **BullMQ** with real-time progress tracking via **cli-progress** multi-bar. Jobs are processed concurrently and each one displays its own animated progress bar in the terminal.

## ✨ Features

- Job queue powered by BullMQ + Redis
- Real-time multi-bar progress display per job
- Concurrent job processing (up to 5 workers simultaneously)
- Automatic retry on failure (3 attempts with backoff)
- Color-coded terminal output for completed/failed jobs

## 🛠️ Tech Stack

- [BullMQ](https://docs.bullmq.io/) — job queue
- [Redis](https://redis.io/) — queue persistence
- [cli-progress](https://github.com/npkgz/cli-progress) — terminal progress bars
- [TypeScript](https://www.typescriptlang.org/) + [tsx](https://github.com/privatenumber/tsx) — runtime

## 📁 Project Structure

```
src/
├── index.ts          # Entry point, Redis config
├── queue.ts          # Queue instance and QUEUE_KEY constant
├── worker.ts         # Worker definition and job processor
├── multibar.ts       # Shared cli-progress MultiBar instance
└── interfaces/
    └── bullmq.interface.ts   # VirtualThings type definition
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- A running Redis instance

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

API_PORT=3333
```

### Running

```bash
pnpm tsx src/index.ts
```

## ⚙️ How It Works

1. `index.ts` loads Redis credentials from `.env` and calls the main function.
2. A BullMQ queue is created and a worker is registered with a concurrency of 5.
3. Jobs of type `VirtualThings` are added to the queue. Each job carries a `name` and a list of `items`.
4. The worker processes each job by iterating over its items with a 1-second delay per item, updating a dedicated progress bar on each tick.
5. On completion, the bar turns green and a log message is printed below the progress display.

## 📦 Job Schema

```typescript
interface VirtualThings {
  name: string;
  items: string[];
}
```

## 🔁 Retry Policy

Jobs are configured with:

- **3 attempts** before being marked as failed
- **5 second backoff** between retries