/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxLinearInterfaceUnitBuilder implements IFxUnitBuilder {

        public buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            throw new Error('This method is abstract.');
        }

        public buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var audioInterface: FxUnitInterface =
                FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return audioInterface;
        }
    }
}
