import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";
// import { CapacitorSQLite } from '@capacitor-community/sqlite';
const { CapacitorSQLite } = Plugins;

import dbOptions from '../../assets/db.json';
import Counter from '../models/Counter';
import Preset from '../models/Preset';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  async initDatabase() {
    try {
      console.log(dbOptions);
      await CapacitorSQLite.createConnection(dbOptions);
      Promise.resolve(true);
    } catch(err) {
      Promise.reject(err);
      throw err;
    }
  }

  public saveCounters(counters: Counter[]) {
    console.error('Not Implemented');
  }

  public savePresets(presets: Preset[]) {
    console.error('Not Implemented');
  }

  public getCounters() {
    console.error('Not Implemented');
  }

  public getPresets() {
    console.error('Not Implemented');
  }
}
