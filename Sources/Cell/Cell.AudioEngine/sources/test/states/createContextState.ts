/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class CreateContextState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            environment.context = new RealTimeContext();
            this.complete();
        }
    }
}
