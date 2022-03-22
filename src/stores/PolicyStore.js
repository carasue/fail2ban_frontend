import AppDispatcher from '../AppDispatcher.js';
import {GET_POLICY, CHANGE_POLICY} from '../ActionTypes.js'
import {EventEmitter, CHANGE_EVENT} from 'events'
import {get_policy, change_policy} from '../api.js'

const policyValues = {
  'req_count': 0,
  'req_duration': 0,
  'block_duration': 0,
}
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
  switch(action.type) {
    case GET_POLICY:
      get_policy()
      .then(res => {
        const policy = res.data;
        if (policy['attempts'] == policyValues['req_count'] && policy['period'] == policyValues['req_duration']*60000000000 && policy['blocktime'] == policyValues['block_duration']*60000000000) {
          return false;
        }
        policyValues['req_count'] = policy['attempts'];
        // convert nanoseconds to miniutes
        policyValues['req_duration'] = policy['period']/60000000000;
        policyValues['block_duration'] = policy['blocktime']/60000000000;
        PolicyStore.emitChange();
      });
      break;
    case CHANGE_POLICY:
      const policy = {
        'attempts': parseInt(action.req_count),
        'period': action.req_duration * 60000000000,
        'blocktime': action.block_duration * 60000000000,
      };
      policyValues['req_count'] = policy['attempts'];
      // convert nanoseconds to miniutes
      policyValues['req_duration'] = policy['period']/60000000000;
      policyValues['block_duration'] = policy['blocktime']/60000000000;
      change_policy(policy);
      PolicyStore.emitChange();
      break;
  }
});

export default PolicyStore;
