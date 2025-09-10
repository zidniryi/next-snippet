import {mockDb} from "../lib/mock-db";

// Use mock database for demo purposes
export const db = mockDb;

// Uncomment below to use real Prisma database when you have a proper DATABASE_URL
// import {PrismaClient} from "../generated/prisma";
// export const db = new PrismaClient();