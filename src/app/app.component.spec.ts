import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {DataElement} from "./models/data-element.model";
import {ReplaceIdsService} from "./services/replace-ids.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ FormsModule ],
      providers: [ReplaceIdsService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
