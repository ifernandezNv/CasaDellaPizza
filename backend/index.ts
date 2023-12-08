import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from "dotenv";
import { readFileSync } from 'fs';
import {v2 as cloudinary} from "cloudinary"

import {connectDB} from './src/config/db.js'
import resolvers  from './src/types/resolvers.ts'

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secret: true
})

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const port = Number(process.env.PORT)

connectDB()
const { url } = await startStandaloneServer(server, {
    listen: { port: port }
});

console.log(`🚀  Server ready at: ${url}`);
