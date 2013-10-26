/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class StartStreamingState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            var audioData = environment.audioData;
            var components = environment.components;

            // FIXME: Make it work with multiple units.

            this._enumerateBufferSourceUnits(components, component => {
                var initOperation = component.init(audioData);

                initOperation.addEventListener('success', () => {
                    component.stream.start(0);
                    this.complete();
                });
            });
        }


        private _enumerateBufferSourceUnits(components: any, callback: (component: BufferSourceUnit) => void) {
            Object.keys(components).forEach(componentId => {
                var component = components[componentId];

                if (component instanceof BufferSourceUnit) {
                    callback(component);
                }
            });
        }
    }
}
