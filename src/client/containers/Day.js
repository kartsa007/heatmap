import { connect } from 'react-redux';
import Day from '../components/Day';

const mapState2Props = (state, ownProps) => {
  const { day } = ownProps;
  const { month, dayOfMonth } = day;
  const months = state.live;
  const { heat } = months[month][dayOfMonth];
  return {
    heat,
  };
};
export default connect(mapState2Props)(Day);
