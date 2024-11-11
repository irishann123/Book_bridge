import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req,res,authOptions);
  
  if(req.method === 'POST') {
    if(session) {
      try {
         const body = req.body;
         console.log(body);
         const transaction = await prisma.transaction.create({
          data: {
            buyer: {
              connect: {
                id: body.buyerId,
              },
            },
            seller: {
              connect: {
                id: body.sellerId,
              },
            },
            send: body.amount, 
            received: Math.round(body.amount * 0.9),
          },
        });
        
        const donation = await prisma.donation.create({
          data: {
            user: {
              connect: {
                id: body.buyerId,
              },
            },
            amount: Math.round(body.amount / 10), 
          },
        });
        const deleteBook = await prisma.book.delete({
          where: {
            id: body.bookId,
          },
         });
        console.log("transaction and donation done");
        console.log("book deleted");
        res.status(200).json({transactiondetails: transaction,donationDetails: donation});
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
