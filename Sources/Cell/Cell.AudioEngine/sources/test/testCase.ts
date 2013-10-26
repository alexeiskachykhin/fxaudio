/// <reference path="_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class TestCase {

        static run(testCaseName: string) {
            var testRunner = new TestRunner(testCaseName);
            testRunner.execute();
        }
    }
}
