import { Component } from '@angular/core';
import {DataElement} from "./models/data-element.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: DataElement[] = [];
  additionalIds: string = '';
  additionalIdsArray: number[] = [];
  timerInterval = 1000; // Default value in ms
  arraySize = 10; // Default array size
  private worker: Worker;

  constructor() {
    this.worker = new Worker(new URL('./app.worker', import.meta.url));
    this.worker.addEventListener('message', ({ data }) => {
      this.data = this.replaceIds([...this.data, data].slice(-this.arraySize));
    });
  }

  async updateTimerInterval() {
    this.worker.postMessage({ type: 'updateInterval', value: this.timerInterval });
  }

  async updateArraySize() {
    this.worker.postMessage({ type: 'updateArraySize', value: this.arraySize });
  }

  async updateAdditionalIds() {
    this.additionalIdsArray = this.additionalIds.split(' ').map((item) => Number(item));
    await this.worker.postMessage({ type: 'updateAdditionalIds', value: this.additionalIdsArray });
  }

  replaceIds(data: DataElement[]): DataElement[] {
    return data.map((element, index) => ({
      ...element,
      id: this.additionalIdsArray[index] || element.id
    }));
  }

  ngOnDestroy() {
    this.worker.terminate();
  }
}
