export class Maps<K,V> extends Map {
  toArrayOfValues() {
    return Array.from(this, ([k, v]) => v) as V[];
  }

  toKeyValueArray() {
    return Array.from(this, ([k, v]) => ({key:k,value:v})) as {key:K,value:V}[];
  }

  from(array:[{key:K,value:V}]) {
    array.forEach((array) => this.set(array.key, array.value));
    return this;
  }

  static from(array:{key:any,value:any}[]) {
    const maps = new this();
    array.forEach((array) => maps.set(array.key, array.value));
    return maps;
  }
};

export const useLog = (data:any, note = '') => {
  console.log(`==================== ${note} =================`);
  console.log(data);
  console.log('==================================================');
};