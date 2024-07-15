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

  createUser: async (req: Request, res: Response) => {
    const { email, username, phone, password } = req.body
    try {
      const user = await UserService.createUser(email, username, phone, password)
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}