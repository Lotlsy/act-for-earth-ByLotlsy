import * as fs from 'fs';
import { Pledge, InsertPledge, Schema } from "@shared/schema";
import { randomUUID } from "crypto";

// 1. Define the file path where data will be saved
const DATA_FILE = './pledges.json';

// Initialize the data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

export interface IStorage {
    createPledge(insertPledge: InsertPledge): Promise<Pledge>;
    getAllPledges(): Promise<Pledge[]>;
}

// New class to handle file system persistence
export class FileStorage implements IStorage {
    private async readPledges(): Promise<Pledge[]> {
        const data = await fs.promises.readFile(DATA_FILE, 'utf8');
        // Parse the JSON data from the file
        return JSON.parse(data) as Pledge[];
    }

    private async writePledges(pledges: Pledge[]): Promise<void> {
        // Write the updated list of pledges back to the file
        await fs.promises.writeFile(DATA_FILE, JSON.stringify(pledges, null, 2), 'utf8');
    }

    async createPledge(insertPledge: InsertPledge): Promise<Pledge> {
        const id = randomUUID();
        const pledge: Pledge = {
            ...insertPledge,
            id,
            createdAt: new Date(),
        };

        const pledges = await this.readPledges();
        pledges.push(pledge); // Add the new pledge
        await this.writePledges(pledges); // Save the entire list

        return pledge;
    }

    async getAllPledges(): Promise<Pledge[]> {
        const pledges = await this.readPledges();
        // Sort by creation time (newest first)
        return pledges.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
}

// Export the new storage instance
export const storage = new FileStorage();