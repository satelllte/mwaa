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

	public get defaultValue(): number {
		return this._defaultValue
	}

	private set defaultValue(defaultValue: number) {} // Prevent modifications

	public get minValue(): number {
		return this._minValue
	}

	private set minValue(minValue: number) {} // Prevent modifications

	public get maxValue(): number {
		return this._maxValue
	}

	private set maxValue(maxValue: number) {} // Prevent modifications

	private static _isValidAutomationRate(automationRate: AutomationRate | undefined): automationRate is AutomationRate {
		return automationRate === 'a-rate' || automationRate === 'k-rate'
	}

	private static _isValidValue(value: number | undefined): value is number {
		// Web Audio API not only checks number type but also makes sure that it's finite, so values like "Infinity" are invalid
		return Number.isFinite(value)
	}

	private _automationRate: AutomationRate
	private _value: number
	private _defaultValue: number
	private _minValue: number
	private _maxValue: number

	protected constructor(options: MockAudioParamOptions) {
		if (new.target === MockAudioParam) {
			throw new TypeError('Illegal constructor')
		}

		const automationRate: AutomationRate = options?.automationRate
		const defaultValue: number = options?.defaultValue
		const minValue: number = options?.minValue
		const maxValue: number = options?.maxValue
		const value: number = options?.value ?? defaultValue

		if (!MockAudioParam._isValidValue(value)) {
			throw new TypeError('The provided float value is non-finite')
		}

		this._automationRate = automationRate
		this._defaultValue = defaultValue
		this._minValue = minValue
		this._maxValue = maxValue
		this._value = value
		this.value = value // This will clamp the value & log warning (if that's the case)
	}

	private _isValueInRange(value: number): boolean {
		return this.minValue <= value && value <= this.maxValue
	}
}
