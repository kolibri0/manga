import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const LoginAuth = ({children}) =>{
    const user = useSelector(state => state.userSlice.user)

    if(!user){
        return children
    }
    return <Navigate to='/' replace={true} />
}

export {LoginAuth}