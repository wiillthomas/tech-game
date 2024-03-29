import React, { useState } from "react";

import Event from "./Event"

export default function RandomEventsContainer( props ) {
    const { events } = props;

    return (
        <div className="random-events__container">
            { events.map( ( elem, idx ) => (
                <Event key={idx} elem={ elem } />
            ) ) }
        </div>
    )
}