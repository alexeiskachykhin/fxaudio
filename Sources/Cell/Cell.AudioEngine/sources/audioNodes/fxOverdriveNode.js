/// <reference path="../../libraries/waa.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../fxAudioPort.ts" />
/// <reference path="../fxAudioNode.ts" />
/// <reference path="../fxAudioEngine.ts" />
/// <reference path="../fxAudioUtilities.ts" />
var FxAudioEngine;
(function (FxAudioEngine) {
    'use strict';

    var FxOverdriveNode = (function (_super) {
        __extends(FxOverdriveNode, _super);
        function FxOverdriveNode() {
            _super.apply(this, arguments);
        }
        FxOverdriveNode.prototype._buildAudioGraph = function () {
            this._lowPassFilter = FxAudioEngine.context.createBiquadFilter();
            this._lowPassFilter.type = 0;
            this._lowPassFilter.frequency.value = 3000;

            this._waveShaper = FxAudioEngine.context.createWaveShaper();
            this._setDrive(120);

            this._gain = FxAudioEngine.context.createGain();

            var audioGraph = [
                this._lowPassFilter,
                this._waveShaper,
                this._gain
            ];

            return audioGraph;
        };

        FxOverdriveNode.prototype._buildAudioInterface = function (audioGraph) {
            var inputPort = new FxAudioEngine.FxAudioPort(this._lowPassFilter, FxAudioEngine.FxAudioPortDirection.INPUT);
            var outputPort = new FxAudioEngine.FxAudioPort(this._gain, FxAudioEngine.FxAudioPortDirection.OUTPUT);

            var audioInterface = new FxAudioEngine.FxAudioNodeInterface([inputPort], [outputPort]);

            return audioInterface;
        };

        FxOverdriveNode.prototype._setDrive = function (value) {
            var k = value;
            var n_samples = 22050;
            var deg = Math.PI / 180;

            var wsCurve = new Float32Array(n_samples);

            for (var i = 0; i < n_samples; i += 1) {
                var x = i * 2 / n_samples - 1;
                wsCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }

            this._waveShaper.curve = wsCurve;
        };
        return FxOverdriveNode;
    })(FxAudioEngine.FxAudioNode);
    FxAudioEngine.FxOverdriveNode = FxOverdriveNode;
})(FxAudioEngine || (FxAudioEngine = {}));
//# sourceMappingURL=fxOverdriveNode.js.map
