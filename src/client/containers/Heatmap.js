import { connect } from 'react-redux';
import Heatmap from '../components/Heatmap';
import { updateHeatmap } from '../actions';

let webSocket;
const connectServer = (dispatch) => {
  webSocket = new WebSocket('ws://localhost:3003');
  webSocket.addEventListener('open', (event) => {
    console.log(event);
  });
  webSocket.addEventListener('message', (event) => {
    dispatch(updateHeatmap(JSON.parse(event.data)));
  });
};

const disconnectServer = () => {
  webSocket.close();
};

const mapDispatch2Props = (dispatch) => ({
  connectServer: () => { connectServer(dispatch); },
});

const mapState2Props = (state) => (
  {
    months: state.empty,
    connectServer,
    disconnectServer,
  }
);

export default connect(mapState2Props, mapDispatch2Props)(Heatmap);
