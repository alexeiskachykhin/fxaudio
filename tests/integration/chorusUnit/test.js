(function () {
    'use strict';


    function loadSound(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.addEventListener('load', function () {
            callback(this.response);
        });

        request.send();
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



    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.BufferSourceUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);
        var chorusUnit = new FXAudio.ChorusUnit(context);

        sourceUnit.ports.outputs[0].connect(chorusUnit.ports.inputs[0]);
        chorusUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initUI(chorusUnit);
    });
}());