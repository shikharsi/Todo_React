import { useParams, useNavigate } from "react-router-dom"
import { retrieveTodoApi, updateTodoApi, createTodoApi } from "./api/TodoApiService"
import { AuthContext, useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"

export default function TodoComponent(){
    const {id}=useParams()
    const [description, setDescription]=useState('')
    const [targetDate, setTargetDate]=useState('')
    const username=useAuth().username
    const navigate=useNavigate()

    useEffect(
        () => retrieveTodos(),
        [id]
    )

    function retrieveTodos(){
        if(id!=-1){
            retrieveTodoApi(username , id)
            .then(response => {
                console.log(response)
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        console.log(values)
        const todo={
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done:false
        }
        console.log(todo)
        if(id==-1){
            createTodoApi(username,todo)
            .then(response => {
                console.log(response)
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
        updateTodoApi(username,id,todo)
        .then(response => {
            console.log(response)
            navigate('/todos')
        })
        .catch(error => console.log(error))
    }

    function validate(values){
        let errors={
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid Target Date'
        }
        if(values.description.length<5){
            errors.description= 'Enter atleast 5 characters'
        }

        if(values.targetDate==null || values.targetDate=='' ){
            errors.targetDate='Enter a valid date'
        }
        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details </h1>
            <div>
                <Formik initialValues={{description, targetDate}} 
                enableReinitialize="true"  
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}> 
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage 
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage 
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}