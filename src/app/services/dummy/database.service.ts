import { Injectable } from '@angular/core';
import Counter from '../../models/Counter';
import Preset from '../../models/Preset';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  initDatabase() {
    return localStorage;
  }

  public saveCounter(counter: Counter) {
    let counterList = JSON.parse(localStorage.getItem('counters')) as Counter[];
    counterList.push(counter);
    localStorage.setItem('counters', JSON.stringify(counterList));
  }

  public savePreset(preset: Preset) {
    let presetList = JSON.parse(localStorage.getItem('presets')) as Preset[];
    presetList.push(preset);
    localStorage.setItem('presets', JSON.stringify(presetList));
  }

  public removeCounter(counter: Counter) {
    let counterList = JSON.parse(localStorage.getItem('counters')) as Counter[];
    counterList.splice(counterList.findIndex(c => c === counter), 1);
    localStorage.setItem('counters', JSON.stringify(counterList));
  }

  public removePreset(preset: Preset) {
    let presetList = JSON.parse(localStorage.getItem('presets')) as Preset[];
    presetList.splice(presetList.findIndex(p => p === preset), 1);
    localStorage.setItem('presets', JSON.stringify(presetList));
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
