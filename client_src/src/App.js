import React, { useState } from "react";

import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

export default function App() {
  const [ page, setPage ] = useState( "start" )
  
  if ( page == "start" ) return <StartPage setPage={setPage} />
  else if ( page == "game" ) return <GamePage />

}


// Style FE of high scores
// Responsivity
// Go backend for high scores
// Create more random events
// Write FE tests