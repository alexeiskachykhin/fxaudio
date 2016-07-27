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
        var context = new FxAudioEngine.RealTimeContext();

        var sourceUnit = new FxAudioEngine.BufferSourceUnit(context);
        var echoUnit = new FxAudioEngine.EchoUnit(context, 3);
        var destinationUnit = new FxAudioEngine.AudioDestinationUnit(context);

        echoUnit.delayTime = 1.5;
        echoUnit.feedback = 0.25;
        echoUnit.balance = 0.5;

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