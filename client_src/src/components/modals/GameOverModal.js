import React, { useEffect, useState } from "react";

export default ( props ) => {
    const { handleReset, users } = props
    const [ leaderboard, setLeaderboard ] = useState(null)
    const [ formName, setFormName ] = useState("")
    const [ postState, setPostState ] = useState(null)

    useEffect(() => {
        try {
            fetch("http://localhost:8080/api/leaderboard")
                .then(( res ) => {
                    return res.json()
                })
                .then(( data ) => {
                    console.log(data)
                    setLeaderboard(data)

                })
        } catch ( err ) {
            console.log( err )
        }
    }, [users] )

    function handleSubmit( e ){
        e.preventDefault()
        try {
            fetch("http://localhost:8080/api/leaderboard", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Name: formName,
                    Score: users
                })
            })
            .then( ( response ) => {
                console.log(response)
                if ( response.status == 200 ) {
                    setPostState("Success posting high score!")
                } else {
                    setPostState("Error posting high score!")
                }
            } )
        } catch ( err ) {
            console.log(err)
        }

    }

    return (
        <div className="modal__background">
            <div className="modal__container modal__container--game-over">
                <div className="game-over">

                <div className="title">
                    Game Over
                </div>
                <div>
                    You Scored: { users } Users
                </div>
                <div className="leaderboard__container">
                    <div className="leaderboard__title">High Scores</div>
                    {leaderboard ? leaderboard.map( ( elem, idx ) => {
                        return ( 
                            <div key={idx} className="leaderboard__row">
                                <div>{ elem.name }</div>
                                <div>{ elem.score }</div>
                            </div>
                        )
                    } ) : null}
                </div>
                
                 
                <div className="submit__container">
                    <div className="submit__title">Submit High Score!</div>
                    <div className="submit__form">
                        <form onSubmit={( e ) => { handleSubmit( e ) }}>
                            <input required placeholder="Name..." value={formName} onChange={(e) => { setFormName(e.currentTarget.value) } }/>
                            <button className="button" type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="submit__state">{ postState }</div>  
                </div>
                <button className="button try-again" onClick={() => handleReset()}>Try Again</button>
            </div> 
                </div>
        </div>
    )
}