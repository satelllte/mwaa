import {clamp} from './utils/math/clamp'

type MockAudioParamOptions = {
	automationRate: AutomationRate;
	defaultValue: number;
	minValue: number;
	maxValue: number;
	value?: number;
}

export class MockAudioParam implements Omit<AudioParam,
| 'cancelAndHoldAtTime'
| 'cancelScheduledValues'
| 'exponentialRampToValueAtTime'
| 'linearRampToValueAtTime'
| 'setTargetAtTime'
| 'setValueAtTime'
| 'setValueCurveAtTime'
> {
	public get automationRate(): AutomationRate {
		return this._automationRate
	}

	public set automationRate(automationRate: AutomationRate) {
		if (!MockAudioParam._isValidAutomationRate(automationRate)) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			console.warn(`The provided value '${automationRate}' is not a valid enum value of type AutomationRate.`)
			return
		}

		this._automationRate = automationRate
	}

	public get value(): number {
		return this._value
	}

	public set value(value: number) {
		if (!MockAudioParam._isValidValue(value)) {
			throw new TypeError('Failed to set the \'value\' property on \'AudioParam\': The provided float value is non-finite.')
		}

		if (!this._isValueInRange(value)) {
			console.warn(`value ${value} outside nominal range [${this.minValue}, ${this.maxValue}]; value will be clamped`)
			this._value = clamp(value, this.minValue, this.maxValue)
			return
		}

		this._value = value
	}

	private static _isValidAutomationRate(automationRate: AutomationRate | undefined): automationRate is AutomationRate {
		return automationRate === 'a-rate' || automationRate === 'k-rate'
	}

	private static _isValidValue(value: number | undefined): value is number {
		// Web Audio API not only checks number type but also makes sure that it's finite, so values like "Infinity" are invalid
		return Number.isFinite(value)
	}

	public readonly defaultValue: number
	public readonly minValue: number
	public readonly maxValue: number

	private _automationRate: AutomationRate
	private _value: number

	protected constructor(options?: MockAudioParamOptions) {
		if (new.target === MockAudioParam) {
			throw new TypeError('Illegal constructor')
		}

		const automationRate: AutomationRate | undefined = options?.automationRate
		const defaultValue: number | undefined = options?.defaultValue
		const minValue: number | undefined = options?.minValue
		const maxValue: number | undefined = options?.maxValue
		const value: number | undefined = options?.value ?? defaultValue

		if (!MockAudioParam._isValidAutomationRate(automationRate)) {
			throw new TypeError('Cannot create MockAudioParam: Must provide valid "automationRate"')
		}

		if (!MockAudioParam._isValidValue(defaultValue)) {
			throw new TypeError('Cannot create MockAudioParam: Must provide valid "defaultValue"')
		}

		if (!MockAudioParam._isValidValue(minValue)) {
			throw new TypeError('Cannot create MockAudioParam: Must provide valid "minValue"')
		}

		if (!MockAudioParam._isValidValue(maxValue)) {
			throw new TypeError('Cannot create MockAudioParam: Must provide valid "maxValue"')
		}

		if (!MockAudioParam._isValidValue(value)) {
			throw new TypeError('The provided float value is non-finite')
		}

		this._automationRate = automationRate
		this.defaultValue = defaultValue
		this.minValue = minValue
		this.maxValue = maxValue
		this._value = value
		this.value = value // This will clamp the value & log warning (if that's the case)
	}

	private _isValueInRange(value: number): boolean {
		return this.minValue <= value && value <= this.maxValue
	}
}
