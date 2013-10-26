/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class LoadTestConfigurationState extends LoadAbstractResourceState {

        constructor(testRunner: ITestRunner) {
            super(testRunner, 'configurationFileUrl', 'configuration', ResourceType.JSON);
        }
    }
}
