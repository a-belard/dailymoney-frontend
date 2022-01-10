import React, {useEffect, useState} from 'react'
import {useParams, Navigate} from "react-router-dom"
import axiosInstance from '../../axios';
import Loader from '../../Components/Loader';

export default function Checkemail() {
    let params = useParams();
    const [username, setusername] = useState("")
    const [isloading, setisloading] = useState(true)
    useEffect(() => {
        if(params.id.length === 24){
            var getUser = async () => {
                await axiosInstance.get("/username/"+params.id)
                .then(data => {
                    setusername(data.data)
                    setisloading(false)
                })
            }
            return getUser()
        }
    }, [params.id])

    return params.id && params.id.length === 24 ? 
    (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
            textAlign: 'center',
            background: 'linear-gradient(#FFFFFF,#becfff)'
        }}>
            {isloading ? <Loader/> : ""}
          <h2 style={{marginBottom: "30px"}}>Hi {username && username}👋,</h2> 
          <p style={{fontSize:"1.1em"}}>
              Thanks for your registration!
              <br />
              Now go check your email for <strong>verification</strong>!
            </p>
        </div>
    )
    :
    (<Navigate to={"/"}/>)
}
