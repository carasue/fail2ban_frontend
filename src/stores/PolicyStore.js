import AppDispatcher from '../AppDispatcher.js';
import {CHANGE_POLICY} from '../ActionTypes.js'
import {EventEmitter, CHANGE_EVENT} from 'events'

var policyValues = {
  'req_count': 0,
  'req_duration': 0,
  'block_duration': 0,
};

const PolicyStore = Object.assign({}, EventEmitter.prototype, {
  getPolicyValues: function() {
    return policyValues;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

PolicyStore.dispatchToken = AppDispatcher.register((action) => {
  if (action.type == CHANGE_POLICY) {
    policyValues = {
      'req_count': action.req_count,
      'req_duration': action.req_duration,
      'block_duration': action.block_duration,
    };
    // #TODO: save to the server here
    PolicyStore.emitChange();
  }
});

export default PolicyStore;
