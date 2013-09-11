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


    class FxAudioNodeInterfaceUtilities {

        public fromAudioGraph(audioGraph: AudioNode[]): FxAudioNodeInterface {
            if (audioGraph == null) {
                throw new TypeError('Invalid audio graph.');
            }

            var inputNode = audioGraph[0];
            var outputNode = audioGraph[audioGraph.length - 1];

            var input = new FxAudioPort(inputNode, FxAudioPortDirection.INPUT);
            var output = new FxAudioPort(outputNode, FxAudioPortDirection.OUTPUT);


            var audioInterface = new FxAudioNodeInterface(input, output);

            return audioInterface;
        }
       
    }



    export class FxAudioUtilities {

        public static WebAudioAPI = new WebAudioAPIUtilities();

        public static AudioInterface = new FxAudioNodeInterfaceUtilities();
    }
}
