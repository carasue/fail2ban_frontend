import {GET_BLACKLIST, REMOVE_IP} from '../ActionTypes.js'
import AppDispatcher from '../AppDispatcher.js'
import {EventEmitter, CHANGE_EVENT} from 'events'
import {get_blacklist} from '../api.js'


const bannedIps = [
  {
    'id': 1,
    'start_t': new Date(Date.UTC(96, 12, 5, 0, 0, 0)),
    'duration': 10,
    'ip': '192.125.2.3',
    'removed': false,
  },
  {
    'id': 2,
    'start_t': new Date(Date.UTC(97, 10, 16, 0, 0, 0)),
    'duration': 10,
    'ip': '172.135.29.3',
    'removed': true,
  },
];

const BannedIpStore = Object.assign({}, EventEmitter.prototype, {
  getBannedIps: function() {
    return bannedIps;
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

BannedIpStore.dispatchToken = AppDispatcher.register((action) => {
  switch(action.type) {
    case GET_BLACKLIST:
      get_blacklist().
        then(res => {
          const blacklist = res.data;
          console.log(res);
        });
      break;
  }
  console.log(action)
  if (action.type == REMOVE_IP) {
    for(let i=0; i<bannedIps.length; i++) {
      if (action.id == bannedIps[i].id) {
        bannedIps[i].removed = true;
      }
    }
    // #TODO: save to the server here
    BannedIpStore.emitChange();
  }
});

export default BannedIpStore;
