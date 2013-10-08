(function () {
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
        var echoUnit = new FxAudioEngine.FxEchoUnit(context);

        echoUnit.delayTime = 1.5;
        echoUnit.feedbackGain = 0.25;
        echoUnit.echoGain = 0.5;

        sourceUnit.ports.outputs[0].connect(echoUnit.ports.inputs[0]);
        echoUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });
    });
}());