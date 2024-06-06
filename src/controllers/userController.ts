import { Request, Response, NextFunction } from "express";
import { fetchUsersWithMeetings } from "~/services/userService";
import { BadRequestError } from "~/utils/errors";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    // Validate pagination parameters
    if (isNaN(offset) || isNaN(limit) || offset < 0 || limit <= 0) {
      throw new BadRequestError("Invalid pagination parameters");
    }

    const users = await fetchUsersWithMeetings(offset, limit);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
