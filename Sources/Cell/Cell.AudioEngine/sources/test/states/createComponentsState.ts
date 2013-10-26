/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class CreateComponentsState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            var componentDeclarations = this._testRunner.environment.configuration.components;
            var componentContext = this._testRunner.environment.context;

            for (var componentId in componentDeclarations) {
                if (!componentDeclarations.hasOwnProperty(componentId)) {
                    continue;
                }

                var componentDeclaration = componentDeclarations[componentId];
                var componentConstructor = this._resolveObject(componentDeclaration.type);

                var component = new componentConstructor(componentContext);

                this._testRunner.environment.components[componentId] = component;
            }

            this._testRunner.executeNext();
        }


        private _resolveObject<T>(objectPath: string): T {
            var pathPieces = objectPath.split('.');
            var currentObject = window;

            for (var i = 0; i < pathPieces.length; i++) {
                currentObject = currentObject[pathPieces[i]];
            }

            return <T><any>currentObject;
        }
    }
}
