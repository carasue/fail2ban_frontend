import {GET_BLACKLIST, REMOVE_IP} from '../ActionTypes.js'
import AppDispatcher from '../AppDispatcher.js'
import {EventEmitter, CHANGE_EVENT} from 'events'
import {get_blacklist, unblock} from '../api.js'
import {isNewBlacklistSameWithOld} from '../utils.js'

let bannedIps = [];


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
          if (isNewBlacklistSameWithOld(blacklist, bannedIps)) {
            return false;
          }
          bannedIps = blacklist;
          BannedIpStore.emitChange();
        }).
          catch(err => {
            console.log(err);
          });
      break;
    case REMOVE_IP:
      unblock(action.ip).then(res => {
          bannedIps = bannedIps.filter(ip_item => ip_item['source'] != action.ip);
          BannedIpStore.emitChange();
        }, err => {
          console.log(err);
        });
      break;
  }
});

export default BannedIpStore;
