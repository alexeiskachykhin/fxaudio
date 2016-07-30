/// <reference path="../libraries/lib.d.ts" />
/// <reference path="../libraries/es6-promise.d.ts" />
/// <reference path="../libraries/MediaStream.d.ts" />
/// <reference path="../libraries/waa.d.ts" />
declare namespace FXAudio {
    interface IStringResourceMap {
        [id: number]: string;
    }
    interface IResourceMap {
        strings: IStringResourceMap;
    }
    var ResourceMap: IResourceMap;
    enum ResourceKey {
        ARGUMENT_ERROR_MESSAGE = 0,
        ARGUMENT_OUT_OF_RANGE_ERROR_MESSAGE = 1,
        ARGUMENT_NULL_OR_UNDEFINED_ERROR_MESSAGE = 2,
        ABSTRACT_ERROR_MESSAGE = 3,
        NOT_YET_IMPLEMENTED_ERROR_MESSAGE = 4,
        INVALID_OPERATION_ERROR_MESSAGE = 5,
    }
}
declare namespace FXAudio {
    class ResourceManager {
        static getString(resourceKey: ResourceKey, args: any[]): string;
        private static formatString(s, args);
    }
}
declare namespace FXAudio {
    class Errors {
        static argument(argument: string, message?: string): Error;
        static argumentOutOfRange(argument: string): Error;
        static argumentNullOrUndefined(argument: string): Error;
        static abstract(): Error;
        static notYetImplemented(): Error;
        static invalidOperation(message?: string): Error;
    }
}
declare namespace FXAudio {
    class Contract {
        static requires(condition: boolean, argument: string, message?: string): void;
        static isNotNullOrUndefined(value: any, argument: string): void;
        static isPositiveOrZero(value: number, argument: string): void;
    }
}
declare namespace FXAudio {
    interface IEventSource {
        addEventListener(eventName: string, eventListener: Function): IEventSource;
        removeEventListener(eventName: string, eventListener: Function): IEventSource;
    }
    interface IEventCompletionSource extends IEventSource {
        dispatchEvent(eventName: any, ...eventArgs: any[]): void;
    }
    class EventSource implements IEventCompletionSource {
        private _events;
        private _defer(f);
        private _dispatchEvent(eventName, ...eventArgs);
        addEventListener(eventName: string, eventListener: Function): EventSource;
        removeEventListener(eventName: string, eventListener: Function): EventSource;
        dispatchEvent(eventName: any, ...eventArgs: any[]): void;
    }
}
declare namespace FXAudio {
    class Context {
        private _audioContext;
        audioContext: AudioContext;
        sampleRate: number;
        currentTime: number;
        constructor(audioContext: AudioContext);
    }
}
declare namespace FXAudio {
    class OfflineContext extends Context {
        constructor(numberOfChannels: number, length: number, sampleRate: number);
    }
}
declare namespace FXAudio {
    class RealTimeContext extends Context {
        constructor();
    }
}
declare namespace FXAudio {
    class Circuit {
        private _context;
        private _inputs;
        private _outputs;
        context: Context;
        inputs: UnitPort[];
        outputs: UnitPort[];
        constructor(context: Context);
        protected _publishInputComponent(audioNode: AudioNode): void;
        protected _publishInputComponents(audioNodes: AudioNode[]): void;
        protected _publishOutputComponent(audioNode: AudioNode): void;
        protected _publishOutputComponents(audioNodes: AudioNode[]): void;
    }
}
declare namespace FXAudio {
    class Unit<TCircuit extends Circuit> {
        private _ports;
        private _circuit;
        ports: UnitInterface;
        circuit: TCircuit;
        context: Context;
        constructor(circuit: TCircuit);
    }
}
declare namespace FXAudio {
    enum UnitPortDirection {
        INPUT = 0,
        OUTPUT = 1,
    }
    class UnitPort {
        private _audioNode;
        private _channel;
        private _direction;
        constructor(audioNode: AudioNode, channel: number, direction: UnitPortDirection);
        connect(port: UnitPort): void;
        disconnect(): void;
    }
}
declare namespace FXAudio {
    class UnitInterface {
        private _inputs;
        private _outputs;
        inputs: UnitPort[];
        outputs: UnitPort[];
        constructor(inputs: UnitPort[], outputs: UnitPort[]);
    }
}
declare namespace FXAudio {
    enum NodeType {
        ANALYSER = 0,
        BIQUAD_FILTER = 1,
        BUFFER_SOURCE = 2,
        CHANNEL_MERGER = 3,
        CHANNEL_SPLITTER = 4,
        CONVOLVER = 5,
        DELAY = 6,
        DESTINATION = 7,
        DYNAMICS_COMPRESSOR = 8,
        GAIN = 9,
        SCRIPT_PROCESSOR = 10,
        MEDIA_ELEMENT_SOURCE = 11,
        MEDIA_STREAM_DESTINATION = 12,
        MEDIA_STREAM_SOURCE = 13,
        OSCILLATOR = 14,
        PANNER = 15,
        WAVE_SHAPER = 16,
    }
}
declare namespace FXAudio {
    class WebAudioAPIUtilities {
        routeLinear(chainOfNodes: AudioNode[]): void;
        routeLinear(...args: AudioNode[]): void;
        routeCross(a: AudioNode[], b: AudioNode[]): void;
        routeWithFeedback(a: AudioNode, b: AudioNode): void;
        createNode(audioContext: AudioContext, nodeType: NodeType, ...args: any[]): AudioNode;
    }
    class UnitInterfaceUtilities {
        createPortsFromAudioNode(audioNode: AudioNode, direction: UnitPortDirection, ports: UnitPort[]): void;
        createPortsFromAudioNodes(audioNodes: AudioNode[], direction: UnitPortDirection, ports: UnitPort[]): void;
    }
    class AudioUtilities {
        static WebAudioAPI: WebAudioAPIUtilities;
        static AudioInterface: UnitInterfaceUtilities;
    }
}
declare namespace FXAudio {
    class AdapterCircuit<TNode extends AudioNode> extends Circuit {
        private _audioNode;
        private _audioNodeType;
        private _audioNodeFactoryMethodArguments;
        audioNode: TNode;
        constructor(context: Context, audioNodeType: NodeType, ...args: any[]);
        private _createAdapterComponents();
        private _publishAdapterComponents();
        private _createNode();
    }
}
declare namespace FXAudio {
    class AudioDestinationCircuit extends AdapterCircuit<AudioDestinationNode> {
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class AudioDestinationUnit extends Unit<AudioDestinationCircuit> {
        maxChannelCount: number;
        constructor(context: RealTimeContext);
    }
}
declare namespace FXAudio {
    enum AudioSourceState {
        PLAYING = 0,
        STOPPED = 1,
        PAUSED = 2,
        AWAITING = 3,
    }
    interface IAudioSourceController {
        state: AudioSourceState;
        canStart: boolean;
        canStop: boolean;
        canRewind: boolean;
        time: number;
        start(when: number): void;
        stop(when: number): void;
    }
}
declare namespace FXAudio {
    class AudioSourceUnit<TCircuit extends Circuit, TSource> extends Unit<TCircuit> {
        stream: IAudioSourceController;
        constructor(circuit: TCircuit);
        init(source: TSource): IEventSource;
    }
}
declare namespace FXAudio {
    class BufferAudioSourceController implements IAudioSourceController {
        private _state;
        private _audioSourceNode;
        state: AudioSourceState;
        canStart: boolean;
        canStop: boolean;
        canRewind: boolean;
        time: number;
        constructor(audioSourceNode: AudioBufferSourceNode);
        start(when: number): void;
        stop(when: number): void;
    }
}
declare namespace FXAudio {
    class BufferSourceCircuit extends AdapterCircuit<AudioBufferSourceNode> {
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    enum AudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2,
    }
    class BufferSourceUnit extends AudioSourceUnit<BufferSourceCircuit, ArrayBuffer> {
        private _bufferState;
        private _audioSourceController;
        private _audioSourceNode;
        stream: IAudioSourceController;
        constructor(context: Context);
        init(audioData: ArrayBuffer): IEventSource;
    }
}
declare namespace FXAudio {
    class LiveInputAudioSourceController implements IAudioSourceController {
        private _state;
        state: AudioSourceState;
        canStart: boolean;
        canStop: boolean;
        canRewind: boolean;
        time: number;
        start(when: number): void;
        stop(when: number): void;
    }
}
declare namespace FXAudio {
    class LiveInputSourceCircuit extends Circuit {
        private _outputGainNode;
        private _mediStreamSourceNode;
        constructor(context: Context);
        mountStream(stream: MediaStream): void;
        private _createLiveInputSourceCircuit();
    }
}
declare namespace FXAudio {
    class LiveInputSourceUnit extends AudioSourceUnit<LiveInputSourceCircuit, MediaStream> {
        private _audioSourceController;
        stream: IAudioSourceController;
        constructor(context: Context);
        init(stream: MediaStream): IEventSource;
    }
}
declare namespace FXAudio {
    class NetworkAudioSourceController implements IAudioSourceController {
        private _state;
        private _mediaElement;
        state: AudioSourceState;
        canStart: boolean;
        canStop: boolean;
        canRewind: boolean;
        time: number;
        constructor(mediaElement: HTMLMediaElement);
        start(when: number): void;
        stop(when: number): void;
    }
}
declare namespace FXAudio {
    class NetworkSourceCircuit extends Circuit {
        private _outputGainNode;
        private _mediElementSourceNode;
        constructor(context: Context);
        mountMediaElement(mediaElement: HTMLMediaElement): void;
        private _createNetworkSourceCircuit();
    }
}
declare namespace FXAudio {
    class NetworkSourceUnit extends AudioSourceUnit<NetworkSourceCircuit, HTMLMediaElement> {
        private _audioSourceController;
        stream: IAudioSourceController;
        constructor(context: Context);
        init(mediaElement: HTMLMediaElement): IEventSource;
    }
}
declare namespace FXAudio {
    class VolumeCircuit extends AdapterCircuit<GainNode> {
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class VolumeUnit extends Unit<VolumeCircuit> {
        level: number;
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class ChannelMergerCircuit extends AdapterCircuit<ChannelMergerNode> {
        constructor(context: Context, numberOfInputs: number);
    }
}
declare namespace FXAudio {
    class ChannelMergerUnit extends Unit<ChannelMergerCircuit> {
        constructor(context: Context, numberOfInputs?: number);
    }
}
declare namespace FXAudio {
    class ChannelSplitterCircuit extends AdapterCircuit<ChannelSplitterNode> {
        constructor(context: Context, numberOfOutputs: number);
    }
}
declare namespace FXAudio {
    class ChannelSplitterUnit extends Unit<ChannelSplitterCircuit> {
        constructor(context: Context, numberOfOutputs?: number);
    }
}
declare namespace FXAudio {
    class SignalHubCircuit extends Circuit {
        constructor(context: Context, numberOfInputs: number, numberOfOutputs: number);
        private _createSignalHubCircuit(numberOfInputs, numberOfOutputs);
        private _creatComponentGroup(numberOfNodes);
    }
}
declare namespace FXAudio {
    class SignalMergerCircuit extends SignalHubCircuit {
        constructor(context: Context, numberOfInputs: number);
    }
}
declare namespace FXAudio {
    class SignalMergerUnit extends Unit<SignalMergerCircuit> {
        constructor(context: Context, numberOfInputs?: number);
    }
}
declare namespace FXAudio {
    class SignalSplitterCircuit extends SignalHubCircuit {
        constructor(context: Context, numberOfOutputs: number);
    }
}
declare namespace FXAudio {
    class SignalSplitterUnit extends Unit<SignalSplitterCircuit> {
        constructor(context: Context, numberOfOutputs?: number);
    }
}
declare namespace FXAudio {
    class DelayCircuit extends AdapterCircuit<DelayNode> {
        constructor(context: Context, maxDelayTime: number);
    }
}
declare namespace FXAudio {
    class DelayUnit extends Unit<DelayCircuit> {
        time: number;
        constructor(context: Context, maxDelayTime?: number);
    }
}
declare namespace FXAudio {
    class EchoUnit extends Unit<EchoCircuit> {
        delayTime: number;
        feedback: number;
        balance: number;
        constructor(context: Context, maxDelayTime?: number);
    }
}
declare namespace FXAudio {
    class EchoCircuit extends Circuit {
        private _inputNode;
        private _delayNode;
        private _feedbackNode;
        private _balanceNode;
        private _outputNode;
        inputNode: GainNode;
        delayNode: DelayNode;
        feedbackNode: GainNode;
        balanceNode: GainNode;
        outputNode: GainNode;
        constructor(context: Context, maxDelayTime: number);
        private _createEchoComponents(maxDelayTime);
        private _connectEchoComponents();
        private _publishEchoComponents();
    }
}
declare namespace FXAudio {
    class OverdriveCircuit extends Circuit {
        private _waveShaperNode;
        private _lowPassFilterNode;
        private _gainNode;
        private _drive;
        gainNode: GainNode;
        lowPassFilterNode: BiquadFilterNode;
        constructor(context: Context);
        getDrive(): number;
        setDrive(value: number): void;
        private _createOverdriveComponents();
        private _connectOverdriveComponents();
        private _publishOverdriveComponents();
    }
}
declare namespace FXAudio {
    class OverdriveUnit extends Unit<OverdriveCircuit> {
        level: number;
        tone: number;
        drive: number;
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class TremoloCircuit extends Circuit {
        private _depthNode;
        private _lfoNode;
        private _gainNode;
        lfoNode: OscillatorNode;
        depthNode: GainNode;
        gainNode: GainNode;
        constructor(context: Context);
        private _createTremoloComponents();
        private _connectTremoloComponents();
        private _publishTremoloComponents();
    }
}
declare namespace FXAudio {
    class TremoloUnit extends Unit<TremoloCircuit> {
        speed: number;
        depth: number;
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class ComboFilterCircuit extends Circuit {
        private _inputNode;
        private _outputNode;
        private _delayNode;
        private _feedbackNode;
        inputNode: GainNode;
        outputNode: GainNode;
        delayNode: DelayNode;
        feedbackNode: GainNode;
        constructor(context: Context);
        private _createComboFilterComponents();
        private _connectComboFilterComponents();
        private _publishComboFilterComponents();
    }
}
declare namespace FXAudio {
    class ModulatedComboFilterCircuit extends ComboFilterCircuit {
        private _depthNode;
        private _lfoNode;
        lfoNode: OscillatorNode;
        depthNode: GainNode;
        constructor(context: Context);
        private _createModulatedComboFilterComponents();
        private _connectModulatedComboFilterComponents();
    }
}
declare namespace FXAudio {
    class ChorusCircuit extends ModulatedComboFilterCircuit {
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class ChorusUnit extends Unit<ChorusCircuit> {
        rate: number;
        depth: number;
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class FlangerCircuit extends ModulatedComboFilterCircuit {
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class FlangerUnit extends Unit<FlangerCircuit> {
        speed: number;
        delayTime: number;
        depth: number;
        feedback: number;
        constructor(context: Context);
    }
}
declare namespace FXAudio {
    class ReverbCircuit extends Circuit {
        private _convolverNode;
        private _gainNode;
        private _time;
        private _decay;
        gainNode: GainNode;
        constructor(context: Context);
        getTime(): number;
        setTime(value: number): void;
        getDecay(): number;
        setDecay(value: number): void;
        private _createReverbComponents();
        private _connectReverbComponents();
        private _publishReverbComponents();
        private _buildImpulseResponse();
    }
}
declare namespace FXAudio {
    class ReverbUnit extends Unit<ReverbCircuit> {
        time: number;
        decay: number;
        level: number;
        constructor(context: Context);
    }
}
