import React from 'react';
import DaySlots from 'components/DayLayout/subcomponents/DaySlots.jsx';
import Appointments from 'components/DayLayout/subcomponents/Appointments.jsx';

export default class DayComponent extends React.Component {
  render(){
    return (
      <div>
        <DaySlots lineHeight={this.props.lineHeight} fontSize={this.props.fontSize} />
        <Appointments entries={this.props.entries} lineHeight={this.props.lineHeight} fontSize={this.props.fontSize} />
      </div>
    );
  }
}

DayComponent.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 40
};
