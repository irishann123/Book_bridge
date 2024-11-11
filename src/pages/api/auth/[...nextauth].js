import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/../lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
  ],
  callbacks: {
    async signIn({user,account}) {
        if(account.provider === "google") {
            const {name,email} = user;
            try {
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                console.log('database checked for user');
                if(!userExists) {
                    const result = await prisma.user.create({
                        data: {
                            name,
                            email
                        },
                    });
                    console.log('database written');
                    return user;
                }
            }
            catch(err) {
                console.log(err);
            }
        }

        return user;
    },
    // async session({session}) {
    //     if(!session.userInfo) {
    //         const userInfo = await prisma.user.findUnique({
    //             where: {
    //                 email: session.user.email,
    //             }
    //         });
    //         console.log('database fetched for session');
    //         session.userInfo = userInfo;
    //     }
    //     return session;
    // },
  },
};

export default NextAuth(authOptions);