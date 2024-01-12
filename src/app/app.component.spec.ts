import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {DataElement} from "./models/data-element.model";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ FormsModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly replace IDs in data array', () => {
    component.additionalIdsArray = [100, 200, 300];
    const testData: DataElement[] = [
      { id:1,
        int: 1,
        float: 2,
        color: 'color',
        child: [
          {
            id:4,
            color:'3sasa'
          }
        ]
      },
      { id:1,
        int: 1,
        float: 2,
        color: 'color',
        child: [
          {
            id:4,
            color:'3sasa'
          }
        ]},
      { id:1,
        int: 1,
        float: 2,
        color: 'color',
        child: [
          {
            id:4,
            color:'3sasa'
          }
        ] },
    ];

    const replacedData = component.replaceIds(testData);
    expect(replacedData[0].id).toEqual(100);
    expect(replacedData[1].id).toEqual(200);
    expect(replacedData[2].id).toEqual(300);
  });

  // Test for updateTimerInterval
  it('should post message to worker on updateTimerInterval', () => {
    spyOn(component['worker'], 'postMessage');
    component.updateTimerInterval();
    expect(component['worker'].postMessage).toHaveBeenCalledWith({
      type: 'updateInterval',
      value: component.timerInterval,
    });
  });

  // Test for updateArraySize
  it('should post message to worker on updateArraySize', () => {
    spyOn(component['worker'], 'postMessage');
    component.updateArraySize();
    expect(component['worker'].postMessage).toHaveBeenCalledWith({
      type: 'updateArraySize',
      value: component.arraySize,
    });
  });

  // Test for updateAdditionalIds
  it('should update additionalIdsArray correctly', () => {
    component.additionalIds = '1 2 3';
    component.updateAdditionalIds();
    expect(component.additionalIdsArray).toEqual([1, 2, 3]);
  });

});
