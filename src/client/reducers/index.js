const YEAR = 2019;

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days = [
      ...days,
      {
        month,
        dayOfMonth: days.length,
        dayOfweek: date.getDay(),
        heat: 0,
      },
    ];
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const defaultState = () => {
  let months = [];
  for (let i = 0; i < 12; i += 1) {
    months = [
      ...months,
      getDaysInMonth(i, YEAR),
    ];
  }
  return {
    empty: months,
    live: months,
  };
};

const updateHeatmap = (data, state) => {
  const { live } = state;
  const updatedLive = live.map((month, monthIndex) => {
    const days = month.map((day, dayIndex) => {
      const updatedHeat = data[`${monthIndex}_${dayIndex}`];
      if (typeof updatedHeat === 'undefined' || day.heat === updatedHeat) {
        return day;
      }
      return {
        ...day,
        heat: updatedHeat,
      };
    }, []);
    return days;
  }, []);
  return updatedLive;
};

const heatmap = (state = defaultState(), action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        empty: state.empty,
        live: updateHeatmap(action.data, state),
      };
    default:
      return state;
  }
};

export default heatmap;
