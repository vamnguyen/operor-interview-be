import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'

const prisma = new PrismaClient()

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  ip_address: string
  days: number
}

interface Meeting {
  id: number
  user_id: number
  room_id: number
  start_day: number
  end_day: number
}

async function main() {
  // Read JSON files
  const usersData: User[] = JSON.parse(await fs.readFile('../data/users.json', 'utf-8'))
  const meetingsData: Meeting[] = JSON.parse(await fs.readFile('../data/meetings.json', 'utf-8'))

  // Insert users data
  for (const user of usersData) {
    await prisma.user.create({
      data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        ip_address: user.ip_address,
        days: user.days,
        createdAt: new Date() // Assuming createdAt is not provided in JSON
      }
    })
  }

  // Insert meetings data
  for (const meeting of meetingsData) {
    await prisma.meeting.create({
      data: {
        id: meeting.id,
        user_id: meeting.user_id,
        room_id: meeting.room_id,
        start_day: meeting.start_day,
        end_day: meeting.end_day,
        createdAt: new Date() // Assuming createdAt is not provided in JSON
      }
    })
  }
}

main()
  .then(() => {
    console.log('Data migrated successfully')
  })
  .catch((e) => {
    console.error('Error migrating data', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
    // process.exit(1)
  })
