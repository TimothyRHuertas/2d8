import React from 'react';
import _ from 'lodash';


//Find if given two appt's are overlapping
function isOverlapping(srcAppt, tgtAppt){
    return (srcAppt.id != tgtAppt.id)       //Not same appt
        && ( srcAppt.start < tgtAppt.end )  //Check boundries
        && ( srcAppt.end > tgtAppt.start ); //Check boundries
};

//Adjust right appts
function adjustRight(appt, overlapHash){

    _.each(overlapHash, function(overlapAppt){

        if(appt.col < overlapAppt.col){
            appt.right = appt.right || [];
            appt.right.push(overlapAppt);
        }else{
            overlapAppt.right = overlapAppt.right || [];
            overlapAppt.right.push(appt);
        }

    }, this);

};

//Compute max column for a given appt.
function computeMaxCol(appt, max){
    if(appt.maxdone){
        return appt.maxcol;
    }

    max = max || -1;
    appt.maxcol = _.max([appt.col, appt.maxcol, max]);
    if(appt.right){
        //Recursive alogo. to go find the maxCol in all my right nodes
        _.each(appt.right, function(a){
            appt.maxcol = _.max([appt.col, appt.maxcol, computeMaxCol(a, appt.maxcol)]);
        }, this)
    }
    //set breaker to not lead to infinite recursion
    appt.maxdone = true;
    return appt.maxcol;
};

//Calculated width of an appt
function computeWidth(appt, totalWidth){
    var rightLen = ( appt.right && appt.right.length ) || 0,
        colWidth = totalWidth / (appt.maxcol+1),
        i = appt.col+1, cols=1;

    //Expand and fill the missing cols
    if(appt.col + rightLen < appt.maxcol){
        for(; i<=appt.maxcol; i++){
            var match = _.find(appt.right, function(ra){
                return (ra.col == i);
            });
            if(match){
                break;
            }
            cols++;
        }
        return cols*colWidth;
    }else{
        return colWidth;

    }
};

//Compute position of an appt
function computePosition(appt, totalWidth){
    var width = computeWidth(appt, totalWidth);
    appt.pos = {
        top: appt.start,
        //left: ( appt.col*width ),
        left: (appt.col*(totalWidth/(appt.maxcol + 1))),
        width: width,
        height: ( appt.end - appt.start )
    };
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
    
    this.props.entries.forEach((event, idx) => {
     // event.start = event.time.start.getHours() * 60 + event.time.start.getMinutes();
    //  event.end = event.time.end.getHours() * 60 + event.time.end.getMinutes();

      event.start = event.time.start.getHours() * this.props.lineHeight + event.time.start.getMinutes() /60 * this.props.lineHeight;
      event.end = event.time.end.getHours() * this.props.lineHeight + event.time.end.getMinutes() /60 * this.props.lineHeight;
      event.id = idx;

    });

    this.layOutDay(_.sortBy(this.props.entries, "start"));

    console.log(this.props.entries);

    var apptNodes = this.props.entries.map( event => {
        var pos = event.pos;
        return (<div key={event.id} style={{padding: 5, width: pos.width + '%', background: "rgb(255, 229, 191)", opacity: .69, boxSizing: "border-box", position: "absolute", overflow: "hidden", top: pos.top, height: pos.height, left: pos.left + '%', borderLeft: "3px solid #ff9502"}}>
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

  layOutDay(appts){
      var pAppts = this.process(appts),
          layout = [];

      //Compute position for each appt.
      _.each(pAppts, function(appt){
          computePosition(appt, 100);
      }, this);

      return pAppts;
  }

  //Process appointments to read overlap and find col.
  process(appts){
    //Run each appt.
    _.each(appts, function(appt, index, appts){
        var overlap = false, overlapHash = [], overlapCol = [],
            i=0, tmpAppt;

        appt.col = 0;
        appt.maxcol = 0;

        for(; i<index; i++ ){
            tmpAppt = appts[i];
            if(isOverlapping(appt, tmpAppt)){
                //update overlap flag
                overlap = true;

                //overlapping appts
                overlapHash.push(tmpAppt);

                //Calculate the correct position
                overlapCol[tmpAppt.col] = true;
                while(overlapCol[appt.col]){
                    appt.col++;
                }
            }
        }

        //figure out who is on your right
        if(overlap) {
            adjustRight(appt, overlapHash);
        }

    }, this);

    //Once processed, Compute maxcol for each appt.
    _.each(appts, function(a){
        computeMaxCol(a);
    }, this);

    //Porcessed appts
    return appts;
  }

}

DayComponent.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 40
};
