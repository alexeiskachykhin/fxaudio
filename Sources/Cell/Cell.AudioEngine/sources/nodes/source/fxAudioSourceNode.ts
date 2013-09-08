/// <reference path="../../fxAudioNode.ts" />
/// <reference path="fxAudioSourceController.ts" />


module FxAudioEngine.Nodes.Source {
	'use strict';


    export class FxAudioSourceNode extends FxAudioNode {

        public stream: IFxAudioSourceController;
    }
}