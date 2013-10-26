/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class StartStreamingState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            var components = this._testRunner.environment.components;

            for (var componentId in components) {
                if (!components.hasOwnProperty(componentId)) {
                    continue;
                }

                var component = components[componentId];

                if (component instanceof BufferSourceUnit) {
                    var bufferSourceUnit = <BufferSourceUnit>component;
                    var audioData = this._testRunner.environment.audioData;

                    var initOperation = bufferSourceUnit.init(audioData);

                    initOperation.addEventListener('success', () => {
                        bufferSourceUnit.stream.start(0);
                        this._testRunner.executeNext();
                    });
                }
            }
        }
    }
}
