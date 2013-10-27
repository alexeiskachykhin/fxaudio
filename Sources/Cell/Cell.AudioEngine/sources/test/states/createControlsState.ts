/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export class CreateControlsState extends TestExecutionState {

        constructor(testRunner: TestRunner) {
            super(testRunner);
        }


        public execute(environment: TestEnvironment): void {
            var container = document.getElementsByTagName('main')[0];

            Object.keys(environment.components).forEach(componentId => {
                var controls = this._createControlsForComponent(environment, componentId);

                if (controls) {
                    container.appendChild(controls);
                }
            });

            this.complete();
        }


        private _createControlsForComponent(environment: TestEnvironment, componentId: string): HTMLElement {
            var component = environment.components[componentId];
            var componentType = environment.configuration.components[componentId].type;

            var componentMetadata = environment.unitMetadata[componentType];

            if (!componentMetadata) {
                return;
            }


            //
            var controlsContainer: HTMLElement = document.createElement('fieldset');
            var controlsContainerTitle: HTMLElement = document.createElement('legend');
            controlsContainerTitle.textContent = componentId + '(' + componentMetadata.title + ')';
            controlsContainer.appendChild(controlsContainerTitle);
            //


            Object.keys(componentMetadata.properties).forEach(propertyName => {
                var property = componentMetadata.properties[propertyName];

                var titleElement = document.createTextNode(propertyName + ': ');
                controlsContainer.appendChild(titleElement);

                var inputElement = this._createInputElement(property);
                this._observeProperty(component, propertyName, inputElement);
                controlsContainer.appendChild(inputElement);

                var brElement = document.createElement('br');
                controlsContainer.appendChild(brElement);
            });

            return controlsContainer;
        }

        private _createInputElement(property: any): HTMLInputElement {
            var inputElement = document.createElement('input');
            inputElement.setAttribute('type', property.type);
            inputElement.setAttribute('min', property.min);
            inputElement.setAttribute('max', property.max);
            inputElement.setAttribute('step', property.step);

            return inputElement;
        }

        private _observeProperty(component: Unit<Circuit>, propertyName: string, control: HTMLInputElement): void {
            control.addEventListener('change', function () {
                component[propertyName] = Number(this.value);
            });

            control.value = component[propertyName];
        }
    }
}
