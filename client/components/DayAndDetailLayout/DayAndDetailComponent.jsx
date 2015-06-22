import React from 'react';
import DayComponent from 'components/DayLayout/DayComponent.jsx';

export default class DayAndDetailComponent extends React.Component {
  render(){
    return (
      <div>
        <div style={{position: "absolute", left: "30%", right: 0}}>
          <DayComponent
            entries={this.props.entries} 
            lineHeight={this.props.lineHeight} 
            fontSize={this.props.fontSize} />
        </div>
      </div>
    );
  }
}

DayAndDetailComponent.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 40
};
