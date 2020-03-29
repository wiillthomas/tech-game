import randomEvents from "../helpers/randomEvents"

export default ( state ) => {
    const { time, cash, users, play, productScore, devResources, userGrowth, wageBill, events } = state
    
        let output = {
            playChange: true, 
            eventsChange: events, 
            productChange: productScore, 
            userChurn: 0, 
            userChange:null,
            cashChange: cash
        }

        if ( users / 350 > devResources ) {
          output.productChange = output.productChange - 25
        } else if ( users / 250 > devResources ) {
          output.productChange = output.productChange - 10
        } else if ( users / 200 > devResources ) {
          output.productChange = output.productChange - 5
        }  else if ( users / 200 < devResources ) {
          output.productChange = output.productChange + 5
        } else if ( users / 250 < devResources ) {
          output.productChange = output.productChange + 10
        } else if ( users / 350 < devResources ) {
          output.productChange = output.productChange + 25
        }

        if ( output.productChange >= 100 ) {
          output.productChange = 100
        }


        if ( productScore >= 100 ) {
          output.userChurn = 0
        } else if ( productScore > 75 ) {
          output.userChurn = 0.05
        } else if ( productScore > 50 ) {
          output.userChurn = 0.1
        } else if ( productScore > 25 ) {
          output.userChurn = 0.25
        } else if ( productScore > 10 ) {
          output.userChurn = 0.5
        } else {
          output.userChurn = 1
        }

        output.userChange = ( users + userGrowth ) - ( output.userChurn * users );

        const eventIntervals = [10, 25]

        if ( Math.random() * 100 > 98  || eventIntervals.includes(time) ) {
            output.eventsChange = [...events]
            output.eventsChange.push(randomEvents[Math.floor( Math.random() * randomEvents.length )])
            
            output.userChange = output.userChange * randomEvents[Math.floor( Math.random() * randomEvents.length )].users
            output.cashChange = output.cashChange * randomEvents[Math.floor( Math.random() * randomEvents.length )].cash
        } else {
            output.eventsChange = events
        }

        return output
}