/// <reference path="../../_references.ts" />


module FxAudioEngine.Nodes.Source {
	'use strict';


    export class FxAudioSourceNode<TSource> extends FxAudioNode {

        public stream: IFxAudioSourceController;


        public init(source: TSource): IFxAudioEventSource { return; }
    }
}
