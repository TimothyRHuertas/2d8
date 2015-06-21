import React from 'react';
import _ from 'lodash';

var layOutDay = function (events) {
    
    // Sort the stacks by the start time, to make calculations easier
    events = _.sortBy(events, function(event){ return event.start; });

    var columnCount = 0;
    var stacks = [];
    var stack = {end: 0};
    var dayboxWidth = 100;
    // Loop through each event
    _.each(events, function(event, index){

      // Each event gets placed in a stack. A stack remembers how many 
      // columns there are currently overlapping and the latest end time.
      // If the current event starts after the stack, we create a new stack
      // containing the current event.
      //debugger;
      // if(event.id ===5) debugger;

      if(event.start >= stack.end || stacks.length === 0 ) {
        stacks.push({columns: [{end: 0}], end: 0});
        stack = _.last(stacks);
        columnCount = 0;
      }
     
      
      // Set the currents end date to the stacks end time if it is larger
      if(event.end >stack.end) {
        stack.end = event.end;
      }

      // We keep track of what column the event should be placed in. By default
      // it assumes there will be a new column each time there is a new event
      event.column = columnCount;

      // Sometimes there will be room in previous columns and a new column
      // won't be required. We loop through the previous columns to check if any
      // have enough room. Each column has an end time so we don't overlap them.
      var foundSparePlace = _.any(stack.columns, function(currentColumn, index) {
        if(columnCount !== 0 && event.start > currentColumn.end) {
          event.column = index;
          return true;
        } 
      });

      // Update the columns end time to the current events end time
      stack.columns[event.column] = {
        end: event.end
      };

      

      // If we found a spare place in a previous column for the event
      // we do not need to add a new column
      if(!foundSparePlace) {
        columnCount++;
      }
/*
      var doit = _.any(stack.columns, function(c){return c.end <= event.start});

      if(doit){
        //debugger;
        stack = _.clone(stack);
        stack.columns = _.filter(stack.columns, function(c){return c.end > event.start}); 
        stack.end = _.last(stack.columns).end; 
        // columnCount = stack.columns.length;
      }
*/
      // Attach the current stack to the current event so we can run some calcs
      event.stack = stack;
    });

    // Now that we have all the neccesary information, let's generate the
    // appropriate output.

    //calc widths
    events.forEach(event => {
      var cols = event.stack.columns;
     
      for(var i=event.column; i<=cols.length; i++){
        if(i===cols.length){
          event.colspan = cols.length - event.column;
        }
        else {
          event.colspan = i-event.column;
          if(i !== event.column && event.start<cols[i].end){
            break;
          } 
        }
      }
    });



    _.each(events, function(event) {
      event.left = dayboxWidth / event.stack.columns.length * event.column;
      event.width = dayboxWidth *(event.colspan/event.stack.columns.length);
      event.height = event.end - event.start;
      event.top = event.start;
     // delete event.column;
      //delete event.stack;
    });

    return events;
  };

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
   //Compute position for each appt.
    

    //decorate events with a pos
    this.props.entries.forEach((event, idx) => {
      event.start = event.time.start.getHours() * this.props.lineHeight + event.time.start.getMinutes() /60 * this.props.lineHeight;
      event.end = event.time.end.getHours() * this.props.lineHeight + event.time.end.getMinutes() /60 * this.props.lineHeight;
      event.id = idx;
      console.log(event);
    });

    layOutDay(this.props.entries);

    var apptNodes = this.props.entries.map( event => {
        var pos = event;
        return (<div key={event.id} style={{top: pos.top, height: pos.height, left: pos.left + '%', width: pos.width +"%", padding: 5, background: "rgb(255, 229, 191)", opacity: .69, boxSizing: "border-box", position: "absolute", overflow: "hidden",  borderLeft: "3px solid #ff9502"}}>
           {event.title}
          </div>);
    });

    return (
      <div>
        <div style={{position: "relative", padding: "0 5"}}>
          {lines}
        </div>
        <div style={{marginLeft: lineLeft, position: "relative"}}> 
          {apptNodes}
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
