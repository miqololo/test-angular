import { TestBed } from '@angular/core/testing';
import { ReplaceIdsService } from './replace-ids.service';


describe('ReplaceIdsService', () => {
  let service: ReplaceIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReplaceIdsService]
    });
    service = TestBed.inject(ReplaceIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should replace IDs in the data array', () => {
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];

    const additionalIdsArray = [100, 200, 300];

    service.replaceIds(data, additionalIdsArray).subscribe((result) => {
      expect(result).toEqual([
        { id: 100, name: 'Item 1' },
        { id: 200, name: 'Item 2' },
        { id: 300, name: 'Item 3' }
      ]);
    });
  });

  it('should return the original data when additionalIdsArray is shorter', () => {
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];

    const additionalIdsArray = [100, 200];

    service.replaceIds(data, additionalIdsArray).subscribe((result) => {
      expect(result).toEqual([
        { id: 100, name: 'Item 1' },
        { id: 200, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ]);
    });
  });
});
