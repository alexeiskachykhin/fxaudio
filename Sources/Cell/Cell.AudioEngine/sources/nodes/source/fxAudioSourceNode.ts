/// <reference path="../../fxAudioNode.ts" />
/// <reference path="../../fxAudioEventSource.ts" />
/// <reference path="fxAudioSourceController.ts" />


module FxAudioEngine.Nodes.Source {
	'use strict';


    export class FxAudioSourceNode<TSource> extends FxAudioNode {

        public stream: IFxAudioSourceController;


        public init(source: TSource): IFxAudioEventSource { return; }
    }
}