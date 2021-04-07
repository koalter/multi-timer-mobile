import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import Counter from '../models/Counter';
import Preset from '../models/Preset';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  databaseObject: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  initDatabase(): boolean {
    let result = true;
    this.sqlite.create({
      name: 'tempo.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.databaseObject = db;

      this.databaseObject.executeSql('CREATE TABLE IF NOT EXISTS `counters` (' +
                                     '`id` int(10) NOT NULL auto_increment,' +
                                     '`title` varchar(30),' +
                                     '`endtime` datetime,' +
                                     'PRIMARY KEY( `id` )' +
                                     ');')
      .then(value => console.log(value))
      .catch(err => {
        console.error(err);
        result = false;
      });
      this.databaseObject.executeSql('CREATE TABLE IF NOT EXISTS `presets` (' +
                                     '`id` int(10) NOT NULL auto_increment,' +
                                     '`title` varchar(30),' +
                                     '`hours` int(3),' +
                                     '`minutes` int(3),' +
                                     '`seconds` int(3),' +
                                     'PRIMARY KEY( `id` )' +
                                     ');')
      .then(value => {
        console.log(value);
        this.databaseObject.open();
        result = true;
      })
      .catch(err => {
        console.error(err);
        result = false;
      });

    })
    .catch(err => console.log(err));
    
    return result;
  }

  public async saveCounter(counter: Counter) {
    let result = null;

    let a = await this.databaseObject.transaction(tx => {
      tx.executeSql('INSERT INTO counters(title, endtime) VALUES (?, ?)', [counter.title, counter.endTime]);
    })
    // .then(value => result = value)
    // .catch(err => console.error(err));
  }

  public savePreset(preset: Preset) {
    let result = null;
    
    this.databaseObject.transaction(tx => {
      tx.executeSql('INSERT INTO presets(title, hours, minutes, seconds) VALUES (?, ?, ?, ?)', [preset.title, preset.hours, preset.minutes, preset.seconds]);
    }).then(value => console.log(value))
    .catch(err => console.error(err));
  }

  public removeCounter(counter: Counter) {
    this.databaseObject.transaction(tx => {
      tx.executeSql('DELETE counters WHERE', [counter.title, counter.endTime]);
    }).then(value => console.log(value))
    .catch(err => console.error(err));
  }

  public removePreset(preset: Preset) {
    this.databaseObject.transaction(tx => {
      tx.executeSql('INSERT INTO presets(title, hours, minutes, seconds) VALUES (?, ?, ?, ?)', [preset.title, preset.hours, preset.minutes, preset.seconds]);
    }).then(value => console.log(value))
    .catch(err => console.error(err));
  }

  public getCounters(): Counter[] {
    if (!localStorage.getItem('counters'))
      localStorage.setItem('counters', JSON.stringify(new Array<Preset>()));

    return JSON.parse(localStorage.getItem('counters'));
  }

  public getPresets() {
    if (!localStorage.getItem('presets'))
      localStorage.setItem('presets', JSON.stringify(new Array<Preset>()));

    return JSON.parse(localStorage.getItem('presets'));
  }
}
