import React from 'react'
import classes from "./Stats.module.scss"

export default function Stats() {
    return (
        <div className={classes.stats}>
            <div>
                <div>
                    <i className='fa fa-bars'></i>
                </div>
                <h3>Summary</h3>
            </div>
        </div>
    )
}
