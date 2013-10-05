/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxNetworkSourceUnit extends FxAudioSourceUnit<FxNetworkSourceCircuit, HTMLMediaElement> {

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor (context: FxContext) {
            super(new FxNetworkSourceCircuit(context));
        }


        public init(mediaElement: HTMLMediaElement): IFxEventSource {
            var asyncCompletionSource = new FxEventSource();

            try {
                this.circuit.mountMediaElement(mediaElement);
                this._audioSourceController = new FxNetworkAudioSourceController(mediaElement);

                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }

            return asyncCompletionSource;
        }
    }
}
