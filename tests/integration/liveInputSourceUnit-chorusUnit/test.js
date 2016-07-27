(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
    }


    function initUI(chorusUnit) {
        var observeProperty = function (propertyName, inputId) {
            var inputElement = document.getElementById(inputId);

            inputElement.addEventListener('change', function () {
                chorusUnit[propertyName] = Number(this.value);
            });

            inputElement.value = chorusUnit[propertyName];
        };

        observeProperty('rate', 'chorus-rate');
        observeProperty('depth', 'chorus-depth');
    }



    getInputStream(function (stream) {
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.LiveInputSourceUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);
        var chorusUnit = new FXAudio.ChorusUnit(context);

        sourceUnit.ports.outputs[0].connect(chorusUnit.ports.inputs[0]);
        chorusUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(stream);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });

        initUI(chorusUnit);
    });
}());