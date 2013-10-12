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
        var destinationUnit = new FxAudioEngine.AudioDestinationUnit(context);
        var channelSplitterUnit = new FxAudioEngine.ChannelSplitterUnit(context, 2);
        var signalMergerUnit = new FxAudioEngine.SignalMergerUnit(context, 2);


        sourceUnit.ports.outputs[0].connect(channelSplitterUnit.ports.inputs[0]);
        channelSplitterUnit.ports.outputs[0].connect(signalMergerUnit.ports.inputs[0]);
        channelSplitterUnit.ports.outputs[1].connect(signalMergerUnit.ports.inputs[1]);

        signalMergerUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });
    });
}());