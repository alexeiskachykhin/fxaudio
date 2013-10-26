/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class CreateContextState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            this._testRunner.environment.context = new RealTimeContext();
            this._testRunner.executeNext();
        }
    }
}
