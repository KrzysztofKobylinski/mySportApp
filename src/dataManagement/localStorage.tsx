import { AsyncStorage } from 'react-native';
import _ from 'lodash';

export const storeLocalData = async (key, value) => {
  try {
    const data = _.isObject(value) ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log('storeLocalData', e);
  }
};

export const getLocalData = async (key, isObj = false) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (isObj) {
      return JSON.parse(value);
    }
    return value;
  } catch (e) {
    console.log(getLocalData, e);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};
