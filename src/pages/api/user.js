import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req,res,authOptions);
  if(req.method === 'GET') {
    if(session) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          }
        });
        console.log("db user fetched");
        res.status(200).json({user});
      }
      catch(err) {
        res.status(500).json({error:"An error occured"});
      }
    }
    else {
      res.status(401).json({error: "unauthenticated"});
    }
  }
  else if(req.method === 'POST') {
    if(session) {
      try {
        const user = await prisma.user.update({
          where: {
            email: session.user.email,
          },
          data: req.body,
        });
        console.log('user updated');
        res.status(200).json({user});
      }
      catch(err) {
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
