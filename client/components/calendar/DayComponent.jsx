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
  /*render() {
    return (
      <section style={style.main}>
        <h2>Calendar</h2>
        <ul ref="indexList" className="index-list">
          {this.props.entries.map((entry, index) => {
            return (<li key={index}>entry {entry.title} {entry.time.start.toString()} - {entry.time.end.toString()}</li>);
          })}
        </ul>
      </section>
    );
  }*/

  render(){
    /*drawing with absolute position makes apps more performant because you can prevent reflows.  its not always necessary, but its not always evil*/
    var lines =  [];
    var fontSize = 40;
    var lineHeight = 100;

    _.times(25,(idx) => {
      if(idx){
        lines.push(<div style={{position: "absolute", top: (lineHeight * idx)-fontSize/2, fontSize: fontSize}}>{idx}</div>);
      }

      lines.push(<div style={{boxSizing: "border-box", position: "absolute", top: (lineHeight * idx), left: fontSize * 1.5, width: "100%", height: 1, borderTop: "1px solid #e5e5e5"}}/>);      
      
      if(idx!==25) {
        lines.push(<div style={{boxSizing: "border-box", position: "absolute", top: (lineHeight * idx) - (lineHeight/2), left: fontSize *1.5, width: "100%", height: 1, borderTop: "1px dotted #e5e5e5"}}/>);      
      } 
    });


    return (
      <div>
        {lines}
      </div>
    );
  }
}

DayComponent.defaultProps = {
  entries: []
};
