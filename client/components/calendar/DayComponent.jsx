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


//TODO cluster by time move to componentWillMount/recieve props
    //decorate With Confilt Pos
    var pluckStart = (entry => {return entry.time.start.getTime()});
    var pluckDuration = (entry => {return entry.time.end.getTime() - entry.time.start.getTime()});

    var sorted = _.sortByOrder(this.props.entries, [pluckStart, pluckDuration], [true, false]);

    //todo you *may need to optmize

    sorted.forEach((currentEntry, outer) => {
      currentEntry.position = 0;
      var currentStartTime = currentEntry.time.start.getTime();
      var currentEndTime = currentEntry.time.end.getTime();

      for(var inner=outer; inner>=0; inner--){
     //   if(outer===2){debugger;}
        var entry = sorted[inner];
        var startTime = entry.time.start.getTime();
        var endTime = entry.time.end.getTime();

        if( (entry !== currentEntry) && 
          ((currentStartTime >= startTime && currentStartTime <= endTime) 
            || (currentEndTime <= endTime && currentEndTime >= startTime)) ){
          currentEntry.position++;  
        }
      } 
    });

     var itemsInCluster = sorted[sorted.length-1].position + 1;
    
    for(var i=sorted.length-1; i>=1; i--){
      var right = sorted[i];
      var left = sorted[i-1];

      right.itemsInCluster = itemsInCluster;
      left.itemsInCluster = itemsInCluster;

      if(right.position === 0){
        itemsInCluster = left.position + 1
      }

    }
console.log(sorted);

//end

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
    var selfWidth = document.body.offsetWidth - lineLeft; ///TODO not ok

    var events = this.props.entries.map((entry, index) => {
      var start = entry.time.start;
      var width = selfWidth/entry.itemsInCluster;
      var left = ((selfWidth/entry.itemsInCluster) * entry.position) + lineLeft;
      var top = start.getHours() * lineHeight;
      top += start.getMinutes()/60 * lineHeight;

      var end = entry.time.end;
      var height = (end.getHours() - start.getHours()) * lineHeight;
      height += end.getMinutes()/60 * lineHeight;

      return (
        <div style={{padding: 5, width: width, background: "rgb(255, 229, 191)", opacity: .69, boxSizing: "border-box", position: "absolute", overflow: "hidden", top: top, height: height, left: left, borderLeft: "3px solid #ff9502"}}>
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
