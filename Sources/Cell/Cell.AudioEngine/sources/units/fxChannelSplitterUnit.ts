/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxChannelSplitterUnit extends FxUnit<FxChannelSplitterUnitBuilder> {

        constructor(unitContext: FxUnitContext, numberOfOutputs: number = 6) {
            super(unitContext, new FxChannelSplitterUnitBuilder(numberOfOutputs));
        }
    }


    export class FxChannelSplitterUnitBuilder implements IFxUnitBuilder {

        private _numberOfOutputs: number;


        constructor(numberOfOutputs: number) {
            this._numberOfOutputs = numberOfOutputs;
        }


        public buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioNode: AudioNode = unitContext.audioContext.createChannelSplitter(this._numberOfOutputs);
            var audioGraph: AudioNode[] = [audioNode];

            return audioGraph;
        }

        public buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var audioInterface: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return audioInterface;
        }
    }
}
