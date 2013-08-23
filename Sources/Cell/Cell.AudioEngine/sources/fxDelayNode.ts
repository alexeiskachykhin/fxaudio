/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxAudioNode.ts" />
/// <reference path="fxAudioPort.ts" />
/// <reference path="fxAudioEngine.ts" />
/// <reference path="fxAudioUtilities.ts" />


module FxAudioEngine {
    'use strict';


    export class FxDelayNode extends FxAudioNode {

        private _delayNode: DelayNode;


        public get time(): number {
            return this._delayNode.delayTime.value;
        }

        public set time(value: number) {
            this._delayNode.delayTime.value = value;
        }


        public _buildAudioGraph(): AudioNode[] {
            var audioNode: DelayNode = FxAudioEngine.context.createDelay();
            var audioGraph: AudioNode[] = [audioNode];

            this._delayNode = audioNode;

            return audioGraph;
        }

        public _buildAudioInterface(): FxAudioNodeInterface {
            var input = new FxAudioPort(this._delayNode, FxAudioPortDirection.INPUT);
            var output = new FxAudioPort(this._delayNode, FxAudioPortDirection.OUTPUT);

            var audioInterface = new FxAudioNodeInterface(
                [input],
                [output]); 

            return audioInterface;
        }
    }
}