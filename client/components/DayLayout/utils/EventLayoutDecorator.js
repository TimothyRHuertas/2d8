import _ from 'lodash';
/**
I exist soley to take in event objects and decorate them with width, height, left and top properties
so you can lay out the events in a purdy calendar
**/

export default class EventLayoutDecorator {
  decorate (events) {
    // Sort events
    events = _.sortBy(events, function(event){ return event.start; });
    events.forEach((event, idx) => {
      event.start = event.time.start.getHours() * 100 + event.time.start.getMinutes() / 60 * 100;
      event.end = event.time.end.getHours() * 100 + event.time.end.getMinutes() / 60 * 100;
      event.id = idx;
      console.log(idx, event.title);
    });
    var columnCount = 0,
    stacks = [],
    stack = {end: 0},
    dayboxWidth = 100;

    // Loop through each event
    events.forEach((event, index) => {
      // Each event gets placed in a stack. A stack remembers how many
      // columns there are currently overlapping and the latest end time.
      // If the current event starts after the stack, we create a new stack
      // containing the current event.
      if(event.start >= stack.end || stacks.length === 0 ) {
        stacks.push({columns: [{end: 0}], end: 0});
        stack = _.last(stacks);
        columnCount = 0;
      }


      // Set the currents end date to the stacks end time if it is larger
      if(event.end > stack.end) {
        stack.end = event.end;
      }

      // We keep track of what column the event should be placed in. By default
      // it assumes there will be a new column each time there is a new event
      event.column = columnCount;

      // Sometimes there will be room in previous columns and a new column
      // won't be required. We loop through the previous columns to check if any
      // have enough room. Each column has an end time so we don't overlap them.
      var foundSparePlace = _.any(stack.columns, (currentColumn, idx) => {
        if(columnCount !== 0 && event.start > currentColumn.end) {
          event.column = idx;
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

      // Attach the current stack to the current event so we can run some calcs
      event.stack = stack;
    });


    //calculate the column spans for each event
    events.forEach(event => {
      var cols = event.stack.columns;

      for(var i = event.column; i <= cols.length; i++){
        if(i === cols.length){
          event.colspan = cols.length - event.column;
        }
        else {
          event.colspan = i - event.column;
          if(i !== event.column && event.start < cols[i].end){
            break;
          }
        }
      }
    });

    events.forEach((event) => {
      event.left = dayboxWidth / event.stack.columns.length * event.column;
      event.width = dayboxWidth * (event.colspan / event.stack.columns.length);
      event.height = event.end - event.start;
      event.top = event.start;
      delete event.column;
      delete event.stack;
    });

    return events;
  }
}
