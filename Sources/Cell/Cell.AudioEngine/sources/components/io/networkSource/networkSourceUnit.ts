/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class NetworkSourceUnit extends AudioSourceUnit<NetworkSourceCircuit, HTMLMediaElement> {

        private _audioSourceController: IAudioSourceController;


        public get stream(): IAudioSourceController {
            return this._audioSourceController;
        }


        constructor (context: Context) {
            super(new NetworkSourceCircuit(context));
        }


        public init(mediaElement: HTMLMediaElement): IEventSource {
            var asyncCompletionSource = new EventSource();

            try {
                this.circuit.mountMediaElement(mediaElement);
                this._audioSourceController = new NetworkAudioSourceController(mediaElement);

                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }

            return asyncCompletionSource;
        }
    }
}
