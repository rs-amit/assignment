import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./UserReducer";


export const LoginUser = async(dispatch, user)=>{
    dispatch(loginStart())
    await axios.post("https://mybasket-server.jerryroy.repl.co/api/auth/login", {
        username: user.userName,
        loginPassword:user.password
    } ).then((response)=>{
        console.log("user",response.data.user)
        dispatch(loginSuccess(response.data.user))
    }).catch((error)=>{
        console.error(error)
        dispatch(loginFailure())
    })
}