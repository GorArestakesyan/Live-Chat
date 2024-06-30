//@ts-ignore
import AvatarImage from '@assets/images/avatar.png';
import {ADDRESS_WITHOUT_PROTOCOL} from '@utils/constants';
import {Platform} from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log<U>(args: string, secArg?: U): void {
  // Much better console.log function that formats/indents
  // objects for better reabability
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];
    // Stringify and indent object
    if (typeof arg === 'object') {
      arg = JSON.stringify(arg, null, 2);
    }
    console.log(`[${Platform.OS}]`, arg);
  }
}

function thumbnail(url: string | undefined) {
  if (!url) {
    return AvatarImage;
  }
  return {
    url: 'http://' + ADDRESS_WITHOUT_PROTOCOL + url,
  };
}

function formatedData(date: Date) {
  if (date === null) {
    return '-';
  }
  const now: Date = new Date();
  //@ts-ignore
  const s = Math.abs(now - new Date(date)) / 1000;
  // SECONDS
  if (s < 60) {
    return 'now';
  }
  //MINUTES
  if (s < 60 ** 2) {
    const m = Math.floor(s / 60);
    return `${m}min ago`;
  }
  // HOURS
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / (60 * 60));
    return `${h}h ago`;
  }
  // DAYS
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));
    return `${d}d ago`;
  }
  // WEEKS
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w}week ago`;
  }
  // YEARS
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  return `${y}year ago`;
}

export default {log, thumbnail, formatedData};
