import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAllUsers()
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' })
    }
  },

  getUserById: async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await UserService.getUserById(userId);
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' })
    }
  },

  getUserByEmail: async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
      const user = await UserService.getUserByEmail(email);
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' })
    }
  },

  getUserByPhone: async (req: Request, res: Response) => {
    const { phone } = req.params;
    try {
      const user = await UserService.getUserByPhone(Number(phone));
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' })
    }
  },

  checkUsername: async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
      const user = await UserService.checkUsername(username);
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' })
    }
  },

  logInUser: async (req: Request, res: Response) => {
    const { email, username, phone, password } = req.body
    try {
      const result = await UserService.logInUser(email, username, phone, password)
      res.status(201).json(result)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  signUpUser: async (req: Request, res: Response) => {
    const { email, username, phone, password } = req.body
    try {
      const result = await UserService.signUpUser(username, password, email, phone)
      res.status(201).json(result)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  verifyOTP: async (req: Request, res: Response) => {
    const { email, phone, token } = req.body
    try {
      const result = await UserService.verifyOTP(token, email, phone)
      res.status(201).json(result)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  createUser: async (req: Request, res: Response) => {
    const { email, username, phone } = req.body
    try {
      const user = await UserService.createUser(username, email, phone)
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}