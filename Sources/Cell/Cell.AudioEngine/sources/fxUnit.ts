/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnit {

        private _unitContext: FxUnitContext;

        private _unitInterface: FxUnitInterface;

        private _audioGraph: AudioNode[];


        public get unitContext(): FxUnitContext {
            return this._unitContext;
        }

        public get ports(): FxUnitInterface {
            return this._unitInterface;
        }


        constructor(
            unitContext: FxUnitContext,
            audioGraph: AudioNode[],
            unitInterface?: FxUnitInterface,
            autoRoute: boolean = true) {
                this._unitContext = unitContext;
                this._setAudioNodeInternals(audioGraph, unitInterface, autoRoute);
        }


        private _setAudioNodeInternals(audioGraph: AudioNode[], unitInterface?: FxUnitInterface, autoRoute: boolean = true) {
            if (autoRoute) {
                FxAudioUtilities.WebAudioAPI.routeAudioGraph(audioGraph);
            }

            if (!unitInterface) {
                unitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);
            }

            this._audioGraph = audioGraph;
            this._unitInterface = unitInterface;
        }
    }
}
