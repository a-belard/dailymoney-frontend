import React from 'react'
import classes from "./Logo.module.scss"
import jwt_decode from "jwt-decode"

export default function Logo() {
    let username = jwt_decode(localStorage.token).username
    return (
        <h5 className={classes.username}><i className='fa fa-user'></i> {username}</h5>
    )
}
