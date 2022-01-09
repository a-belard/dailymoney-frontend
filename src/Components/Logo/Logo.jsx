import React from 'react'
import Image from "../../assets/dailymoney.png"
import classes from "./Logo.module.scss"

export default function Logo() {
    return (
        <img src={Image} alt="" className={classes.logo}/>
    )
}
