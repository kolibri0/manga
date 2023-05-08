import { Navigate } from "react-router-dom"
import { useAppSelector } from "../store/hook"



export const AuthAll = ({ children }: {children: any}) =>{
    const user = useAppSelector(state => state.userSlice.user)
    if(user){
        return children
    }
    return <Navigate to='/login' replace={true} />
}