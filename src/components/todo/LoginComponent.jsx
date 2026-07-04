import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
function LoginComponent(){
    const [username,setUsername]=useState('Shikhar')
    const [password,setPassword]=useState('')
    // const [showSuccessMessage,setShowSuccessMessage]=useState(false)
    const [showErrorMessage,setShowErrorMessage]=useState(false)
    const navigate=useNavigate()
    const authContext=useAuth()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function handleSubmit(){
        if(await authContext.login(username,password)){
            // setShowSuccessMessage(true)
            // setShowErrorMessage(false)
            navigate('/welcome/'+username)
        }else{
            // setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }

    // function SuccessMessageComponent(){
    //     if(showSuccessMessage){
    //         return <div className="successMessage">Authenticated Successfull!!</div>
    //     }
    //     return null
    // }

    // function ErrorMessageComponent(){
    //     if(showErrorMessage){
    //         return <div className="errorMessage">Authentication failed. Please check your credentials..</div>
    //     }
    //     return null
    // }

    return(
        <div className="Login">
            <h1>Time to Login!!</h1>
            {/* <SuccessMessageComponent />
            <ErrorMessageComponent /> */}
            {/* {showSuccessMessage && <div className="successMessage">Authenticated Successfull!!</div>} */}
            {showErrorMessage && <div className="errorMessage">Authentication failed. Please check your credentials..</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;