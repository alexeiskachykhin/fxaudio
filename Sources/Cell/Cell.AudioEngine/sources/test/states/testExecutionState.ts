/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class TestExecutionState {

        private _testRunner: TestRunner;


        public get testRunner(): TestRunner {
            return this._testRunner;
        }


        constructor(testRunner: TestRunner) {
            this._testRunner = testRunner;
        }


        public execute(environment: TestEnvironment): void {
            this.complete();
        }

        public complete(): void {
            this._testRunner.executeNext();
        }
    }
}
