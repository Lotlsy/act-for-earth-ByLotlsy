import { type Pledge, type InsertPledge } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createPledge(pledge: InsertPledge): Promise<Pledge>;
  getAllPledges(): Promise<Pledge[]>;
}

export class MemStorage implements IStorage {
  private pledges: Map<string, Pledge>;

  constructor() {
    this.pledges = new Map();
  }

  async createPledge(insertPledge: InsertPledge): Promise<Pledge> {
    const id = randomUUID();
    const pledge: Pledge = {
      ...insertPledge,
      id,
      createdAt: new Date(),
    };
    this.pledges.set(id, pledge);
    return pledge;
  }

  async getAllPledges(): Promise<Pledge[]> {
    return Array.from(this.pledges.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
