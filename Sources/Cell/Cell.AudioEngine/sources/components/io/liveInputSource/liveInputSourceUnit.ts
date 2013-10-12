/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class LiveInputSourceUnit extends AudioSourceUnit<LiveInputSourceCircuit, MediaStream> {

        private _audioSourceController: IAudioSourceController;


        public get stream(): IAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: Context) {
            super(new LiveInputSourceCircuit(context));
            
            this._audioSourceController = new LiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IEventSource {
            var asyncCompletionSource = new EventSource();

            try {
                this.circuit.mountStream(stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }

            return asyncCompletionSource;
        }
    }
}
