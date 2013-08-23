/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxAudioPort.ts" />
/// <reference path="fxAudioNodeInterface.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioNode {

        private _audioInterface: FxAudioNodeInterface;


        constructor() {
            this._ensureAudioGraph();
        }


        public _buildAudioGraph(): AudioNode[] {
            return [];
        }

        public _buildAudioInterface(audioGraph: AudioNode[]): FxAudioNodeInterface {
            return null;
        }


        private _ensureAudioGraph(): void {
            if (!this._audioInterface) {
                var audioGraph = this._buildAudioGraph();
                var audioInterface = this._buildAudioInterface(audioGraph);

                FxAudioUtilities.WebAudioAPI.routeAudioGraph(audioGraph);

                this._audioInterface = audioInterface;
            }
        }
    }
}