/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export enum ResourceType {
        JSON,
        ARRAY_BUFFER
    }


    export class LoadAbstractResourceState implements ITestRunnerState {
        
        private _testRunner: ITestRunner;

        private _resourceUrlProperty: string;

        private _resourceProperty: string;

        private _resourceType: ResourceType;


        constructor(testRunner: ITestRunner, resourceUrlProperty: string, resourceProperty: string, resourceType: ResourceType) {
            this._testRunner = testRunner;
            this._resourceUrlProperty = resourceUrlProperty;
            this._resourceProperty = resourceProperty;
            this._resourceType = resourceType;
        }


        public execute(): void {
            this._loadResource(response => {
                var resource = this._deserializeResponse(response);
                this._setResource(resource); 
            });
        }


        private _getResourceUrl(): string {
            return this._testRunner.environment[this._resourceUrlProperty];
        }

        private _getResponseType(): string {
            switch(this._resourceType) {
                case ResourceType.JSON: return 'text';
                case ResourceType.ARRAY_BUFFER: return 'arraybuffer';
            }

            return 'text';
        }

        private _deserializeResponse<T>(response: any): T {
            var deserializedResponse;

            switch (this._resourceType) {
                case ResourceType.JSON:
                    deserializedResponse = JSON.parse(response);
                    break;

                case ResourceType.ARRAY_BUFFER:
                    deserializedResponse = response;
                    break;
            }

            return <T>deserializedResponse;
        }

        private _setResource(resource: any): void {
            this._testRunner.environment[this._resourceProperty] = resource;
        }

        private _loadResource(callback: (response) => void) {
            var resourceUrl: string = this._getResourceUrl();
            var request = new XMLHttpRequest();

            request.open('GET', resourceUrl, true);
            request.responseType = this._getResponseType();

            request.addEventListener('load', () => {
                callback(request.response);
                this._testRunner.executeNext();
            });

            request.send();
        }
    }
}
