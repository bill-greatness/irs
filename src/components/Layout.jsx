import {SideLink} from './Cards'
import {LINKS} from '../assets/data' 
import {Outlet} from 'react-router-dom'
import { FaBars } from 'react-icons/fa6'

export default function Layout(){
    const user = JSON.parse(localStorage.getItem('USER'))
    return (
        <div className="flex md:flex-row flex-col flex-1 h-screen">
            <div className="md:hidden flex px-3 bg-green-500 justify-between py-2 items-center">
                <h3 className="font-normal text-xl ">Reporting System</h3>
                <button>
                    <FaBars size={20}/>
                </button>
            </div>
            <div className="hidden md:flex gap-3 flex-col w-40 md:w-1/6 bg-gray-200 p-3">
                <div className="flex flex-col pb-3">
                    <h3 className="font-bold text-2xl">Reporting System</h3>
                    <p className="text-light">TTU</p>
                </div> 
                {LINKS.map(link => <SideLink key={link.name} {...link} />)}      
            </div>
            <div className="flex-1">
                <Outlet context={{user}}/>
            </div>
        </div>
    )
}