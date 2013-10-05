﻿(function () {
    'use strict';


    function loadSound(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.addEventListener('load', function () {
            callback(this.response);
        });

        request.send();
    }


    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FxAudioEngine.FxRealTimeContext();

        var sourceUnit = new FxAudioEngine.FxBufferSourceUnit(context);
        var destinationUnit = new FxAudioEngine.FxAudioDestinationUnit(context);
        var delayUnit = new FxAudioEngine.FxDelayUnit(context);

        sourceUnit.ports.outputs[0].connect(delayUnit.ports.inputs[0]);
        delayUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        delayUnit.time = 3;


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });
    });
}());