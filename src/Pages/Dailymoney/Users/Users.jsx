import { format } from 'date-fns'
import React, {useEffect, useState, } from 'react'
import classes from "./Users.module.scss"
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'

export default function Users() {
    const [isloading, setisloading] = useState(true)
    const [users, setusers] = useState([])
    const [usersCopy, setusersCopy] = useState([])

    useEffect(() => {
        let getUsers = async () => {
            let data = await axiosInstance.get("/users")
            setusers(data.data)
            setusersCopy(data.data)
            setisloading(false)
        }
        getUsers()
    },[])

    let deleteUser = async (id) => {
        let usersCopy = users.filter(user => user._id !== id)
        setusers(usersCopy)
        await axiosInstance.delete("/user/" + id)
        .then(() => {},
        err => console.log(err.response))
    }

    function search(username){
        let allusers = usersCopy.filter(user => user.username.indexOf(username) !== -1);
        if(username !== ""){
            setusers(allusers)
        }
        else{
            setusers(usersCopy)
        }
    }

    function searchreferrer(username){
        let allusers = usersCopy
                        .filter(user => ("referredby" in user))
                        .filter(user => user.referredby.username.indexOf(username) !== -1);
        if(username !== ""){
            setusers(allusers)
        }
        else{
            setusers(usersCopy)
        }
    }
    return (
        <div className={classes.users}>
            <div>
                <div>
                    <i className='fa fa-users'></i>
                </div>
                <h3>Users</h3>
            </div>
            <div>
                <h4>Search</h4>
                <label htmlFor="username">Username: </label>
                <input type="text" id='username' onChange={e => search(e.target.value)}/>
                <br /><br />
                <label htmlFor="referredby">Referred by: </label>
                <input type="text" id='referredby' onChange={e => searchreferrer(e.target.value)}/>
            </div>
            <p><strong>{!isloading && users.length}</strong> users</p>
            <div>
                {isloading ?
                 <span style={{display: "flex", justifyContent: "center"}}><ClipLoader size={20}/></span>
                 :
                 (
                    <table>
                    {/* <thead>
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
                    </thead> */}
                    <tbody>
                        {/* {isloading ?
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
                        } */}
                        <tr>
                            <td>No</td>
                            {users.map((user, i) => <td key={i}>{i+1}</td>)}
                        </tr>
                        <tr>
                            <td>Username</td>
                            {users.map((user, i) => <td key={i}>{user.username}</td>)}
                        </tr>
                        <tr>
                            <td>Names</td>
                            {users.map((user, i) => <td key={i}>{user.names}</td>)}
                        </tr>
                        <tr>
                            <td>Gender</td>
                            {users.map((user, i) => <td key={i}>{user.gender}</td>)}
                        </tr>
                        <tr>
                            <td>Registered on</td>
                            {users.map((user, i) => <td key={i}>{format(new Date(user.createdAt), "HH:mm dd, L yyyy")}</td>)}
                        </tr>
                        <tr>
                            <td>Email</td>
                            {users.map((user, i) => <td key={i}>{user.email}</td>)}
                        </tr>
                        <tr>
                            <td>Country</td>
                            {users.map((user, i) => <td key={i}>{user.country}</td>)}
                        </tr>
                        <tr>
                            <td>Phone</td>
                            {users.map((user, i) => <td key={i}>{user.phone}</td>)}
                        </tr>
                        <tr>
                            <td>Referred by</td>
                            {users.map((user, i) => <td key={i}>{user.referredby ? user.referredby.username : "No one"}</td>)}
                        </tr>
                        <tr>
                            <td>Wallet address</td>
                            {users.map((user, i) => <td key={i}>{user.walletAddress}</td>)}
                        </tr>
                        <tr>
                            <td>Investment</td>
                            {users.map((user, i) => <td key={i}>{user.totDeposited}</td>)}
                        </tr>
                        <tr>
                            <td>Earned</td>
                            {users.map((user, i) => <td key={i}>{user.totWithdrew}</td>)}
                        </tr>
                        <tr>
                            <td>Delete account</td>
                            {users.map((user, i) => <td key={i} onClick={() => deleteUser(user._id)}><button>DELETE</button></td>)}
                        </tr>
                    </tbody>
                </table> 
                 )
                }
            </div>       
        </div>
    )
}
