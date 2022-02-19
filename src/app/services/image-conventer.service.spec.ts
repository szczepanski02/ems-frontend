import { TestBed } from '@angular/core/testing';

import { ImageConventerService } from './image-conventer.service';

describe('ImageConventerService', () => {
  let service: ImageConventerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageConventerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
