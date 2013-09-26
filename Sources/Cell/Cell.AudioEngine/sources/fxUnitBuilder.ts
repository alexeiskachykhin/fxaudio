/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';

    
    export interface IFxUnitBuilder {

        buildAudioCircuit(unitContext: FxUnitContext): FxAudioCircuit;
    }
}
