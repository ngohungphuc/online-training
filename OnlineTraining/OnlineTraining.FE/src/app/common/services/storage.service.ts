import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  setObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getObject(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  updateItem(key, property, value) {
    const obj = this.getObject(key);
    obj[property] = value;
    this.setObject(key, obj);
  }
}
