import React from 'react'
import Alert from 'react-bootstrap/Alert';

function AlertShow(props) {

    return (
        <Alert variant={props.type}>
            <Alert.Heading>{props.heading}</Alert.Heading>
            <p>{props.msg}</p>
        </Alert>
    );
}

AlertShow.defaultProps = {
    heading: "Error",
    msg: "Enter correct",
    type: "danger"
}

export default AlertShow
