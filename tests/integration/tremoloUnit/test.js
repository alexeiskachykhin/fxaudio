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


    function initUI(tremoloUnit) {
        var observeProperty = function (propertyName, inputId) {
            var inputElement = document.getElementById(inputId);

            inputElement.addEventListener('change', function () {
                tremoloUnit[propertyName] = Number(this.value);
            });

            inputElement.value = tremoloUnit[propertyName];
        };

        observeProperty('speed', 'tremolo-speed');
        observeProperty('depth', 'tremolo-depth');
    }



    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.BufferSourceUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);
        var tremoloUnit = new FXAudio.TremoloUnit(context);

        sourceUnit.ports.outputs[0].connect(tremoloUnit.ports.inputs[0]);
        tremoloUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initUI(tremoloUnit);
    });
}());