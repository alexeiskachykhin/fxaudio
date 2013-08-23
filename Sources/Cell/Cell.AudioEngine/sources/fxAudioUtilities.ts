/// <reference path="../libraries/waa.d.ts" />


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

    export class FxAudioUtilities {
        public static WebAudioAPI = new WebAudioAPIUtilities();
    }
}