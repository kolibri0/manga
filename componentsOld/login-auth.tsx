import { Navigate } from "react-router-dom"
import { useAppSelector } from "../store/hook"
import React from "react"

// children: React.ElementType?

const LoginAuth = ({ children }: { children: any }) => {
  // const user = useAppSelector(state => state.userSlice.user)

  if (1) {
    return children
  }
  return <Navigate to='/' replace={true} />
}

export { LoginAuth }