const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const os = await prisma.course.upsert({
      where: { courseCode: 'CS-210' },
      update: {},
      create: {
        courseCode: 'CS-210',
        sem: '4',
        courseName: 'Operating Systems',
      },
    })
  
    const mp = await prisma.course.upsert({
        where: { courseCode: 'CS-305' },
        update: {},
        create: {
          courseCode: 'CS-305',
          sem: '5',
          courseName: 'Micro Processors',
        },
    })
    console.log({ os,mp })
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })