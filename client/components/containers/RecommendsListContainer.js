import { connect } from 'react-redux';
import RecommendsList from '../layouts/RecommendsList/RecommendsList';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    recommendsList: state.recommendsStore.recommendsList,
  };
};


export default connect(mapStateToProps)(RecommendsList);
