/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class LoadUnitMetadataState extends LoadAbstractResourceState {

        constructor(testRunner: TestRunner) {
            super(testRunner, 'unitMetadataFileUrl', 'unitMetadata', ResourceType.JSON);
        }
    }
}
