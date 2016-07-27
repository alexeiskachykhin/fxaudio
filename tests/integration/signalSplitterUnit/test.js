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
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.BufferSourceUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);
        var signalSplitterUnit = new FXAudio.SignalSplitterUnit(context, 2);
        var signalMergerUnit = new FXAudio.SignalMergerUnit(context, 2);


        sourceUnit.ports.outputs[0].connect(signalSplitterUnit.ports.inputs[0]);
        signalSplitterUnit.ports.outputs[0].connect(signalMergerUnit.ports.inputs[0]);
        signalSplitterUnit.ports.outputs[1].connect(signalMergerUnit.ports.inputs[1]);

        signalMergerUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        signalSplitterUnit.ports.outputs[0].disconnect();


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });
    });
}());