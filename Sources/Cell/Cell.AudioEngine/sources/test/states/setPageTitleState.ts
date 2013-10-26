/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class SetPageTitleState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            document.title = environment.configuration.title;
            this.complete();
        }
    }
}
