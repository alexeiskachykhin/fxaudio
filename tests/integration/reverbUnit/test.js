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



    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.BufferSourceUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);
        var reverbUnit = new FXAudio.ReverbUnit(context);

        sourceUnit.ports.outputs[0].connect(reverbUnit.ports.inputs[0]);
        reverbUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initUI(reverbUnit);
    });
}());