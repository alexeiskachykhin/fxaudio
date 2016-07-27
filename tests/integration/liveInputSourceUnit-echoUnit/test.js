(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
    }


    getInputStream(function (stream) {
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.LiveInputSourceUnit(context);
        var echoUnit = new FXAudio.EchoUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);

        echoUnit.delayTime = 1;
        echoUnit.feedback = 0.25;
        echoUnit.balance = 0.5;

        sourceUnit.ports.outputs[0].connect(echoUnit.ports.inputs[0]);
        echoUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);

        var initOperation = sourceUnit.init(stream);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });
    });
}());