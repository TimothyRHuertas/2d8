import React from 'react';
import _ from 'lodash';


export default class DaySlots extends React.Component {
  render(){
    var lines =  [];
    var fontSize = this.props.fontSize;
    var lineHeight = this.props.lineHeight;
    var lineLeft = fontSize * 1.5;

    //TODO Hoist up styles.  I usually don't write todo's.  I normally just do, but this is a prototype.
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

        lines.push(<div key={`number-${idx}`} style={{position: "absolute", top: (lineHeight * idx)-fontSize/2 - 1, fontSize: fontSize}}>{displayDay}</div>); //number
      }

      lines.push(<div key={`hour-${idx}`} style={{boxSizing: "border-box", position: "absolute", top: (lineHeight * idx), left: lineLeft, right: 0, height: 1, borderTop: "1px solid #e5e5e5"}}/>);  //hour start  
      
      if(idx!==25) {
        lines.push(<div key={`dash-${idx}`} style={{boxSizing: "border-box", position: "absolute", top: (lineHeight * idx) - (lineHeight/2), left: lineLeft, right: 0, height: 1, borderTop: "1px dotted #e5e5e5"}}/>);  //hour middle    
      } 
    });
   
    return (
      <div style={{position: "relative", padding: "0 5"}}>
        {lines}
      </div>
    );
  }

  

}

DaySlots.defaultProps = {
  lineHeight: 100,
  fontSize: 40
};
