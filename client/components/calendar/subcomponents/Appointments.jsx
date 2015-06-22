import React from 'react';
import EventLayoutDecorator from 'components/calendar/utils/EventLayoutDecorator.js';


export default class Appointments extends React.Component {
  render(){
    var fontSize = this.props.fontSize;
    var lineLeft = fontSize * 1.5;
    
    new EventLayoutDecorator().decorate(this.props.entries);

    var apptNodes = this.props.entries.map( event => {
        var pos = event;
        return (<div key={event.id} style={{top: pos.top, height: pos.height, left: pos.left + '%', width: pos.width +"%", padding: 5, background: "rgb(255, 229, 191)", opacity: .69, boxSizing: "border-box", position: "absolute", overflow: "hidden",  borderLeft: "3px solid #ff9502"}}>
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
  fontSize: 40
};
