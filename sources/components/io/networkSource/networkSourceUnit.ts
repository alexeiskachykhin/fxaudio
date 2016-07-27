/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class NetworkSourceUnit extends AudioSourceUnit<NetworkSourceCircuit, HTMLMediaElement> {

        private _audioSourceController: IAudioSourceController;


        public get stream(): IAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new NetworkSourceCircuit(context));
        }


        public init(mediaElement: HTMLMediaElement): IEventSource {
            Contract.isNotNullOrUndefined(mediaElement, 'mediaElement');

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
