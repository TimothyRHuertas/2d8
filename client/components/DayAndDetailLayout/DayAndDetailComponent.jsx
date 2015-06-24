import React from 'react';
import DayComponent from 'components/DayLayout/DayComponent.jsx';
import CompassComponent from 'components/Compass/CompassComponent.jsx';
import EventComponent from 'components/EventLayout/EventComponent.jsx';

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

var interval;

export default class DayAndDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    var sortedEvents = this.sortedEvents(this.props.entries);

    this.state = {mainViewClass: "hidden", loaderClass: "visible", selectedIdx: 0, scollTop: 0, sortedEvents: sortedEvents};
  }
  componentWillReceiveProps(nextProps){
    var sortedEvents = this.sortedEvents(nextProps.entries);
    this.setState({sortedEvents: sortedEvents});
  }
  sortedEvents(entries){
    return _.sortBy(entries, function(event){ return event.time.start.getTime(); }); 
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({mainViewClass: "visible", loaderClass: "hidden"});
      interval = setInterval(()=>{
        var selectedIdx = this.state.selectedIdx + 1;

        if(selectedIdx === this.props.entries.length){
          selectedIdx = 0;
        }

        this.setState({selectedIdx: selectedIdx});
      }, 1000*6);
    }, 4000);
  }

  componentWillUnmount(){
    clearInterval(interval);
  }

  componentDidUpdate(){
    this.syncScroll(); 
  }

  syncScroll(){
    var event = this.state.sortedEvents[this.state.selectedIdx];
    document.body.scrollTop = event.top;
  }

  render(){
    var now = new Date();

    var mainView = (
      <div className={this.state.mainViewClass}>
        <div className="header" 
          style={{zIndex: 2, textAlign: "center", letterSpacing: "normal", fontSize: 23, lineHeight: "48px", position: "fixed", left:0, right:0, height: 45, boxSizing: "border-box", borderBottom: "1px solid rgb(229, 172, 169)"}}>
          <strong style={{fontWeight: 500}}>{now.format("{Mon} {dd}")}</strong>
          <span style={{fontWeight: 300}}>{"  " + now.format("{yyyy}")}</span>
        </div>
        <div style={{position: "fixed", left: 0, bottom: 0, right: "70%", top: 45}}>
          <EventComponent event={this.state.sortedEvents[this.state.selectedIdx]}/>
        </div>
        <div ref="scroller" style={{position: "absolute", left: "30%", right: 10, top: 45}}>
          <DayComponent
            selectedIdx = {this.state.selectedIdx}
            entries={this.props.entries} 
            lineHeight={this.props.lineHeight} 
            fontSize={this.props.fontSize} />
        </div>
      </div>
    );

    var loadingView = (
      <div className={this.state.loaderClass} style={{position: 'absolute', top: "50%", left: "50%", marginLeft: -125, marginTop: -200}}>
          <CompassComponent />
          <h2 style={styles.loadingLabel}>Finding the nearst calendar...</h2>
      </div>
    );

    return (
      <div>
        {loadingView}
        {mainView}
      </div>
    );
  }
}

DayAndDetailComponent.defaultProps = {
  entries: [],
  lineHeight: 100,
  fontSize: 30
};
