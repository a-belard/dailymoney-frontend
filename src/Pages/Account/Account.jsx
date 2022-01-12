import React, {useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Account.module.scss"
import axiosInstance from '../../axios'
import decode from "jwt-decode"

export default function Account() {
    const [userinfo, setuserinfo] = useState({})
    const [isloading, setisloading] = useState(true)
    const [isediting, setisediting] = useState(false)
    const decoded = decode(localStorage.token)
    useEffect(
        () => {
            async function getInfo(){
                let userinfo = await axiosInstance.get("/user/" + decoded._id)
                setuserinfo(userinfo.data)
                setisloading(false)
            }
            getInfo()
    },[decoded._id])
    return (
        <div className={classes.account}>
            {!isediting ? 
            (
                <>
                    <div>
                        <div>
                            <i className='fa fa-user'></i>
                        </div>
                        <h3>Profile</h3>
                        <div>
                            <i className='fa fa-pencil'></i>
                        </div>
                    </div>
                    <div>
                        <p>Names</p><p>{userinfo.names}</p>
                        <p>Username</p><p>{userinfo.username}</p>
                        <p>Email</p><p>{userinfo.email}</p>
                        <p>Gender</p><p>{userinfo.gender}</p>
                        <p>Country</p><p>{userinfo.country}</p>
                        <p>Phone number</p><p>{userinfo.phone}</p>
                        <p>Username</p><p>{userinfo.username}</p>
                    </div>
                </>
            )
        :
        <div></div>
        }
            <Navbar active={"account"}/>
        </div>
    )
}
