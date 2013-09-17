/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxDelayUnit extends FxUnit<FxDelayUnitBuilder> {

        public get time(): number {
            return this.builder.delayNode.delayTime.value;
        }

        public set time(value: number) {
            this.builder.delayNode.delayTime.value = value;
        }


        constructor(context: FxUnitContext, maxDelayTime: number = 3.0) {
            super(context, new FxDelayUnitBuilder(maxDelayTime));
        }
    }


    export class FxDelayUnitBuilder implements IFxUnitBuilder {

        private _maxDelayTime: number;

        private _delayNode: DelayNode;

        
        public get delayNode(): DelayNode {
            return this._delayNode;
        }


        constructor(maxDelayTime: number) {
            this._maxDelayTime = maxDelayTime;
        }


        public buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioNode: DelayNode = unitContext.audioContext.createDelay(this._maxDelayTime);
            var audioGraph: AudioNode[] = [audioNode];

            this._delayNode = audioNode;

            return audioGraph;
        }

        public buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var audioInterface: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return audioInterface;
        }
    }
}
