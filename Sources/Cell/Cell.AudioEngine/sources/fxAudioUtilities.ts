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
    }


    class FxUnitInterfaceUtilities {

        private _createPortsFromAudioNode(audioNode: AudioNode, direction: FxUnitPortDirection): FxUnitPort[] {
            var numberOfPorts;
            
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


            var ports: FxUnitPort[] = [];

            for (var portIndex = 0; portIndex < numberOfPorts; portIndex++) {
                var port = new FxUnitPort(audioNode, portIndex, direction);
                ports.push(port);
            }

            return ports;
        }


        public fromAudioGraph(audioGraph: AudioNode[]): FxUnitInterface {
            if (!audioGraph) {
                throw new TypeError('Invalid audio graph.');
            }

            var inputNode = audioGraph[0];
            var outputNode = audioGraph[audioGraph.length - 1];

            var inputs: FxUnitPort[] = this._createPortsFromAudioNode(inputNode, FxUnitPortDirection.INPUT);
            var outputs: FxUnitPort[] = this._createPortsFromAudioNode(outputNode, FxUnitPortDirection.OUTPUT);


            var audioInterface = new FxUnitInterface(inputs, outputs);

            return audioInterface;
        }
    }



    export class FxAudioUtilities {

        public static WebAudioAPI = new WebAudioAPIUtilities();

        public static AudioInterface = new FxUnitInterfaceUtilities();
    }
}
