(function () {
    'use strict';


    var context = new FXAudio.RealTimeContext();

    var sourceUnit = new FXAudio.NetworkSourceUnit(context);
    var destinationUnit = new FXAudio.AudioDestinationUnit(context);

    sourceUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);

    var mediaElement = document.querySelector('audio');
    var initOperation = sourceUnit.init(mediaElement);

    initOperation.addEventListener('success', function () {
        sourceUnit.stream.start(0);
    });
}());