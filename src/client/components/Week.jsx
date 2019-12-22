import React from 'react';
import Day from '../containers/Day';
import EmptyDay from './EmptyDay';

const emptyWeek = Array(7).fill({});
// Some weeks are shoter, fill missing days with empty data
const fillWeek = (days) => {
  const start = [...emptyWeek.slice(0, days[0].dayOfweek)];
  const end = [...emptyWeek.slice(days[days.length - 1].dayOfweek + 1)];
  return [
    ...emptyWeek.slice(0, days[0].dayOfweek),
    ...days,
    ...emptyWeek.slice(days[days.length - 1].dayOfweek + 1),
  ];
};

const Week = ({ days }) => {
  const filledWeek = fillWeek(days)
  return (
    <div className="week">
      { 
        filledWeek.map((day, index) => {
          if (typeof day.dayOfweek !== 'undefined') {
            return (
              <Day
                key={`${day.month}.${day.dayOfMonth}`}
                day={day}
              />
            );
          }
          return (
            <EmptyDay
              key={`empty_${index}`}
              day={day}
            />
          )
        })
      }
    </div>
  );
};

export default Week;

