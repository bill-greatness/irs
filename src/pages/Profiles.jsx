import { useEffect, useState } from "react";
import { ProfileCard } from "../components/Cards";
import { IoPersonAddOutline } from "react-icons/io5";
import AddProfile from "../components/AddProfile";
import { searchQuery } from "../firebase/firestore";
import { useOutletContext } from "react-router-dom";

export default function Profiles() {
    const [profiles, setProfiles] = useState([]);

    const {user} = useOutletContext()
   
    useEffect(() => {
        searchQuery({
            path:"/users",
            type:"code", 
            searchString:"IRS",
            getData:setProfiles
        })
    },[])

    const [open, setOpen] = useState(false)
  return (
    <div className="flex-1 relative h-full p-3">
        <div className="flex justify-between items-center  p-3">
            <div className="p-3 ">
                <h3 className="font-bold text-xl">Administrative Profiles</h3>
                <p className="font-normal text-base">See Registered Profile on this portal...</p>
            </div>
            <button disabled={user?.role !== "Admin"} onClick={() => setOpen(true)}>
                <IoPersonAddOutline  size={25}/>
            </button>
        </div>
        <div className="flex items-center  p-3 w-full flex-wrap gap-3">
            {profiles?.map(profile => <ProfileCard key={profile?.id} {...profile} /> )}
        </div>

        {open && <AddProfile close={() => setOpen(false)}/>}
    </div>
  )
}
