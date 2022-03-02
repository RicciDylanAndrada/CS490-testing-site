import React from 'react'
import LoginContext from '../content/LoginContext'
import { useContext } from 'react'
function useAuth() {
  return (

    useContext(LoginContext)
  )
}

export default useAuth