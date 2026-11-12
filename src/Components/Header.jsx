import React from 'react'
import { NavLink } from 'react-router-dom'
import useTheme from '../context/useTheme'

const Header = () => {

  const {theme,toggleTheme} = useTheme();

  return (
    <header className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>Job Tracker</h1>
        <nav className='nav-options'>
          <NavLink  to='/'>Dashboard</NavLink>
          <NavLink  to='/applications'>Applications</NavLink>
          <NavLink  to='/settings'>Settings</NavLink>
        </nav>
        <button type='button' onClick={toggleTheme} className='font-bold border-2 border-indigo-600 rounded-md p-1 bg-indigo-600 text-white hover:bg-black hover:border-black cursor-pointer' id="nav-btn">
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
    </header>
  )
}

export default Header