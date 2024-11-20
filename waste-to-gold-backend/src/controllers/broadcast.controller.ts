import { Request, Response } from 'express'
import { ListingService } from '../services/listing.service'

export const BroadcastController = {
  getAllBroadcast: async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
      const broadcasts = await ListingService.getAllRequestListings(userId)
      res.json(broadcasts)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve broadcasts' })
    }
  },

  getBroadcastByLoc: async (req: Request, res: Response) => {
    const { location, userId } = req.params
    try {
      const broadcasts = await ListingService.getRequestListings(location, userId)
      res.json(broadcasts)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve broadcasts' })
    }
  },
}