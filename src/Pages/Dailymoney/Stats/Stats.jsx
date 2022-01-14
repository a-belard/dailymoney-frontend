import React from 'react'
import classes from "../../../Pages/Dashboard/Dashboard.module.scss"

export default function Stats() {
    return (
        <div className={classes.dashboard}>
            <div>
                <div>
                    <i className='fa fa-bars'></i>
                </div>
                <h3>Summary</h3>
            </div>
        </div>
    )
}
