import { printError, printMessage } from "../utils/logger.mjs";
import { tryCatchSync } from "../utils/tryCatch.mjs";
import { fetchPit } from "../webSocket/openF1Api.mjs";

let latestPit = new Map();

export function getLatestPit() {
    return Array.from(latestPit.values());
}

export async function updatePit() {
    printMessage('🔄 Updating pit...');

    const [pits, pitsError] = await tryCatchSync(fetchPit());

    if (pitsError || Array.isArray(pits)) {
        printError('Failed to fetch pit:', pitsError?.message);
        return;
    }
    
}