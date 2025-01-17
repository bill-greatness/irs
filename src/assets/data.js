import { LuLayoutDashboard, LuHistory} from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";


export const LINKS = [
    {
        name:"Dashboard", 
        path:"/", 
        Icon: LuLayoutDashboard
    }, 
    {
        name:"History", 
        path:"/history", 
        Icon: LuHistory
    },
    {
        name:"Profiles", 
        path:"/profiles", 
        Icon: HiOutlineUsers
    }, 
    {
        name:"Logout", 
        path:"/login", 
        Icon:IoLogOutOutline
    }
]

export const DEPARTMENTS = ["Computer Science", "Mathematics", "Others..."]
export const ROLES  = ["Admin", "Secretary", "Generic Role"]
export const COLORS = ["bg-red-500", "bg-teal-500", "bg-orange-500", "bg-green-500", "bg-fushia-500"]

