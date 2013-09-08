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


    loadSound('../fixtures/audio/sample.mp3', function (audioData) {
        var source = new FxAudioEngine.Nodes.Source.FxBufferSourceNode();
        var overdrive = new FxAudioEngine.Nodes.FxOverdriveNode();

        
        source.ports.outputs[0].connect(overdrive.ports.inputs[0]);
        overdrive.ports.outputs[0]._audioNode.connect(context.destination);


        var initOperation = source.init(audioData);

        initOperation.addEventListener('success', function () {
            source.stream.start(0);
        });
    });
}());