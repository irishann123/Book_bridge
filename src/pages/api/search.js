import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req,res,authOptions);
  
  if(req.method === 'POST') {
    if(session) {
      try {
        const body = req.body;
        const books = await prisma.book.findMany({
            where: {
                course: {
                    sem: body,
                },
            },
            include: {
                course: true,
                user: true,
            },
        });
        console.log("books fetched");
        res.status(200).json(books);
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
