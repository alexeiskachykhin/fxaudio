(function () {
    'use strict';

    var context = FxAudioEngine.context;


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
    };


    getInputStream(function (stream) {
        var audioContext = new FxAudioEngine.FxRealTimeAudioContext();

        var liveInputSourceNode = new FxAudioEngine.Nodes.Source.FxLiveInputSourceNode(audioContext);
        var destinationNode = new FxAudioEngine.Nodes.FxAudioDestinationNode(audioContext);

        liveInputSourceNode.ports.outputs[0].connect(overdriveNode.ports.inputs[0]);

        var initOperation = source.init(stream);
         
        initOperation.addEventListener('success', function () {
            liveInputSourceNode.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });
    });
}());