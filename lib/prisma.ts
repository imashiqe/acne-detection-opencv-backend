// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Import PrismaClient the correct way for Prisma 6
const { PrismaClient } = require("@prisma/client");

// Check if a global Prisma client already exists (prevents multiple instances in dev with ts-node)
let prisma: any;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}

module.exports = prisma;
