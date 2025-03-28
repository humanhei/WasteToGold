import express from 'express'
import dotenv from 'dotenv'
import http from 'http';
import { Server } from 'socket.io';
const path = require('path')
const { PrismaClient } = require('@prisma/client');
import userRoutes from './routes/user.routes'
import categoryRoutes from './routes/category.routes'
import subCategoryRoutes from './routes/subCategory.routes'
import listingRoutes from './routes/listing.routes'
import photoRoutes from './routes/photo.routes'
import reviewRoutes from './routes/review.routes'
import requestRoutes from './routes/requests.routes'
import messageRoutes from './routes/message.routes'
import wishlistRoutes from './routes/wishlist.routes'
import broadcastRoutes from './routes/broadcast.routes'
import carouselRoutes from './routes/carousel.routes'
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


app.use(express.json())
// Routes
app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/subCategories', subCategoryRoutes)
app.use('/carousels', carouselRoutes)
app.use('/photos', photoRoutes)
app.use('/listings', listingRoutes)
app.use('/reviews', reviewRoutes)
app.use('/requests', requestRoutes)
app.use('/message', messageRoutes)
app.use('/wishlist', wishlistRoutes)
app.use('/broadcast', broadcastRoutes)
app.use('/static', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const io = new Server(server, {
      cors: {
        origin: '*', // this was localhost3000 when running locally
        methods: ['GET', 'POST'],
        },
    });

    const connectedUsers = new Map<string, string>();

    io.sockets.on('connection', (socket: Socket) => {
      console.log(`A user connected: ${socket.id}`);

      socket.on("connect_error", (err) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);
      
        // some additional description, for example the status code of the initial HTTP response
        console.log(err.description);
      
        // some additional context, for example the XMLHttpRequest object
        console.log(err.context);
      });

      // Register online user to push real time message
      socket.on('register', async (userData: UserData) => {
        connectedUsers.set(userData.id, socket.id);
        socket.data.userId = userData.id;
        socket.data.username = userData.username;
        console.log(`${userData.username} (ID: ${userData.id}) registered`);
      });

      // Emit message event
      socket.on('message', async ({ to, message }: { to: string; message: string }) => {
        try {
          if (socket.data.userId) {
            // Save message in database
            await MessageService.sendMessage(socket.data.userId, to, message);
            // Get recipient socket id
            const recipientSocket = connectedUsers.get(to);
            // Send message to recipient
            if (recipientSocket) {
              io.to(recipientSocket).emit('message', {
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

      socket.on('disconnect', () => {
        if (socket.data.userId) {
          connectedUsers.delete(socket.data.userId);
          console.log(`${socket.data.username} (ID: ${socket.data.userId}) disconnected`);
        }
      });
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

main();