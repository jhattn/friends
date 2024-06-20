import * as dotenv from 'dotenv';
dotenv.config();

import * as restify from 'restify';
import { createClient } from 'redis';
import { Client } from 'pg';
import { createFriendController } from './controllers/friendController';
import * as path from 'path';

export function createServer() {
    const server = restify.createServer();

    const redisClient = createClient({
        url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
    });

    redisClient.on('connect', () => {
        console.log('Connected to Redis');
    });

    redisClient.on('error', (err) => {
        console.log('Redis error: ', err);
    });

    redisClient.connect();

    const pgClient = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT ?? "5432", 10),
    });

    pgClient.connect();

    server.use(restify.plugins.bodyParser());

    server.get('/test', restify.plugins.serveStatic({
        directory: path.join(__dirname, '../public'),
        file: 'index.html'
    }));

    createFriendController(server, pgClient, redisClient);

    return server;
}
