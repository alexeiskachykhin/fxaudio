/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxUnitInterface.ts" />


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

        public fromAudioGraph(audioGraph: AudioNode[]): FxUnitInterface {
            if (audioGraph == null) {
                throw new TypeError('Invalid audio graph.');
            }

            var inputNode = audioGraph[0];
            var outputNode = audioGraph[audioGraph.length - 1];

            var input = new FxUnitPort(inputNode, FxUnitPortDirection.INPUT);
            var output = new FxUnitPort(outputNode, FxUnitPortDirection.OUTPUT);


            var audioInterface = new FxUnitInterface(input, output);

            return audioInterface;
        }
       
    }



    export class FxAudioUtilities {

        public static WebAudioAPI = new WebAudioAPIUtilities();

        public static AudioInterface = new FxUnitInterfaceUtilities();
    }
}
