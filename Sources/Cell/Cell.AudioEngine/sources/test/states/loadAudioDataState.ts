/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class LoadAudioDataState extends LoadAbstractResourceState {

        constructor(testRunner: TestRunner) {
            super(testRunner, 'audioDataFileUrl', 'audioData', ResourceType.ARRAY_BUFFER);
        }
    }
}
