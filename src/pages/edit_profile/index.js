import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function EditProfile() {
    const router = useRouter();

    const {userState} = useContext(UserContext);
    const [userDetails, setUserDetails] = userState;

    const [profile,setProfile] = useState({
        branch: null,
        sem: null,
        phone: null,
    });

    const updateProfile = async (profile) => {
        const user = await fetch('/api/user',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...profile,isProfileCompleted:true}),
        });
        return user.json();
      };

    function handleChange(evt) {
        const value = evt.target.value;

        setProfile({
        ...profile,
        [evt.target.name]: value,
        });
    }

    async function handleSubmit() {
        if(!profile.branch||!profile.sem||!profile.phone) {
            console.log('fill all fields');
        }
        else {
            const response = await updateProfile(profile);
            if(response.user.isProfileCompleted===true) {
                setUserDetails({...response.user});
                router.push("/");
            }
        }
    }

    return(
        <div className="flex flex-col items-center mt-10">
            <div>Edit Profile</div>
            <div className="branch grid grid-rows-2 w-3/4 pb-7 ">
            <span className="pb-3">
            <label>Branch</label>
            </span>
            <div>
            <select
                onChange={handleChange}
                name="branch"
                className="w-3/4 py-4 px-1 rounded-lg gray-bg opacity-75"
                defaultValue={"null"}
            >
                <option value={"null"} disabled>
                choose branch
                </option>
                <option value={"ece"}>ECE (T)</option>
                <option value={"mech"}>Mech (M)</option>
                <option value={"civil"}>Civil (C)</option>
                <option value={"cs"}>CS (R)</option>
                <option value={"eee"}>EEE (E)</option>
                <option value={"chem"}>Chem(H)</option>
                <option value={"arch"}>Arch(A)</option>
                <option value={"mech-pro"}>Mech Pro</option>
                <option value={"electrical&computer"}>ERE</option>
            </select>
            </div>
            </div>
            <div className="branch grid grid-rows-2 w-3/4 pb-7 ">
            <span className="pb-3">
            <label>Year</label>
            </span>

            <div>
            <select
                onChange={handleChange}
                name="sem"
                className="w-3/4 py-4 rounded-lg gray-bg opacity-75"
                defaultValue={"null"}
            >
                <option value={"null"} disabled>
                choose sem
                </option>
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
                <option value={"5"}>5</option>
                <option value={"6"}>6</option>
                <option value={"7"}>7</option>
                <option value={"8"}>8</option>
            </select>
            </div>
            </div>
            <div className="name grid grid-rows-2 w-3/4 pb-7">
                <span className="pb-3">
                <label>Phone</label>
                </span>
                <input
                className="input w-full max-w-xs border border-black rounded-md"
                type={"text"}
                name="phone"
                onChange={handleChange}
                ></input>
            </div>
            <button onClick={handleSubmit} className="border-2 border-black p-2 rounded-xl">Submit</button>
        </div>
    );
}