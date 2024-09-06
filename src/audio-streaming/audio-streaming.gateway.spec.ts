import { Test, TestingModule } from '@nestjs/testing';
import { AudioStreamingGateway } from './audio-streaming.gateway';

describe('AudioStreamingGateway', () => {
  let gateway: AudioStreamingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudioStreamingGateway],
    }).compile();

    gateway = module.get<AudioStreamingGateway>(AudioStreamingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
