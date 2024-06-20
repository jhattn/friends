import { Client } from 'pg';
import { RedisClientType } from 'redis';

export class FriendService {
    private pgClient: Client;
    private redisClient: RedisClientType;

    constructor(pgClient: Client, redisClient: RedisClientType) {
        this.pgClient = pgClient;
        this.redisClient = redisClient;
    }

    async sendInvite(senderId: string, receiverId: string) {
        const query = 'INSERT INTO friend_invites (sender_id, receiver_id) VALUES ($1, $2)';
        await this.pgClient.query(query, [senderId, receiverId]);
    }

    async acceptInvite(receiverId: string, senderId: string) {
        const checkQuery = 'SELECT * FROM friend_invites WHERE sender_id = $1 AND receiver_id = $2';
        const checkResult = await this.pgClient.query(checkQuery, [senderId, receiverId]);

        if (checkResult.rowCount === 0) {
            throw new Error('No friend request found or invalid receiver');
        }

        const deleteQuery = 'DELETE FROM friend_invites WHERE sender_id = $1 AND receiver_id = $2';
        await this.pgClient.query(deleteQuery, [senderId, receiverId]);

        const insertQuery = 'INSERT INTO friends (user_id, friend_id) VALUES ($1, $2), ($2, $1)';
        await this.pgClient.query(insertQuery, [receiverId, senderId]);
    }

    async removeFriend(userId: string, friendId: string) {
        const query = 'DELETE FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)';
        await this.pgClient.query(query, [userId, friendId]);
    }

    async listFriends(userId: string) {
        const query = 'SELECT friend_id FROM friends WHERE user_id = $1';
        const result = await this.pgClient.query(query, [userId]);
        return result.rows;
    }

    async listOpenInvites(userId: string) {
        const query = 'SELECT sender_id, receiver_id, status FROM friend_invites WHERE receiver_id = $1 OR sender_id = $1';
        const result = await this.pgClient.query(query, [userId]);
        return result.rows;
    }
}
