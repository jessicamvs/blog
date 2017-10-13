import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case DELETE_POST:
      // if the state object has an key of the action.payload just drop it/omit it
      // and return a new object that does not contain that id anymore
      // this does not modify the existing state object, it returns a new state object
      return _.omit(state, action.payload)
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;

      return { ...state, [action.payload.data.id]: action.payload.data }
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
