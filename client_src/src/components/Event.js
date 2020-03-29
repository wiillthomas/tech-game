import React, { useState, useEffect } from "react";

export default function Event( props ){

    const { name, description } = props.elem;

    const [ hide, setHide ] = useState(false);
    const [ show, setShow ] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 1000)
        setTimeout(() => {
            setHide(true)
        },10000)
    }, [])

    

    return (
        <div className={`event__container ${ show ? "event__container--show" : "" } ${ hide ? "event__container--hide" : "" }`}>
            <button onClick={() => setHide(true)}>x</button>
            <div className="event__name">{ name }</div>
            <div className="event__description">
                { description }
            </div>
        </div> 
    )
}