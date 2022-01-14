import { format } from 'date-fns'
import React, {useEffect, useState, } from 'react'
import classes from "./Users.module.scss"
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'

export default function Users() {
    const [isloading, setisloading] = useState(true)
    const [users, setusers] = useState([])

    useEffect(() => {
        let getUsers = async () => {
            let data = await axiosInstance.get("/users")
            setusers(data.data)
            setisloading(false)
        }
        getUsers()
    },[])
    return (
        <div className={classes.users}>
            <div>
                <div>
                    <i className='fa fa-users'></i>
                </div>
                <h3>Users</h3>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Names</th>
                            <th>Registered on</th>
                            <th>Referred by</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Wallet address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isloading ?
                            (
                                <tr>
                                    <td colSpan={10}><ClipLoader size={20}/></td>
                                </tr>
                            )
                            :
                            users.length === 0 ?
                                (
                                    <tr>
                                        <td colSpan={9} style={{textAlign: "center", fontWeight: "700"}}>No users yet!</td>
                                    </tr>
                                ):
                                (
                                    users.map((user, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.names}</td>
                                            <td>{format(new Date(user.createdAt), "HH:MM EEE, L yyyy")}</td>
                                            <td>{user.referredby ? user.referredby : "No one"}</td>
                                            <td>{user.email}</td>
                                            <td>{user.country}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.walletAddress}</td>
                                        </tr>
                                    ))
                                )
                        }
                    </tbody>
                </table>    
            </div>       
        </div>
    )
}
