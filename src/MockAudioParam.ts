export class MockAudioParam implements Omit<AudioParam,
| 'automationRate'
| 'defaultValue'
| 'minValue'
| 'maxValue'
| 'value'
| 'cancelAndHoldAtTime'
| 'cancelScheduledValues'
| 'exponentialRampToValueAtTime'
| 'linearRampToValueAtTime'
| 'setTargetAtTime'
| 'setValueAtTime'
| 'setValueCurveAtTime'
> {
	protected constructor() {
		throw new TypeError('Illegal constructor')
	}
}
