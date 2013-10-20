/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    class WebAudioAPIUtilities {

        public routeLinear(chainOfNodes: AudioNode[]): void;

        public routeLinear(...args: AudioNode[]): void;

        public routeLinear(...args: any[]): void {
            var chainOfNodes = (args[0] instanceof Array)
                ? args[0]
                : args;

            for (var i = 0; i <= chainOfNodes.length - 2; i++) {
                var audioNode = chainOfNodes[i];
                var nextAudioNode = chainOfNodes[i + 1];

                audioNode.connect(nextAudioNode);
            }
        }


        public routeCross(a: AudioNode[], b: AudioNode[]): void {
            Contract.isNotNullOrUndefined(a, 'a');
            Contract.isNotNullOrUndefined(b, 'b');

            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < b.length; j++) {
                    a[i].connect(b[j]);
                }
            }
        }

        public routeWithFeedback(a: AudioNode, b: AudioNode): void {
            a.connect(b);
            b.connect(a);
        }

        public createNode(audioContext: AudioContext, nodeType: NodeType, ...args: any[]): AudioNode {
            Contract.isNotNullOrUndefined(audioContext, 'audioContext');

            var factoryMethod: (...args: any[]) => AudioNode;

            switch (nodeType) {
                case NodeType.ANALYSER: factoryMethod = audioContext.createAnalyser; break;
                case NodeType.BIQUAD_FILTER: factoryMethod = audioContext.createBiquadFilter; break;
                case NodeType.BUFFER_SOURCE: factoryMethod = audioContext.createBufferSource; break;
                case NodeType.CHANNEL_MERGER: factoryMethod = audioContext.createChannelMerger; break;
                case NodeType.CHANNEL_SPLITTER: factoryMethod = audioContext.createChannelSplitter; break;
                case NodeType.CONVOLVER: factoryMethod = audioContext.createConvolver; break;
                case NodeType.DELAY: factoryMethod = audioContext.createDelay; break;
                case NodeType.DESTINATION: factoryMethod = function () { return audioContext.destination; }; break;
                case NodeType.DYNAMICS_COMPRESSOR: factoryMethod = audioContext.createDynamicsCompressor; break;
                case NodeType.GAIN: factoryMethod = audioContext.createGain; break;
                case NodeType.MEDIA_ELEMENT_SOURCE: factoryMethod = audioContext.createMediaElementSource; break;
                case NodeType.MEDIA_STREAM_DESTINATION: factoryMethod = (<any>audioContext).createMediaStreamDestination; break;
                case NodeType.MEDIA_STREAM_SOURCE: factoryMethod = audioContext.createMediaStreamSource; break;
                case NodeType.OSCILLATOR: factoryMethod = audioContext.createOscillator; break;
                case NodeType.PANNER: factoryMethod = audioContext.createPanner; break;
                case NodeType.SCRIPT_PROCESSOR: factoryMethod = audioContext.createPanner; break;
                case NodeType.WAVE_SHAPER: factoryMethod = audioContext.createWaveShaper; break;
            }


            var audioNode = factoryMethod.apply(audioContext, args);

            return audioNode;
        }
    }


    class UnitInterfaceUtilities {

        public createPortsFromAudioNode(audioNode: AudioNode, direction: UnitPortDirection, ports: UnitPort[]): void {
            Contract.isNotNullOrUndefined(audioNode, 'audioNode');
            Contract.isNotNullOrUndefined(ports, 'ports');

            var numberOfPorts: number;

            switch (direction) {
                case UnitPortDirection.INPUT:
                    numberOfPorts = audioNode.numberOfInputs;
                    break;

                case UnitPortDirection.OUTPUT:
                    numberOfPorts = audioNode.numberOfOutputs;
                    break;

                default:
                    numberOfPorts = 0;
                    break;
            }


            for (var portIndex = 0; portIndex < numberOfPorts; portIndex++) {
                var port = new UnitPort(audioNode, portIndex, direction);
                ports.push(port);
            }
        }

        public createPortsFromAudioNodes(audioNodes: AudioNode[], direction: UnitPortDirection, ports: UnitPort[]): void {
            Contract.isNotNullOrUndefined(audioNodes, 'audioNodes');
            Contract.isNotNullOrUndefined(ports, 'ports');

            for (var i = 0; i < audioNodes.length; i++) {
                var audioNode: AudioNode = audioNodes[i];
                this.createPortsFromAudioNode(audioNode, direction, ports);
            }
        }
    }


    export class AudioUtilities {

        public static WebAudioAPI = new WebAudioAPIUtilities();

        public static AudioInterface = new UnitInterfaceUtilities();
    }
}
