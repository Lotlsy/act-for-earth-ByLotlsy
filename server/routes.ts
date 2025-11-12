import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPledgeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/pledges", async (req, res) => {
    try {
      const validatedData = insertPledgeSchema.parse(req.body);
      const pledge = await storage.createPledge(validatedData);
      res.json(pledge);
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create pledge" });
      }
    }
  });

  app.get("/api/pledges", async (req, res) => {
    try {
      const pledges = await storage.getAllPledges();
      res.json(pledges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pledges" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
