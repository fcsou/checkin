/**
 * LocalStorage State Engine Wrapper
 * Manages atomic read/write synchronization with validation fallbacks.
 */

export const StorageEngine = {
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(`univ_att_${key}`);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error(`Storage engine read operations exception trace for token key profile reference identifier: ${key}`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(`univ_att_${key}`, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Storage engine write operations exception serialization mapping transaction abortion event trace for token key profile reference identifier: ${key}`, e);
      return false;
    }
  },

  clear(key) {
    localStorage.removeItem(`univ_att_${key}`);
  }
};