(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
    }

    function initUI(reverbUnit) {
        var observeProperty = function (propertyName, inputId) {
            var inputElement = document.getElementById(inputId);

            inputElement.addEventListener('change', function () {
                reverbUnit[propertyName] = Number(this.value);
            });

            inputElement.value = reverbUnit[propertyName];
        };

        observeProperty('time', 'reverb-time');
        observeProperty('decay', 'reverb-decay');
        observeProperty('level', 'reverb-level');
    }


    getInputStream(function (stream) {
        var context = new FxAudioEngine.RealTimeContext();

        var sourceUnit = new FxAudioEngine.LiveInputSourceUnit(context);
        var destinationUnit = new FxAudioEngine.AudioDestinationUnit(context);
        var reverbUnit = new FxAudioEngine.ReverbUnit(context);

        sourceUnit.ports.outputs[0].connect(reverbUnit.ports.inputs[0]);
        reverbUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(stream);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });

        initUI(reverbUnit);
    });
}());