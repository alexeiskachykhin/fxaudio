/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
	'use strict';


    export class FxAudioSourceUnit<TBuilder extends IFxUnitBuilder, TSource> extends FxUnit<TBuilder> {

        public stream: IFxAudioSourceController;


        constructor(unitContext: FxUnitContext, builder: TBuilder) {
            super(unitContext, builder);
        }


        public init(source: TSource): IFxEventSource { return null; }
    }
}
