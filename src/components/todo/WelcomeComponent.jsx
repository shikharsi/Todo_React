import {  Link, useParams } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import { useState } from 'react'
import {retrieveHelloWorldBean, retrieveHelloWorldPathVarBean} from './api/HelloWorldApiService'
function WelcomeComponent(){
    const {username}=useParams()
    const authContext=useAuth()
    const [message,setMessage]=useState(null)

    function callHelloWorldRestApi(){
        // axios.get("http://localhost:8080/hello-world")
            
        // retrieveHelloWorldBean()
        //     .then((response)=>successfulResponse(response))
        //     .catch((error)=>errorResponse(error))
        //     .finally(()=>console.log('cleanup!!!'))

        retrieveHelloWorldPathVarBean('Shikhar',authContext.token)
            .then((response)=>successfulResponse(response))
            .catch((error)=>errorResponse(error))
            .finally(()=>console.log('cleanup!!!'))
    }

    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    return(
        <div className="WelcomeComponent">
            <h1>Welcome {username}!!</h1>
            <div>
                Manage your Todos : <Link to="/todos">Go here</Link>
            </div>
            {/* <div>
                <button className="btn btn-success" onClick={callHelloWorldRestApi}>
                    Call Hellow World!
                </button>
            </div> */}
            {/* <div className='text-info'>{message}</div> */}
        </div>
    )
}

export default WelcomeComponent;