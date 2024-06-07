import { BadRequestError, InternalServerError, NotFoundError } from "src/utils/errors";
import { prisma } from "src/utils/prismaConfig";

export const fetchUsersWithMeetings = async (offset: number, limit: number) => {
  try {
    // Get total number of users
    const totalUsers = await prisma.user.count();

    // Check if offset is greater than total users
    if (offset >= totalUsers) {
      return "No users found with the given offset";
    }

    // Fetch users with meetings
    const users = await prisma.user.findMany({
      include: {
        meetings: true
      },
      skip: offset,
      take: limit
    });

    // Check if users were found
    if (!users || users.length === 0) {
      throw new NotFoundError("No users found");
    }

    // Format user data
    const formattedUsers = users.map((user) => {
      const meetingDays = user.meetings.map((meeting) => ({
        start_day: meeting.start_day,
        end_day: meeting.end_day
      }));

      const daysWithoutMeetings =
        user.days - user.meetings.reduce((acc, meeting) => acc + (meeting.end_day - meeting.start_day + 1), 0);

      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        days: user.days,
        meeting_days: meetingDays,
        days_without_meetings: daysWithoutMeetings > 0 ? daysWithoutMeetings : 0
      };
    });

    return formattedUsers;
  } catch (error) {
    // Rethrow known errors
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    // Throw internal server error for unexpected issues
    throw new InternalServerError("Failed to fetch users");
  }
};
