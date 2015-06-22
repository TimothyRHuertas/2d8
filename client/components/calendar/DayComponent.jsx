import React from 'react';
import DaySlots from 'components/calendar/subcomponents/DaySlots.jsx';
import Appointments from 'components/calendar/subcomponents/Appointments.jsx';

export default class DayComponent extends React.Component {
  render(){
    return (
      <div>
        <DaySlots lineHeight={this.props.lineHeight} fontSize={this.props.lineHeight} />
        <Appointments entries={this.props.entries} lineHeight={this.props.lineHeight} fontSize={this.props.lineHeight} />
      </div>
    );
  }
}

DayComponent.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 40
};
