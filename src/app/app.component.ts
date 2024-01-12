import { Component } from '@angular/core';
import {DataElement} from "./models/data-element.model";
import {ReplaceIdsService} from "./services/replace-ids.service";
import {Observable} from "rxjs";

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
  private observableObject: any;

  constructor(private replaceIdService: ReplaceIdsService) {
    this.worker = new Worker(new URL('./app.worker', import.meta.url));
    this.worker.addEventListener('message', ({ data }) => {
      this.dataChanger([...this.data, data].slice(-this.arraySize));
    });
  }

  dataChanger(data: DataElement[]){
    if(this.observableObject){
      this.observableObject.unsubscribe();
    }
    this.observableObject = this.replaceIdService.replaceIds(data, this.additionalIdsArray).subscribe((data)=>{
      this.data = data;
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
  }



  ngOnDestroy() {
    this.worker.terminate();
    if(this.observableObject){
      this.observableObject.unsubscribe();
    }
  }
}
