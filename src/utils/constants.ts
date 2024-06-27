import {Platform} from 'react-native';

export const BEHAVIOR = Platform.OS === 'ios' ? 'height' : undefined;
export const ADDRESS = 'http://127.0.0.1:8000';
export const ADDRESS_WITHOUT_PROTOCOL = '127.0.0.1:8000';
