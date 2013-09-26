/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    class WebAudioAPIUtilities {

        public routeAudioGraph(audioGraph: AudioNode[]): void {
            for (var i = 0; i <= audioGraph.length - 2; i++) {
                var audioNode = audioGraph[i];
                var nextAudioNode = audioGraph[i + 1];

                audioNode.connect(nextAudioNode);
            }
        }

        public createNode(audioContext: AudioContext, nodeType: NodeType, ...args: any[]): AudioNode {
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


    class FxUnitInterfaceUtilities {

        public createPortsFromAudioNode(audioNode: AudioNode, direction: FxUnitPortDirection, ports: FxUnitPort[]): void {
            var numberOfPorts: number;

            switch (direction) {
                case FxUnitPortDirection.INPUT:
                    numberOfPorts = audioNode.numberOfInputs;
                    break;

                case FxUnitPortDirection.OUTPUT:
                    numberOfPorts = audioNode.numberOfOutputs;
                    break;

                default:
                    numberOfPorts = 0;
                    break;
            }


            for (var portIndex = 0; portIndex < numberOfPorts; portIndex++) {
                var port = new FxUnitPort(audioNode, portIndex, direction);
                ports.push(port);
            }
        }
    }


    export class FxAudioUtilities {

        public static WebAudioAPI = new WebAudioAPIUtilities();

        public static AudioInterface = new FxUnitInterfaceUtilities();
    }
}
