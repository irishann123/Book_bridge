import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function UserInfo() {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return (
      <>
      <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={60}
          height={60}
          alt="user image"
        />
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-10 justify-center items-center w-full">
        <Link href="/donate"><button className="border border-black p-2 rounded-md">Donate</button></Link>
        <Link href="/search"><button className="border border-black p-2 rounded-md">Search</button></Link>
        <Link href="#"><button className="border border-black p-2 rounded-md">Transactions</button></Link>
      </div>
      </>
    );
  } else {
    return (
      <div className="flex justify-center mt-20">
        <button onClick={() => signIn("google")}
        className="flex items-center gap-4 shadow-xl">
            <span className="bg-blue-500 text-white px-4 py-3">
                Sign in with Google
            </span>
        </button>
      </div>
    );
  }
}