/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    interface ComponentDeclarationEnumerationCallback {
        (componentId: string, componentDeclaration: any): void
    }


    export class CreateComponentsState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            var componentDeclarations = environment.configuration.components;
            var componentContext = environment.context;

            environment.components = this._createComponentsFromComponentDeclarations(componentDeclarations, componentContext);

            this.complete();
        }


        private _createComponentFromComponentDeclaration(componentDeclaration: any, context: Context) {
            var componentConstructor = this._resolveObject(componentDeclaration.type);
            var component = new componentConstructor(context);

            return component;
        }

        private _createComponentsFromComponentDeclarations(componentDeclarations: any, context: Context) {
            var components = {};

            Object.keys(componentDeclarations).forEach(componentId => {
                var componentDeclaration = componentDeclarations[componentId];
                var component = this._createComponentFromComponentDeclaration(componentDeclaration, context);

                components[componentId] = component;
            });

            return components;
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
