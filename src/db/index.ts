import {PrismaClient} from "../generated/prisma";

// Use Prisma client for PostgreSQL database
export const db = new PrismaClient();