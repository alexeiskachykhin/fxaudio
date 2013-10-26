/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class SetPageTitleState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            document.title = this._testRunner.environment.configuration.title;

            this._testRunner.executeNext();
        }
    }
}
