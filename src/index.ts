import { createServer } from './server';

const server = createServer();

const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
