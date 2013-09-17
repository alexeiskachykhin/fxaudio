/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';

    
    export interface IFxUnitBuilder {

        buildAudioGraph(unitContext: FxUnitContext): AudioNode[];

        buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface;
    }
}
