import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function Layout({children}) {
  const {status} = useSession();
  const router = useRouter();

  const {userState} = useContext(UserContext);
  const [userDetails, setUserDetails] = userState;
  
  const getData = async () => {
    const user = await fetch('/api/user',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return user.json();
  };

  useEffect(() => {
    (async () => {
      console.log('use effect running with status:',status);
      if(status==="authenticated") {
        if(!userDetails) {
          const response = await getData();
          if(response.user) {
            setUserDetails({...response.user});
          }
          if(response.user.isProfileCompleted===false)
            router.push("/edit_profile");
        }
      }
      else if(status==="unauthenticated") {
        setUserDetails(null);
        router.push("/");
      }
    })();
  },[status]);

    return(<>
        <Head>
            <title>Book Bridge</title>
        </Head>
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-auto">{children}</main>
            <Footer/>
        </div>
    </>);
};