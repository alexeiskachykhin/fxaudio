(function () {
    'use strict';

    var context = FxAudioEngine.context;


    function loadSound(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.addEventListener('load', function () {
            context.decodeAudioData(this.response, function (buffer) {
                callback(buffer);
            });
        });

        request.send();
    };


    loadSound('../fixtures/audio/sample.mp3', function (audioBuffer) {
        var source = context.createBufferSource();
        source.buffer = audioBuffer;

        var overdrive = new FxAudioEngine.Nodes.FxOverdriveNode();
        source.connect(overdrive._audioInterface.inputs[0]._audioNode);

        overdrive.ports.outputs[0]._audioNode.connect(context.destination);


        source.start(0);
    });
}());