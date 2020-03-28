import React, { Component } from 'react';
import './styles/index.scss';

import TimeContainer from "./components/TimeContainer"
import UpgradeButton from "./components/UpgradeButton"

import randomEvents from "./helpers/randomEvents"
import upgrades from "./helpers/upgrades"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      gameOver: false,
      time: 1,
      cash: 10000,
      users: 0,
      userGrowth: 0,
      userChurn: 0,
      productScore: 100,
      productGrowth: 0,
      devResources: 1,
      wageBill: 100
    }
  }

  componentDidMount(){
    setInterval(() => {
      const { time, cash, users, play, productScore, devResources, userGrowth, wageBill } = this.state
      
      if ( cash <= 0 || time >= 180 ) { 

        this.setState({
          play: false,
          gameOver: true
        })

      } else if ( play ) {
        let productChange = productScore 
        let playChange = true;

        if ( users / 350 > devResources ) {
          productChange = productChange - 25
        } else if ( users / 250 > devResources ) {
          productChange = productChange - 10
        } else if ( users / 200 > devResources ) {
          productChange = productChange - 5
        }  else if ( users / 200 < devResources ) {
          productChange = productChange + 5
        } else if ( users / 250 < devResources ) {
          productChange = productChange + 10
        } else if ( users / 350 < devResources ) {
          productChange = productChange + 25
        }

        if ( productChange >= 100 ) {
          productChange = 100
        }

        let userChurn;

        if ( productScore >= 100 ) {
          userChurn = 0
        } else if ( productScore > 75 ) {
          userChurn = 0.05
        } else if ( productScore > 50 ) {
          userChurn = 0.1
        } else if ( productScore > 25 ) {
          userChurn = 0.25
        } else if ( productScore > 10 ) {
          userChurn = 0.5
        } else {
          userChurn = 1
        }

        let userChange = ( users + userGrowth ) - ( userChurn * users );


        if ( Math.random() * 100 > 95 ) {
          console.log("randomEvent")
        }

        this.setState({
          play: playChange,
          time: time + 1,
          cash: Math.round(cash + ( users ) - wageBill),
          productScore: Math.round(productChange),
          userChurn: userChurn,
          users: Math.round( userChange )
        })
      }
    }, 1000);
  }
  
  handleUpgradeClick = ( cost, addedUsers, addedUserGrowth, addedDevResource, addedWage ) => {
    const { cash, users, userGrowth, devResources, wageBill, play } = this.state;

    if ( play ) {
      this.setState({
        cash: cash - cost,
        users: users + addedUsers,
        userGrowth: userGrowth + addedUserGrowth,
        devResources: devResources + addedDevResource,
        wageBill: wageBill + addedWage,
      })
    }
  }


  render() { 
    const { cash, users, productScore, time, devResources, userGrowth, userChurn, wageBill, gameOver } = this.state;
    const { handleUpgradeClick } = this;

    return (
      <>
        { gameOver ? "game over" : null }
        <div class="header">
          <div className={`header__cash ${ users < wageBill ? "header__cash--negative" : null }`}  >Cash: ${ cash }</div>
          <div class="header__time"><TimeContainer time={time} /></div>
        </div>
        <div>User Growth: { userGrowth }</div>
        <div>User Churn: { userChurn }</div>
        <div>Wage Bill: ${ wageBill }</div>
        <div>Users: { users } / MRR: ${ users }</div>
        <div>Product Score: { productScore }/100</div>
        <div>Dev Resources: { devResources }</div>
        { upgrades.sales.map( ( elem ) => <UpgradeButton data={elem} cash={cash} handleUpgradeClick={handleUpgradeClick} /> ) } <br />
        { upgrades.dev.map( ( elem ) => <UpgradeButton data={elem} cash={cash} handleUpgradeClick={handleUpgradeClick} /> ) }
      </>
    );
  }
}
 


export default App;
