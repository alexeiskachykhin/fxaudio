/// <reference path="../_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export enum ResourceType {
        JSON,
        ARRAY_BUFFER
    }


    export class LoadAbstractResourceState extends TestExecutionState {
        
        private _resourceUrlProperty: string;

        private _resourceProperty: string;

        private _resourceType: ResourceType;

        private _environment: TestEnvironment;


        constructor(testRunner: TestRunner, resourceUrlProperty: string, resourceProperty: string, resourceType: ResourceType) {
            super(testRunner);

            this._resourceUrlProperty = resourceUrlProperty;
            this._resourceProperty = resourceProperty;
            this._resourceType = resourceType;
        }


        public execute(environment: TestEnvironment): void {
            var resourceUrl = environment[this._resourceUrlProperty];

            this._loadResource(resourceUrl, response => {
                var resource = this._deserializeResponse(response);
                environment[this._resourceProperty] = resource;
            });
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

        private _loadResource(resourceUrl: string, callback: (response) => void) {
            var request = new XMLHttpRequest();

            request.open('GET', resourceUrl, true);
            request.responseType = this._getResponseType();

            request.addEventListener('load', () => {
                callback(request.response);
                this.complete();
            });

            request.send();
        }
    }
}
