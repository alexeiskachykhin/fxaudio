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


    function initUI(flangerUnit) {
        var observeProperty = function (propertyName, inputId) {
            var inputElement = document.getElementById(inputId);

            inputElement.addEventListener('change', function () {
                flangerUnit[propertyName] = Number(this.value);
            });

            inputElement.value = flangerUnit[propertyName];
        };

        observeProperty('speed', 'flanger-speed');
        observeProperty('delayTime', 'flanger-delay');
        observeProperty('depth', 'flanger-depth');
        observeProperty('feedback', 'flanger-feedback');
    }



    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FxAudioEngine.RealTimeContext();

        var sourceUnit = new FxAudioEngine.BufferSourceUnit(context);
        var destinationUnit = new FxAudioEngine.AudioDestinationUnit(context);
        var flangerUnit = new FxAudioEngine.FlangerUnit(context);

        sourceUnit.ports.outputs[0].connect(flangerUnit.ports.inputs[0]);
        flangerUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initUI(flangerUnit);
    });
}());