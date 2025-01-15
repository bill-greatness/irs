import {SideLink} from './Cards'
import {LINKS} from '../assets/data' 
import {Outlet} from 'react-router-dom'

export default function Layout(){
    const user = JSON.parse(localStorage.getItem('USER'))
    return (
        <div className="flex flex-1 h-screen">
            <div className="flex gap-3 flex-col w-1/6 bg-gray-200 p-3">
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