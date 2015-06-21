import React from 'react';
import _ from 'lodash';

//If you are looking at this and judging let's talk about it.
//I used to think like you.  This talk changed me https://speakerdeck.com/vjeux/react-css-in-js
/*var style = {
  main: {
    fontSize: "12px"
  }
};*/

export default class DayComponent extends React.Component {
  render(){
    

    var lines =  [];
    var fontSize = this.props.fontSize;
    var lineHeight = this.props.lineHeight;
    var lineLeft = fontSize * 1.5;

    _.times(25,(idx) => {
      if(idx){
        var displayDay = idx;
        fontSize = this.props.fontSize;

        if(displayDay > 12){
          displayDay = idx - 12;
        }
        else if(displayDay === 12 ){
          displayDay = "Noon"; //you should localize me  
          fontSize = fontSize/2;
        }

        lines.push(<div style={{position: "absolute", top: (lineHeight * idx)-fontSize/2 - 1, fontSize: fontSize}}>{displayDay}</div>); //number
      }

      lines.push(<div style={{boxSizing: "border-box", position: "absolute", top: (lineHeight * idx), left: lineLeft, right: 0, height: 1, borderTop: "1px solid #e5e5e5"}}/>);  //hour start  
      
      if(idx!==25) {
        lines.push(<div style={{boxSizing: "border-box", position: "absolute", top: (lineHeight * idx) - (lineHeight/2), left: lineLeft, right: 0, height: 1, borderTop: "1px dotted #e5e5e5"}}/>);  //hour middle    
      } 
    });

    /*box for event*/

    var pluckStart = (entry => {return entry.time.start.getTime()});

    var events = this.props.entries;//_.sortBy(this.props.entries, pluckStart);
    events.forEach((e,idx) => {e.id = idx+1;});
console.log(events);
    var STARTTIME = 0,
      ENDTIME = 24,
      HEIGHTOFHOUR = lineHeight,
      h, m, e,
      ts, event, leftindex;
    
    var MINUTESINDAY = (ENDTIME - STARTTIME) * 60;
  
    var timeslots = [];
    for (var m=0; m<MINUTESINDAY; m++) {
      timeslots.push([]);
    }


   var EventsById = {};
  setUpEvents(events);
  
  // load events into timeslots - events must be sorted by starttime already
  var numEvents = events.length;
  for (e=0; e<numEvents; e++) {
    event = events[e];
    for (m=event.start; m<event.stop; m++) {
      timeslots[m].push(event.id);
    }
  }
  
  // take the timeslots one at a time
  // for each event in the timeslot make sure that it has the right numcolumns (max amount for that event)
  // then check if its leftindex has been set
  // if not then set it.  find the first free space in that timeslot
  for ( m=0; m<MINUTESINDAY; m++) {
    ts = timeslots[m];
    for ( e=0; e<ts.length; e++) {
      var event = EventsById[ ts[e] ];
      var max = ts.length;
      ts.forEach(function(id){
          var evt = EventsById[id];
          max=(evt.numcolumns>max)?evt.numcolumns:max;
        });
    
      if (event.numcolumns <= max) {    
        event.numcolumns = max;
      }
     
      if (event.leftindex == -1) {
        leftindex = 0;
        while (! isFreeSpace(ts, leftindex, event.id)) {
            leftindex++;
        }
        event.leftindex = leftindex;
      }
    }
  }
  // UPDATE CODE AFTER COMMENT
  // fix numcolumns
for (m=0; m<MINUTESINDAY; m++) {
    ts = timeslots[m];
    for (e=0; e<ts.length; e++) {
      event = EventsById[ ts[e] ];
      var max = ts.length;
      ts.forEach(function(id){
          var evt = EventsById[id];
          max=(evt.numcolumns>max)?evt.numcolumns:max;
        });
    
      if (event.numcolumns <= max) {    
        event.numcolumns = max;
      }
    }
  }
  
  
  layoutEvents();
  
  function isFreeSpace(ts, leftindex, eventid) {
    var tslength = ts.length;
    var event;
    for (var i=0; i<tslength; ++i) {
      // get the event in this timeslot location
      event = EventsById[ts[i]];
      if (event.leftindex == leftindex) {
        if (event.id != eventid) {
          return false; // left index taken
        } else {
          return true; // this event is in this place
        }
      }
    }
    return true;
  }
  
  
  function setUpEvents(events) {
     var numEvents = events.length;
     var event, e, pos, stH, stM, etH, etM, height;
  
    for (e=0; e<numEvents; e++) {
      event = events[e];
      event.leftindex = -1;
      event.numcolumns = 0;
      stH = event.time.start.getHours();;
      stM = event.time.start.getMinutes() / 60; 
      // need its positions top and bottom in minutes
      event.start = ((stH - STARTTIME) * 60) + (stM * 60);
      event.topPos = ((stH - STARTTIME) * HEIGHTOFHOUR) + (stM * HEIGHTOFHOUR);
      
      etH = event.time.end.getHours();
      etM =  event.time.end.getMinutes() / 60;
      // need its positions top and bottom in minutes
      event.stop = ((etH - STARTTIME) * 60) + (etM * 60);
      
      height = (etH - stH) * HEIGHTOFHOUR;
    height -= stM * HEIGHTOFHOUR;
    height += etM * HEIGHTOFHOUR;
      event.height = height;
      EventsById[event.id] = event;
    }  
  }

  
  function layoutEvents() {
    var eventNodes = [];
    var numEvents = events.length;
     var event, e, numx, xfactor, left;
    
    for (e=0; e<numEvents; e++) {
      event = events[e];
      
      numx = event.numcolumns;
      xfactor = 1 / numx;
      left = (event.leftindex * xfactor * 100);
      eventNodes.push((<div key={event.id} style={{padding: 5, width: Math.floor(100 * xfactor) + '%', background: "rgb(255, 229, 191)", opacity: .69, boxSizing: "border-box", position: "absolute", overflow: "hidden", top: event.topPos, height: event.height, left: (left) + '%', borderLeft: "3px solid #ff9502"}}>
          {event.title}
        </div>));
    }

    return eventNodes;

  }
  
  var en =layoutEvents();


    return (
      <div>
        <div style={{position: "relative", padding: "0 5"}}>
          {lines}
        </div>
        <div style={{marginLeft: lineLeft, position: "relative"}}> 
          {en}
        </div>
      </div>
    );
  }
}

DayComponent.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 40
};
