import React, { Component } from "react";
import MonthHeader from '../containers/MonthHeader.jsx';
import Week from './Week';

const generateWeeks = (months) => {
  const weeks = months.reduce((acc, month) => {
    return month.reduce((accWeeks, day) => {
      if (day.dayOfweek == 0) { // newWeek
        return [
          ...accWeeks,
          [day],
        ]
      }
      if (accWeeks.length == 0) {
        accWeeks = [[]];
      }
      let week = accWeeks[accWeeks.length - 1];
      return [
        ...accWeeks.slice(0, -1),
        [
          ...week,
          day,
        ]
      ];
    }, acc)
  }, []);
  return weeks.map((week, index) => {
    return (
      <Week
        className="week"
        key={`${index}_${week[0].dayOfweek}`}
        days={week}
      ></Week>
    )
  })
}

class Heatmap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { connectServer } = this.props;
    connectServer();
  }

  componentWillUnmount() {
    const { disconnectServer } = this.props;
    disconnectServer();
  }
  
  render() {
    const { months } =  this.props;
    return (
    <div className="heatmap">
      {generateWeeks(months)}            
    </div>
    );
  }
}

export default Heatmap;