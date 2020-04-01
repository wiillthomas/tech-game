import React, { useState, useEffect } from "react";

export default ( props ) => {
    const { toggleHelp } = props;

    const [ show, setShow ] = useState(false);

    return (
            <div className="modal__background">
                <div className="modal__container modal__container--help">
                    <button className="button close" onClick={() => toggleHelp() }>x</button>
                    <div className="help-image">
                    </div>
                </div> 
            </div>
    )
}