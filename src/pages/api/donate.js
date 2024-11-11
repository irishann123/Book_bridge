import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req,res,authOptions);
  
  if(req.method === 'POST') {
    if(session) {
      try {
        const body = req.body;
        const bookData = {
            course: {
                connect: {
                    courseCode: body.courseCode,
                },
            },
            amount: +body.amount,
            user: {
                connect: {
                    email: session.user.email,
                },
            },
            author: body.author,
            name: body.name,
        };
        const createBook = await prisma.book.create({
            data: bookData,
            include: {
                course: true,
                user: true,
            },
        });
        console.log("book created");
        res.status(200).json(createBook);
      }
      catch(err) {
        console.log(err);
        res.status(500).json({error:"An error occured"});
      }
    }
    else {
      res.status(401).json({error: "unauthenticated"});
    }
  }
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
