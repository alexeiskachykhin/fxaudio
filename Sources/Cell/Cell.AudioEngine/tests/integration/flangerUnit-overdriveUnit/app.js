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


    function initUI(flangerUnit, overdriveUnit) {
        var observeProperty = function (unit, propertyName, inputId) {
            var inputElement = document.getElementById(inputId);

            inputElement.addEventListener('change', function () {
                unit[propertyName] = Number(this.value);
            });

            inputElement.value = unit[propertyName];
        };

        observeProperty(flangerUnit, 'speed', 'flanger-speed');
        observeProperty(flangerUnit, 'delayTime', 'flanger-delay');
        observeProperty(flangerUnit, 'depth', 'flanger-depth');
        observeProperty(flangerUnit, 'feedback', 'flanger-feedback');

        observeProperty(overdriveUnit, 'level', 'overdrive-level');
        observeProperty(overdriveUnit, 'tone', 'overdrive-tone');
        observeProperty(overdriveUnit, 'drive', 'overdrive-drive');
    }



    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FxAudioEngine.RealTimeContext();

        var sourceUnit = new FxAudioEngine.BufferSourceUnit(context);
        var destinationUnit = new FxAudioEngine.AudioDestinationUnit(context);
        var flangerUnit = new FxAudioEngine.FlangerUnit(context);
        var overdriveUnit = new FxAudioEngine.OverdriveUnit(context);

        sourceUnit.ports.outputs[0].connect(flangerUnit.ports.inputs[0]);
        flangerUnit.ports.outputs[0].connect(overdriveUnit.ports.inputs[0]);
        overdriveUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initUI(flangerUnit, overdriveUnit);
    });
}());