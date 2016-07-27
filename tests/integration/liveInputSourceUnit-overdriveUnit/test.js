(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
    }

    function initUI(overdriveUnit) {
        var observeProperty = function (propertyName, inputId) {
            var inputElement = document.getElementById(inputId);

            inputElement.addEventListener('change', function () {
                overdriveUnit[propertyName] = Number(this.value);
            });

            inputElement.value = overdriveUnit[propertyName];
        };

        observeProperty('level', 'overdrive-level');
        observeProperty('tone', 'overdrive-tone');
        observeProperty('drive', 'overdrive-drive');
    }


    getInputStream(function (stream) {
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.LiveInputSourceUnit(context);
        var overdriveUnit = new FXAudio.OverdriveUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);

        sourceUnit.ports.outputs[0].connect(overdriveUnit.ports.inputs[0]);
        overdriveUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(stream);
         
        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });


        initUI(overdriveUnit);
    });
}());