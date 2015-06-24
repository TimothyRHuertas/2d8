import React from 'react';
import EventLayoutDecorator from 'components/DayLayout/utils/EventLayoutDecorator.js';

var selectedStyle = {background: "#ff9502", color: "#ffffff", className: "visible"},
unselectedStyle = {background: "rgb(255, 229, 191)", color: "#a66100", className: "opaque"};

export default class Appointments extends React.Component {
  render(){
    var fontSize = this.props.fontSize;
    var lineLeft = fontSize * 1.5;
    
    new EventLayoutDecorator().decorate(this.props.entries);

    var apptNodes = this.props.entries.map( (event, idx) => {
        var styles;

        if(event.id===this.props.selectedIdx) {
          styles = selectedStyle;
        }
        else {
          styles = unselectedStyle;
        }

        var pos = event;
        return (<div className={styles.className} key={event.id} style={{color: styles.color, top: pos.top, 
            height: pos.height, left: pos.left + '%', width: pos.width +"%", 
            fontSize: ".8em",
            padding: "5 3", background: styles.background, boxSizing: "border-box", 
            position: "absolute", overflow: "hidden",  borderLeft: "3px solid #ff9502"}}>
           {event.title}
          </div>);
    });

    return (
      <div style={{marginLeft: lineLeft, position: "relative"}}> 
        {apptNodes}
      </div>
    );
  }
}

Appointments.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 40,
  selectedIdx: 0
};
