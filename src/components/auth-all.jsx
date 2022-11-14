import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"



export const AuthAll = ({ children }) =>{
    const user = useSelector(state => state.userSlice.user)
    if(user){
        return children
    }
    return <Navigate to='/login' replace={true} />
}