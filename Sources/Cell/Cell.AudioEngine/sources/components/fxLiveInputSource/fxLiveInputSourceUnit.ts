/// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxLiveInputSourceUnit extends FxAudioSourceUnit<FxLiveInputSourceCircuit, MediaStream> {

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: FxContext) {
            super(new FxLiveInputSourceCircuit(context));
            
            this._audioSourceController = new FxLiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IFxEventSource {
            var asyncCompletionSource = new FxEventSource();

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
