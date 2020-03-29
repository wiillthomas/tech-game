import React from "react"

export default ( props ) => {
    const { value } = props;

    return <>{new Intl.NumberFormat().format(value)}</>
}