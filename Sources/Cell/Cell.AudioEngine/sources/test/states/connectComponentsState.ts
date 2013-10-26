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

            for (var componentId in connectionDeclarations) {
                if (!connectionDeclarations.hasOwnProperty(componentId)) {
                    continue;
                }

                var connectionDeclaration: Array = connectionDeclarations[componentId];
                var sourceComponent = components[componentId];

                connectionDeclaration.forEach((targetComponentId: string) => {
                    var targetComponent = components[targetComponentId];
                    sourceComponent.ports.outputs[0].connect(targetComponent.ports.inputs[0]);
                });
            }

            this.complete();
        }
    }
}
