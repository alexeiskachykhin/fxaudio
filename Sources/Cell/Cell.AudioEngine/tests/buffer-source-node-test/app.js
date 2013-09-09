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
    };


    loadSound('../fixtures/audio/sample.mp3', function (audioBuffer) {
        var audioContext = new FxAudioEngine.FxRealTimeAudioContext();

        var sourceNode = new FxAudioEngine.Nodes.Source.FxBufferSourceNode(audioContext);
        var destinationNode = new FxAudioEngine.Nodes.FxAudioDestinationNode(audioContext);

        sourceNode.ports.outputs[0].connect(destinationNode.ports.inputs[0]);


        var initOperation = sourceNode.init(audioBuffer);
         
        initOperation.addEventListener('success', function () {
            sourceNode.stream.start(0);
        });
    });
}());