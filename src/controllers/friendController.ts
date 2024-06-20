import { Server } from 'restify';
import { Client } from 'pg';
import { RedisClientType } from 'redis';
import { FriendService } from '../services/friendService';

export function createFriendController(server: Server, pgClient: Client, redisClient: any) {
    const friendService = new FriendService(pgClient, redisClient);

    server.post('/friends/invite', async (req, res, next) => {
        const { senderId, receiverId } = req.body;
        try {
            await friendService.sendInvite(senderId, receiverId);
            res.send(201, { message: 'Friend invite sent successfully' });
        } catch (error: any) {
            res.send(500, { error: error.message });
        }
        return next();
    });

    server.post('/friends/accept', async (req, res, next) => {
        const { senderId, receiverId } = req.body;
        try {
            await friendService.acceptInvite(receiverId, senderId);
            res.send(201, { message: 'Friend invite accepted successfully' });
        } catch (error: any) {
            res.send(500, { error: error.message });
        }
        return next();
    });

    server.del('/friends/remove', async (req, res, next) => {
        const { userId, friendId } = req.body;
        try {
            await friendService.removeFriend(userId, friendId);
            res.send(200, { message: 'Friend removed successfully' });
        } catch (error: any) {
            res.send(500, { error: error.message });
        }
        return next();
    });

    server.get('/friends/list/:userId', async (req, res, next) => {
        const { userId } = req.params;
        try {
            const friends = await friendService.listFriends(userId);
            res.send(200, friends);
        } catch (error: any) {
            res.send(500, { error: error.message });
        }
        return next();
    });

    server.get('/friends/invites/:userId', async (req, res, next) => {
        const { userId } = req.params;
        try {
            const invites = await friendService.listOpenInvites(userId);
            res.send(200, invites);
        } catch (error: any) {
            res.send(500, { error: error.message });
        }
        return next();
    });
}
