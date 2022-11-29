import { Test, TestingModule } from '@nestjs/testing';

import { SampleService } from './sample.service';

describe('SampleService', () => {
	let sampleService: SampleService;

	beforeEach(async () => {
		const sample: TestingModule = await Test.createTestingModule({
			providers: [SampleService],
		}).compile();

		sampleService = sample.get<SampleService>(SampleService);
	});

	describe('root', () => {
		it('should return "sample"', () => {
			expect(sampleService.getSample()).toBe('sample');
		});
	});
});
