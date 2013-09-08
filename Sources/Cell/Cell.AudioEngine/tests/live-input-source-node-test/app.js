(function () {
    'use strict';

    var context = FxAudioEngine.context;


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
    };


    getInputStream(function (stream) {
        var source = new FxAudioEngine.Nodes.Source.FxLiveInputSourceNode();
        source.ports.outputs[0]._audioNode.connect(context.destination);


        var initOperation = source.init(stream);
         
        initOperation.addEventListener('success', function () {
            source.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });
    });
}());