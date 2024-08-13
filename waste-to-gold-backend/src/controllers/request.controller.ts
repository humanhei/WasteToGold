import { Request, Response } from 'express'
import { RequestService } from '../services/request.service'

export const RequestController = {
  getAllRequests: async (req: Request, res: Response) => {
    try {
      const categories = await RequestService.getAllRequests()
      res.json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve requests' })
    }
  },

  getRequestById: async (req: Request, res: Response) => {
    try {
      const { requestId } = req.params;
      const request = await RequestService.getRequestById(requestId)
      res.json(request)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve request' })
    }
  },

  getRequestsByListingId: async (req: Request, res: Response) => {
    try {
      const { listingId } = req.params;
      const request = await RequestService.getRequestsByListingId(listingId)
      res.json(request)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve request' })
    }
  },

  createRequest: async (req: Request, res: Response) => {
    const { unit, listingId, authorId } = req.body
    try {
      const request = await RequestService.createRequest(unit, listingId, authorId)
      res.status(201).json(request)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  approveRequest: async (req: Request, res: Response) => {
    const { requestId } = req.params;
    try {
      const request = await RequestService.approveRequest(requestId)
      res.status(201).json(request)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  rejectRequest: async (req: Request, res: Response) => {
    const { requestId } = req.params;
    try {
      const request = await RequestService.rejectRequest(requestId)
      res.status(201).json(request)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  updateRequest: async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const { unit, status, listingId, authorId } = req.body;
    try {
      const request = await RequestService.updateRequest(requestId, unit, status, listingId, authorId)
      res.status(201).json(request)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },

  deleteRequest: async (req: Request, res: Response) => {
    const { requestId } = req.params
    try {
      const request = await RequestService.deleteRequest(requestId)
      res.status(201).json(request)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ errors: [{ message: error.message }] });
      }
    }
  },
}