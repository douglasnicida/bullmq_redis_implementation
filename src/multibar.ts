import cliProgress, { SingleBar } from "cli-progress";

// MULTIBAR CONTROLS ALL BARS AUTOMATICALLY
export const multibar = new cliProgress.MultiBar(
    {
        clearOnComplete: false,
        hideCursor: true,
        format: "{name} [{bar}] {percentage}% | {value}/{total}",
    },
    cliProgress.Presets.rect
);

export const bars = new Map<string, SingleBar>();