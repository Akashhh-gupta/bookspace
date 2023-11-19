import React from 'react'
import alertContext from './alertContext'
import AlertShow from '../../Components/AlertShow'

function AlertState(props) {

    const alert_success = () => {
        return (
            <AlertShow heading={"Success"} msg={"Successfull Done"} type={"success"} />
        )
    }


    return (
        <alertContext.Provider value={{ alert_success }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState
