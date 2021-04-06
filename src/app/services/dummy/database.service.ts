import { Injectable } from '@angular/core';
import Counter from '../../models/Counter';
import Preset from '../../models/Preset';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { 
    if (!localStorage)
      console.error('Database connection unsuccessful!');
    else
      console.log('Database connected successfully!');
  }

  public saveCounters(counters: Counter[]) {
    localStorage.setItem('counters', JSON.stringify(counters));
  }

  public savePresets(presets: Preset[]) {
    localStorage.setItem('presets', JSON.stringify(presets));
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
