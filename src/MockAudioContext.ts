export class MockAudioContext implements Pick<AudioContext,
| 'baseLatency'
| 'outputLatency'
> {
	public get baseLatency(): number {
		return 0.009
	}

	public get outputLatency(): number {
		return 0.011
	}
}
