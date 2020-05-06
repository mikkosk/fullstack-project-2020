import app from './app';
import http from 'http';
const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});