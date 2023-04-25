import React from 'react'
import MenuUser from '../moleculas/MenuUser/MenuUser'
import { Outlet } from 'react-router-dom'

const GestionUsuarios = () => {
  return (
    <div>
      <MenuUser />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default GestionUsuarios