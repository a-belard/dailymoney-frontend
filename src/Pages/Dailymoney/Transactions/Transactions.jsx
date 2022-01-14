import React from 'react'
import classes from "./Transactions.module.scss"

export default function Transactions() {
    return (
        <div className={classes.transactions}>
            <div>
                <div>
                    <i className='fa fa-hourglass-end'></i>
                </div>
                <h3>Transactions</h3>
            </div>
        </div>
    )
}
