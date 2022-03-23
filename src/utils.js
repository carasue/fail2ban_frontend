export function isNewBlacklistSameWithOld(newBlacklist, oldBlacklist) {
  const newBlacklistIpMap = blacklistToMap(newBlacklist);
  const oldBlacklistIpMap = blacklistToMap(oldBlacklist);
  for (let ip in newBlacklistIpMap) {
    if (!oldBlacklistIpMap.hasOwnProperty(ip)) {
      return false;
    }
    if (newBlacklistIpMap[ip]['source'] != oldBlacklistIpMap[ip]['source'] ||
       newBlacklistIpMap[ip]['timestamp'] != oldBlacklistIpMap[ip]['timestamp'] ||
       newBlacklistIpMap[ip]['duration'] != oldBlacklistIpMap[ip]['duration']) {
         return false;
       }
    return true;
  }
}

function blacklistToMap(blacklist) {
  const blacklistIpMap = {};
  for(let i = 0; i < blacklist.length; i++ ) {
    blacklistIpMap[blacklist[i]['source']] = blacklist[i];
  }
  return blacklistIpMap;
}
