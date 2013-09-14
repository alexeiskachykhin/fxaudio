(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
    }


    getInputStream(function (stream) {
        var unitContext = new FxAudioEngine.FxRealTimeUnitContext();

        var sourceUnit = new FxAudioEngine.Units.Source.FxLiveInputSourceUnit(unitContext);
        var destinationUnit = new FxAudioEngine.Units.FxAudioDestinationUnit(unitContext);

        sourceUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(stream);
         
        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });
    });
}());