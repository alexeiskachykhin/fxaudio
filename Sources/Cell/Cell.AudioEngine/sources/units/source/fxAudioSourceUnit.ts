/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
	'use strict';


    export class FxAudioSourceUnit<TSource, TBuilder extends IFxUnitBuilder> extends FxUnit<TBuilder> {

        public stream: IFxAudioSourceController;


        public init(source: TSource): IFxEventSource { return null; }
    }
}
