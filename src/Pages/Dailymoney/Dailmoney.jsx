import { FormControl, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Adminnav from './Adminnav/Adminnav'
import classes from './Dailymoney.module.scss'
import Notifications from './Notifications/Notifications'
import Stats from './Stats/Stats'
import Transactions from './Transactions/Transactions'
import Users from './Users/Users'

export default function Dailmoney() {
    const [password, setpassword] = useState("")
    const [isadmin, setisadmin] = useState(false)
    const [activepage, setactivepage] = useState("dashboard")
    const [errortext, seterrortext] = useState("")

    let handleSubmit = e => {
        e.preventDefault()
        if(password === "$Dailymoney@2022"){
            setisadmin(true)
        }
        else {
            seterrortext("Incorrect password")
        }
    }
    return (
        !isadmin ?
        (
            <div className={classes.login}>
                <Typography variant='primary' component={"h4"} color={"GrayText.primary"}>Password needed to continue</Typography>
                <br />
                <br />
                <form onSubmit={e => handleSubmit(e)}>
                    <FormControl fullWidth>
                        <TextField variant="filled" label="Password" type={"text"} onChange={e => {setpassword(e.target.value); seterrortext("")}}/>
                    </FormControl>
                    <br />
                    <span style={{color: "red"}}>{errortext}</span>
                    <button type='submit'>CONTINUE</button>
                </form>
            </div>
        )
        :
        (
            <div className={classes.dailymoney}>
                {
                    activepage === "dashboard" ?
                        (
                            <Stats/>
                        )
                    :
                    activepage === "invite" ?
                        (
                            <Transactions/>
                        )
                    :
                    activepage === "notifications" ?
                            (
                                <Notifications/>
                            )
                    :
                            (
                                <Users/>
                            )
                }
                <Adminnav active={activepage} changePage={page => setactivepage(page)}/>
            </div>
        )
    )

}
