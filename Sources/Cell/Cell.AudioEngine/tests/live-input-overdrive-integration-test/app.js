(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
    };


    getInputStream(function (stream) {
        var audioContext = new FxAudioEngine.FxRealTimeAudioContext();

        var sourceNode = new FxAudioEngine.Nodes.Source.FxLiveInputSourceNode(audioContext);
        var overdriveNode = new FxAudioEngine.Nodes.FxOverdriveNode(audioContext);
        var destinationNode = new FxAudioEngine.Nodes.FxAudioDestinationNode(audioContext);

        sourceNode.ports.outputs[0].connect(overdriveNode.ports.inputs[0]);
        overdriveNode.ports.outputs[0].connect(destinationNode.ports.inputs[0]);


        var initOperation = sourceNode.init(stream);
         
        initOperation.addEventListener('success', function () {
            sourceNode.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });
    });
}());