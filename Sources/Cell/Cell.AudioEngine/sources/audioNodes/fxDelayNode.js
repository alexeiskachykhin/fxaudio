/// <reference path="../../libraries/waa.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../fxAudioNode.ts" />
/// <reference path="../fxAudioPort.ts" />
/// <reference path="../fxAudioEngine.ts" />
/// <reference path="../fxAudioUtilities.ts" />
var FxAudioEngine;
(function (FxAudioEngine) {
    'use strict';

    var FxDelayNode = (function (_super) {
        __extends(FxDelayNode, _super);
        function FxDelayNode() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(FxDelayNode.prototype, "time", {
            get: function () {
                return this._delayNode.delayTime.value;
            },
            set: function (value) {
                this._delayNode.delayTime.value = value;
            },
            enumerable: true,
            configurable: true
        });


        FxDelayNode.prototype._buildAudioGraph = function () {
            var audioNode = FxAudioEngine.context.createDelay();
            var audioGraph = [audioNode];

            this._delayNode = audioNode;

            return audioGraph;
        };

        FxDelayNode.prototype._buildAudioInterface = function () {
            var input = new FxAudioEngine.FxAudioPort(this._delayNode, FxAudioEngine.FxAudioPortDirection.INPUT);
            var output = new FxAudioEngine.FxAudioPort(this._delayNode, FxAudioEngine.FxAudioPortDirection.OUTPUT);

            var audioInterface = new FxAudioEngine.FxAudioNodeInterface([input], [output]);

            return audioInterface;
        };
        return FxDelayNode;
    })(FxAudioEngine.FxAudioNode);
    FxAudioEngine.FxDelayNode = FxDelayNode;
})(FxAudioEngine || (FxAudioEngine = {}));
//# sourceMappingURL=fxDelayNode.js.map
