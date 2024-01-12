import { Injectable } from '@angular/core';
import {DataElement} from "../models/data-element.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReplaceIdsService {
  replaceIds(data: any[], additionalIdsArray: Number[]): Observable<any[]> {
    // Your logic to replace IDs in the data array can go here
    // For example, you can use RxJS operators to transform the data
    // For now, let's just return the input data as-is
    return of(data.map((element, index) => ({
      ...element,
      id: additionalIdsArray[index] || element.id
    })));
  }
}
