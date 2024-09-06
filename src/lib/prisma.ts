import { PrismaClient } from "@prisma/client";

declare const globalThis: {
  globalPrisma: PrismaClient;
} & typeof window;

export const prisma = globalThis.globalPrisma ?? new PrismaClient();

if (import.meta.env.MODE === "development") {
  globalThis.globalPrisma = prisma;
}
