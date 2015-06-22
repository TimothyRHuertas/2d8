import React from 'react';
import Sugar from 'sugar';

export default class EventComponent extends React.Component {
  render(){
    var event = this.props.event,
    start = event.time.start,
    end = event.time.end,
    relative,
    seatsLeft,
    isPastEvent,
    seatsNode,
    now = new Date();

    
    if(start.getTime() > now.getTime()){//future
      relative = "Starting " + start.relative();
    }
    else if(now.getTime() > end.getTime()){ //over
      relative = "Ended " + end.relative();
      isPastEvent = true;
    }
    else {
      relative = "In progress"
    }

    seatsLeft = event.seats.total - event.seats.available;

    if(seatsLeft<1){
      seatsLeft = "No seats left"
    }
    else {
      seatsLeft = seatsLeft + " seats remaining"
    }

    if(!isPastEvent){
      seatsNode = (
        <div>
          <span style={{fontWeight: 300, fontSize: ".9rem"}}>Seats remaining:</span> 
          <span style={{fontWeight: 400, marginLeft: 5, fontSize: ".9rem"}}>{seatsLeft}</span>
        </div>
      );
    }
  
    return (
      <div style={{padding: "5 15"}}>
        <div style={{color: "#1a1a1a", fontSize: "2rem", letterSpacing: "-.06rem", fontWeight: 300}}>{event.title}</div>
        <div style={{fontWeight: 300, fontSize: "1.1rem"}}>{start.format('{12hr}:{mm}{tt}')}-{end.format('{12hr}:{mm}{tt}')} (<span>{relative}</span>)</div>
        <div style={{margin: "5 0", background: "#e5e5e5", height: 3, width: "100%"}} />

        <div 

          style={{
           /* backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundImage: `url('${event.image}')`,
            backgroundPosition: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",*/
            padding: ".8rem", border: "1px solid #f2f2f2", 
            position: "absolute", left: 10, right: 10, bottom: 10, top: 100}}>
          
          <div>
            <span style={{fontWeight: 300, fontSize: ".9rem"}}>Featuring:</span> 
            <span style={{fontWeight: 400, marginLeft: 5, fontSize: "1.2rem"}}>{event.presenter.join(",")}</span>
          </div>
          {seatsNode}
          <div style={{marginTop: "1.8rem", fontStyle: "italic", wordWrap: "break-word"}}>{event.description}</div>
        </div>

      </div>
    );
  }
}

