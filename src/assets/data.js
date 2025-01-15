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
export const COLORS = ["#FA003E", "#772283", "#0F3A33"]

