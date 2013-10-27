/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class SetComponentsDefaultsState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            var components = environment.configuration.components;

            Object.keys(components).forEach(componentId => {
                var component = environment.components[componentId];
                var componentType = environment.configuration.components[componentId].type;
                var componentMetadata = environment.unitMetadata[componentType];

                if (!componentMetadata) {
                    return;
                }

                Object.keys(componentMetadata.properties).forEach(propertyName => {
                    var property = componentMetadata.properties[propertyName];

                    if ('value' in property) {
                        component[propertyName] = property.value;
                    }
                });
            });

            this.complete();
        }
    }
}
