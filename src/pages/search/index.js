import { useState,useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";

export default function Search() {

    const router = useRouter();

    const {userState} = useContext(UserContext);
    const [userDetails, setUserDetails] = userState;

    const [sem,setSem] = useState(null);
    const [books,setBooks] = useState(null);
    
    function handleChange(evt) {
        const value = evt.target.value;

        setSem(value);
    }

    const buyBook = async (data) => {
        const user = await fetch('/api/buy',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        return user.json();
    };

    const handleBuy = async (sellerId,buyerId,amount,bookId) => {
        const response = await buyBook({sellerId,buyerId,amount,bookId});
        if(response.donationDetails) {
            router.push("/");
        }
    };

    const searchBook = async (data) => {
        const user = await fetch('/api/search',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        return user.json();
    };

    async function handleSearch() {
        if(!sem) {
            console.log('enter semester');
        }
        else {
            const response = await searchBook(sem);
            setBooks(response);
        }
    }

    return(
        <div className="flex flex-col items-center mt-10">
            <div>Search For A Book</div>
            <div className="branch grid grid-rows-2 w-3/4 pb-7 ">
            <span className="pb-3">
            <label>Semester</label>
            </span>
            <div>
            <select
                onChange={handleChange}
                name="branch"
                className="w-3/4 py-4 px-1 rounded-lg gray-bg opacity-75"
                defaultValue={"null"}
            >
                <option value={"null"} disabled>
                enter sem
                </option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
            </select>
            </div>
            </div>
            <button onClick={handleSearch} className="border p-2 border-black rounded-md">Search</button>
            {books &&
                <div className="mt-5 p-7 border border-black flex flex-col gap-4">
                    {books.map((book,index) => <div key={index} className="flex gap-4 justify-between">
                        <span>{book.name}</span>
                        <span>{book.author}</span>
                        <span>Rs.{book.amount}</span>
                        <button onClick={() => handleBuy(book.user.id,userDetails.id,book.amount,book.id)} className="border border-black p-1 rounded-md">Buy</button>
                    </div>)}
                </div>
            }
        </div>
    );
}