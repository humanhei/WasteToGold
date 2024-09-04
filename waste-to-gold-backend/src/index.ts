import express from 'express'
import dotenv from 'dotenv'
import http from 'http';
const socketIo = require('socket.io');
const { PrismaClient } = require('@prisma/client');
import userRoutes from './routes/user.routes'
import categoryRoutes from './routes/category.routes'
import subCategoryRoutes from './routes/subCategory.routes'
import listingRoutes from './routes/listing.routes'
import photoRoutes from './routes/photo.routes'
import reviewRoutes from './routes/review.routes'
import requestRoutes from './routes/requests.routes'
import messageRoutes from './routes/message.routes'
import { MessageService } from './services/message.service';
import { Socket } from 'socket.io';

interface UserData {
  id: string;
  username: string;
}

dotenv.config()
const prisma = new PrismaClient();

const app = express()
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json())
// Routes
app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/subCategories', subCategoryRoutes)
app.use('/photos', photoRoutes)
app.use('/listings', listingRoutes)
app.use('/reviews', reviewRoutes)
app.use('/requests', requestRoutes)
app.use('/message', messageRoutes)

const PORT = process.env.PORT || 3000

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');

    const connectedUsers = new Map<string, string>();

    io.on('connection', (socket: Socket) => {
      console.log('A user connected');

      socket.on('register user', (userData: UserData) => {
        connectedUsers.set(userData.id, socket.id);
        socket.data.userId = userData.id;
        socket.data.username = userData.username;
        console.log(`${userData.username} (ID: ${userData.id}) registered`);
      });

      socket.on('private message', async ({ to, message }: { to: string; message: string }) => {
        try {
          if (socket.data.userId) {
            await MessageService.sendMessage(socket.data.userId, to, message);
            const recipientSocket = connectedUsers.get(to);
            if (recipientSocket) {
              io.to(recipientSocket).emit('private message', {
                from: socket.data.userId,
                fromUsername: socket.data.username,
                message: message
              });
            }
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      });

      socket.on('get chat history', async ({ with: recipientId }: { with: string }) => {
        try {
          if (socket.data.userId) {
            const history = await MessageService.findChatHistory(socket.data.userId, recipientId);
            socket.emit('chat history', history);
          }
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      });

      socket.on('disconnect', () => {
        if (socket.data.userId) {
          connectedUsers.delete(socket.data.userId);
          console.log(`${socket.data.username} (ID: ${socket.data.userId}) disconnected`);
        }
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

main();