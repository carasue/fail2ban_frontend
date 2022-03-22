import * as ActionTypes from './ActionTypes.js';
import AppDispatcher from './AppDispatcher.js';

// POLICY
export const get_policy = () => {
  AppDispatcher.dispatch({
    type: ActionTypes.GET_POLICY
  });
};

export const change_policy = (req_count, req_duration, block_duration) => {
  AppDispatcher.dispatch({
    type: ActionTypes.CHANGE_POLICY,
    req_count: req_count,
    req_duration: req_duration,
    block_duration: block_duration
  });
};


// BLACKLIST
export const get_blacklist = () => {
  AppDispatcher.dispatch({
    type: ActionTypes.GET_BLACKLIST
  });
};

export const remove_ip = (id) => {
  AppDispatcher.dispatch({
    type: ActionTypes.REMOVE_IP,
    id: id
  });
};

