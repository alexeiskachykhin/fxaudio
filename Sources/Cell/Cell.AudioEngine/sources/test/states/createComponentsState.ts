/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class CreateComponentsState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            var componentDeclarations = environment.configuration.components;
            var componentContext = environment.context;

            for (var componentId in componentDeclarations) {
                if (!componentDeclarations.hasOwnProperty(componentId)) {
                    continue;
                }

                var componentDeclaration = componentDeclarations[componentId];
                var componentConstructor = this._resolveObject(componentDeclaration.type);

                var component = new componentConstructor(componentContext);

                environment.components[componentId] = component;
            }

            this.complete();
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
