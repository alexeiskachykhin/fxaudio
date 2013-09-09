(function () {
    'use strict';

    var context = FxAudioEngine.context;


    function loadSound(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.addEventListener('load', function () {
            callback(this.response);
        });

        request.send();
    };


    loadSound('../fixtures/audio/sample.mp3', function (audioBuffer) {
        var audioContext = new FxAudioEngine.FxRealTimeAudioContext();

        var bufferSourceNode = new FxAudioEngine.Nodes.Source.FxBufferSourceNode(audioContext);
        var delayNode = new FxAudioEngine.Nodes.FxDelayNode(audioContext);
        var destinationNode = new FxAudioEngine.Nodes.FxAudioDestinationNode(audioContext);

        bufferSourceNode.ports.outputs[0].connect(delayNode.ports.inputs[0]);
        delayNode.ports.outputs[0].connect(destinationNode.ports.inputs[0]);

        var initOperation = bufferSourceNode.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            bufferSourceNode.stream.start(0);
        });
    });
}());