/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class ConnectComponentsState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            var components = environment.components;
            var connectionDeclarations = environment.configuration.connections;

            Object.keys(connectionDeclarations).forEach(componentId => {
                var connectionDeclaration: Array = connectionDeclarations[componentId];
                var sourceComponent = components[componentId];

                connectionDeclaration.forEach(destinationComponentId => {
                    var destinationComponent = components[destinationComponentId];
                    this._connectComponents(sourceComponent, destinationComponent);
                });
            });

            this.complete();
        }


        private _connectComponents(source: Unit<Circuit>, destination: Unit<Circuit>): void {
            source.ports.outputs[0].connect(destination.ports.inputs[0]);
        }
    }
}
