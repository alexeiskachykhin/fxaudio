/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxDelayUnit extends FxUnit<FxDelayUnitBuilder> {

        public get time(): number {
            return this.builder.audioNode.delayTime.value;
        }

        public set time(value: number) {
            this.builder.audioNode.delayTime.value = value;
        }


        constructor(context: FxUnitContext, maxDelayTime: number = 3.0) {
            super(context, new FxDelayUnitBuilder(maxDelayTime));
        }
    }


    export class FxDelayUnitBuilder extends FxAdapterUnitBuilder<DelayNode> {

        constructor(maxDelayTime: number) {
            super(NodeType.DELAY, maxDelayTime);
        }
    }
}
