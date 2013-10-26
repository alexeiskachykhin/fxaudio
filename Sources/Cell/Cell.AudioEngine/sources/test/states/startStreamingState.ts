/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class StartStreamingState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            var components = environment.components;

            for (var componentId in components) {
                if (!components.hasOwnProperty(componentId)) {
                    continue;
                }

                var component = components[componentId];

                if (component instanceof BufferSourceUnit) {
                    var bufferSourceUnit = <BufferSourceUnit>component;
                    var audioData = environment.audioData;

                    var initOperation = bufferSourceUnit.init(audioData);

                    initOperation.addEventListener('success', () => {
                        bufferSourceUnit.stream.start(0);
                        this.complete();
                    });
                }
            }
        }
    }
}
