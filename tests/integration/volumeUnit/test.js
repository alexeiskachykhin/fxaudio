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


    function initUI(volumeUnit) {
        var observeProperty = function (propertyName, inputId) {
            var inputElement = document.getElementById(inputId);

            inputElement.addEventListener('change', function () {
                volumeUnit[propertyName] = Number(this.value);
            });

            inputElement.value = volumeUnit[propertyName];
        };

        observeProperty('level', 'volume-level');
    }



    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.BufferSourceUnit(context);
        var volumeUnit = new FXAudio.VolumeUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);


        sourceUnit.ports.outputs[0].connect(volumeUnit.ports.inputs[0]);
        volumeUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initUI(volumeUnit);
    });
}());