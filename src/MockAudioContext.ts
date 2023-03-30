export class MockAudioContext implements AudioContext {
  public readonly baseLatency: number = 0.009
  public readonly outputLatency: number = 0.011
  close(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createMediaElementSource(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode {
    throw new Error("Method not implemented.");
  }
  createMediaStreamDestination(): MediaStreamAudioDestinationNode {
    throw new Error("Method not implemented.");
  }
  createMediaStreamSource(mediaStream: MediaStream): MediaStreamAudioSourceNode {
    throw new Error("Method not implemented.");
  }
  getOutputTimestamp(): AudioTimestamp {
    throw new Error("Method not implemented.");
  }
  resume(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  suspend(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addEventListener<K extends "statechange">(type: K, listener: (this: AudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
  addEventListener(type: unknown, listener: unknown, options?: unknown): void {
    throw new Error("Method not implemented.");
  }
  removeEventListener<K extends "statechange">(type: K, listener: (this: AudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | EventListenerOptions | undefined): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
  removeEventListener(type: unknown, listener: unknown, options?: unknown): void {
    throw new Error("Method not implemented.");
  }
  // @ts-expect-error
  audioWorklet: AudioWorklet;
  // @ts-expect-error
  currentTime: number;
  // @ts-expect-error
  destination: AudioDestinationNode;
  // @ts-expect-error
  listener: AudioListener;
  // @ts-expect-error
  onstatechange: ((this: BaseAudioContext, ev: Event) => any) | null;
  // @ts-expect-error
  sampleRate: number;
  // @ts-expect-error
  state: AudioContextState;
  createAnalyser(): AnalyserNode {
    throw new Error("Method not implemented.");
  }
  createBiquadFilter(): BiquadFilterNode {
    throw new Error("Method not implemented.");
  }
  createBuffer(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer {
    throw new Error("Method not implemented.");
  }
  createBufferSource(): AudioBufferSourceNode {
    throw new Error("Method not implemented.");
  }
  createChannelMerger(numberOfInputs?: number | undefined): ChannelMergerNode {
    throw new Error("Method not implemented.");
  }
  createChannelSplitter(numberOfOutputs?: number | undefined): ChannelSplitterNode {
    throw new Error("Method not implemented.");
  }
  createConstantSource(): ConstantSourceNode {
    throw new Error("Method not implemented.");
  }
  createConvolver(): ConvolverNode {
    throw new Error("Method not implemented.");
  }
  createDelay(maxDelayTime?: number | undefined): DelayNode {
    throw new Error("Method not implemented.");
  }
  createDynamicsCompressor(): DynamicsCompressorNode {
    throw new Error("Method not implemented.");
  }
  createGain(): GainNode {
    throw new Error("Method not implemented.");
  }
  createIIRFilter(feedforward: number[], feedback: number[]): IIRFilterNode;
  createIIRFilter(feedforward: Iterable<number>, feedback: Iterable<number>): IIRFilterNode;
  createIIRFilter(feedforward: unknown, feedback: unknown): IIRFilterNode {
    throw new Error("Method not implemented.");
  }
  createOscillator(): OscillatorNode {
    throw new Error("Method not implemented.");
  }
  createPanner(): PannerNode {
    throw new Error("Method not implemented.");
  }
  createPeriodicWave(real: number[] | Float32Array, imag: number[] | Float32Array, constraints?: PeriodicWaveConstraints | undefined): PeriodicWave;
  createPeriodicWave(real: Iterable<number>, imag: Iterable<number>, constraints?: PeriodicWaveConstraints | undefined): PeriodicWave;
  createPeriodicWave(real: unknown, imag: unknown, constraints?: unknown): PeriodicWave {
    throw new Error("Method not implemented.");
  }
  createScriptProcessor(bufferSize?: number | undefined, numberOfInputChannels?: number | undefined, numberOfOutputChannels?: number | undefined): ScriptProcessorNode {
    throw new Error("Method not implemented.");
  }
  createStereoPanner(): StereoPannerNode {
    throw new Error("Method not implemented.");
  }
  createWaveShaper(): WaveShaperNode {
    throw new Error("Method not implemented.");
  }
  decodeAudioData(audioData: ArrayBuffer, successCallback?: DecodeSuccessCallback | null | undefined, errorCallback?: DecodeErrorCallback | null | undefined): Promise<AudioBuffer> {
    throw new Error("Method not implemented.");
  }
  dispatchEvent(event: Event): boolean {
    throw new Error("Method not implemented.");
  }
}
