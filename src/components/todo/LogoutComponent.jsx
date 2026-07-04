import { useAuth } from "./security/AuthContext"

function LogoutComponent(){
    // useAuth().setAuthenticated(false)
    return(
        <div className="LogoutComponent">
            <h1>You are logged out!!</h1>
            <div>
                Thank you for using our app. Come back soon!!
            </div>
        </div>
    )
}

export default LogoutComponent