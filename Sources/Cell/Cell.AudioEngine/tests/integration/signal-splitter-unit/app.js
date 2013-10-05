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
        var signalSplitterUnit = new FxAudioEngine.FxSignalSplitterUnit(context, 2);
        var signalMergerUnit = new FxAudioEngine.FxSignalMergerUnit(context, 2);


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