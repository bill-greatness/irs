import {NavLink} from 'react-router-dom'
/* eslint-disable react/prop-types */

export const Card = ({description, number, background}) => {
  console.log(background)
    return (
        <div className={`${background} p-1 w-1/5 rounded flex items-center justify-center flex-col text-center md:p-3  text-white`}>
            <h3 className="text-sm md:text-3xl font-bold text-center">{number}</h3>
            <p className="text-base md:text-lg">{description}</p>
        </div>
    )
}


export const SideLink = ({name, path, Icon}) => (
    <NavLink to={path} className={({isActive}) => (isActive ? "bg-yellow-500 text-black flex justify-between p-2" : "p-2 flex justify-between")}>
      <p className="text-md">{name}</p>  <Icon size={25} color="gray"/>
    </NavLink>
)


export const QueryModal = () => {

}



export const ProfileCard = ({name, department, photo }) => (
    <div className="flex cursor-pointer hover:scale-105 transition-all duration-500 bg-green-500 flex-col w-1/5 overflow-hidden min-h-80 rounded shadow-md">
      <img src={photo} className="w-full h-56 bg-black"></img>
      <div className='p-2'>
        <h3 className='text-bold text-lg'>{name}</h3>
        <p className='text-base font-normal'>{department}</p>
      </div>
    </div>
)
