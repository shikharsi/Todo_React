import { createContext, useContext, useState } from "react";
import {executeBasicAuthenticationService} from "../api/HelloWorldApiService"
import { apiClient } from "../api/ApiClient";
export const AuthContext = createContext()
export const useAuth = ()=> useContext(AuthContext)

export default function AuthProvider({ children }){
    const [isAuthenticated,setAuthenticated]=useState(false)
    const [username,setusername]=useState(null)
    const [token,setToken]=useState(null)
    const valueToBeShared={ isAuthenticated, login, logout, username,token }

    // function login(username, password){
    //     if(username==='shikhar' && password==='dummy'){
    //         setAuthenticated(true)
    //         setusername(username)
    //         return true
    //     }else{
    //         setAuthenticated(false)
    //         setusername(null)
    //         return false
    //     }
    // }

    async function login(username, password){
        const baToken='Basic '+ window.btoa(username+":"+password)
        try{
            const response = await executeBasicAuthenticationService(baToken)

            if(response.status=200){
                setAuthenticated(true)
                setusername(username)
                setToken(baToken)
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log("Intercepting and adding Token")
                        config.headers.Authorization=baToken
                        return config
                    }
                )
                return true
            }else{
                logout()
                return false
            }
        }catch(error){
            logout()
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setusername(null)
    }

    return (
        <AuthContext.Provider value={ valueToBeShared }>
            {children}
        </AuthContext.Provider>
    )
}