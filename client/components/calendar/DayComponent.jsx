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
    /*
    drawing with absolute position makes apps more performant because you can prevent reflows.  
    its not always necessary, but its not always evil. ipad users will thank me :)
    */

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

    //draw a box for every event

    var events = this.props.entries.map((entry, index) => {
      var start = entry.time.start;
      var top = start.getHours() * lineHeight;
      top += start.getMinutes()/60 * lineHeight;

      var end = entry.time.end;
      var height = (end.getHours() - start.getHours()) * lineHeight;
      height += end.getMinutes()/60 * lineHeight;

      return (
        <div style={{padding: 5, boxSizing: "border-box", position: "absolute", overflow: "hidden", top: top, height: height, left: lineLeft, border: "1px solid green"}}>
          {entry.title}
        </div>
      );
    });


    return (
      <div style={{position: "relative", padding: "0 5"}}>
        {lines}
        {events}
      </div>
    );
  }
}

DayComponent.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 40
};
