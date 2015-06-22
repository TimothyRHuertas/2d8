import React from 'react';
import DayComponent from 'components/DayLayout/DayComponent.jsx';
import CompassComponent from 'components/Compass/CompassComponent.jsx';

var styles = {
  loadingLabel: {
    top: 226,
    position: "absolute",
    textAlign: "center",
    width: 250,
    fontSize: 14,
    fontWeight: 200
  }
};
export default class DayAndDetailComponent extends React.Component {
  render(){
    var mainView = (
      <div>
        <div style={{position: "absolute", left: "30%", right: 0}}>
          <DayComponent
            entries={this.props.entries} 
            lineHeight={this.props.lineHeight} 
            fontSize={this.props.fontSize} />
        </div>
      </div>
    );

    var loadingView = (
      <div style={{position: 'absolute', top: "50%", left: "50%", marginLeft: -125, marginTop: -200}}>
          <CompassComponent />
          <h2 style={styles.loadingLabel}>Finding the nearst calendar...</h2>
      </div>
    );

    return loadingView;
  }
}

DayAndDetailComponent.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 40
};
