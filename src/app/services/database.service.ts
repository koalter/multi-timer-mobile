import { Injectable } from '@angular/core';
import Counter from '../models/Counter';
import Preset from '../models/Preset';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { 
    if (!localStorage)
      console.error('Database connection unsuccessful!');
    else {
      console.log('Database connected successfully!');
      
    console.log(localStorage);
    }

  }

  saveCounters(counters: Counter[]) {
    localStorage.setItem('counters', JSON.stringify(counters));
  }

  savePresets(presets: Preset[]) {
    localStorage.setItem('presets', JSON.stringify(presets));
  }

  getCounters(): Counter[] {
    if (!localStorage.getItem('counters'))
      localStorage.setItem('counters', JSON.stringify(new Array<Preset>()));

    return JSON.parse(localStorage.getItem('counters'));
  }

  getPresets() {
    if (!localStorage.getItem('presets'))
      localStorage.setItem('presets', JSON.stringify(new Array<Preset>()));

    return JSON.parse(localStorage.getItem('presets'));
  }
}
