/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class ConnectComponentsState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            var components = this._testRunner.environment.components;
            var connectionDeclarations = this._testRunner.environment.configuration.connections;

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

            this._testRunner.executeNext();
        }
    }
}
