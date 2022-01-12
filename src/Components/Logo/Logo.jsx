import React from 'react'
import classes from "./Logo.module.scss"
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

export default function Logo() {
    let navigate = useNavigate()
    let username = jwt_decode(localStorage.token).username
    return (
        <h5 onClick={() => navigate("/account")} className={classes.username}><i className='fa fa-user'></i> {username}</h5>
    )
}
