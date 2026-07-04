import { useState, useEffect } from 'react'
import { useAuth } from './security/AuthContext'
import {retrieveuserTodosApi, deleteTodoApi} from './api/TodoApiService'
import { useNavigate } from 'react-router-dom'

function ListTodosComponent(){
    const today=new Date()
    const targetDate=new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    // const todos=[
    //     {id:1, description:'Learn AWS', done:false, targetDate:targetDate},
    //     {id:2, description:'Learn Full Stack Dev', done:false, targetDate:targetDate},
    //     {id:3, description:'Learn Devops', done:false, targetDate:targetDate},
    // ]
    const [todos,setTodos]=useState([])
    const [message,setMessage]=useState(null)
    const authContext=useAuth()
    const user=authContext.username
    const navigate=useNavigate()
    useEffect(()=>{getTodos()},[])
    function getTodos(){
        retrieveuserTodosApi(user)
                .then((response)=>{
                    console.log(response.data)
                    setTodos(response.data)
                })
                .catch((error)=>console.log(error))
                .finally(()=>console.log('done!!!'))
    }

    function deleteTodo(id){
        deleteTodoApi(user,id)
        .then((response)=>{
                    setMessage(`Delete of Todo with id = ${id} successfull!!`)
                    getTodos()
                })
                .catch((error)=>console.log(error))
    }

    function updateTodo(id){
        console.log("ID : "+id)
        navigate(`/todo/${id}`)
    }

    function addNewTodo(){
        navigate(`/todo/-1`)
    }

    return(
        <div className="container">
            <h1>Things you want to do!</h1>
            {message && <div className='alert alert-warning'>{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className='btn btn-warning' onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className='btn btn-success' onClick={()=>updateTodo(todo.id)}>update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className='btn btn-success m-3'
            onClick={addNewTodo}>Add new Todo</div>
        </div>
    )
}

export default ListTodosComponent