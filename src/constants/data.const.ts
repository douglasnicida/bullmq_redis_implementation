import { VirtualThings } from "../interfaces/bullmq.interface.js";

const jobMoveThingsData1: VirtualThings = {
    name: `virtual-furniture-${Math.floor(Math.random() * 1000)}`,
    items: ["chair", "table", "sofa", "bed", "computer"],
};

const jobMoveThingsData2: VirtualThings = {
    name: `virtual-electronics-${Math.floor(Math.random() * 1000)}`,
    items: ["monitor", "keyboard", "mouse", "headphones", "speaker", "laptop", "tablet", "phone", "camera", "printer", 
        "scanner", "microphone"],
};

export { jobMoveThingsData1, jobMoveThingsData2 };