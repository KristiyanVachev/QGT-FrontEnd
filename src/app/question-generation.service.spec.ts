import { TestBed } from '@angular/core/testing';

import { QuestionGenerationService } from './question-generation.service';

describe('QuestionGenerationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionGenerationService = TestBed.get(QuestionGenerationService);
    expect(service).toBeTruthy();
  });
});
