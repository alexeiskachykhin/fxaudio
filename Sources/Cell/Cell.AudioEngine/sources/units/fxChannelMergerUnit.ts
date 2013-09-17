/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxChannelMergerUnit extends FxUnit<FxChannelMergerUnitBuilder> {

        constructor(unitContext: FxUnitContext, numberOfInputs: number = 6) {
            super(unitContext, new FxChannelMergerUnitBuilder(numberOfInputs));
        }
    }


    export class FxChannelMergerUnitBuilder implements IFxUnitBuilder {

        private _numberOfInputs: number;


        constructor(numberOfInputs: number) {
            this._numberOfInputs = numberOfInputs;
        }


        public buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioNode: AudioNode = unitContext.audioContext.createChannelMerger(this._numberOfInputs);
            var audioGraph: AudioNode[] = [audioNode];

            return audioGraph;
        }

        public buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var audioInterface: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return audioInterface;
        }
    }
}
