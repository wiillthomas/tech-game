import React, { useState } from "react";

import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

export default function App() {
  const [ page, setPage ] = useState( "start" )
  
  if ( page == "start" ) return <StartPage setPage={setPage} />
  else if ( page == "game" ) return <GamePage />

}
 
// Create random events
// Create game over screen & upload high score
// Create Start Screen
// Responsivity
// Go backend for high scores
// Create more random events