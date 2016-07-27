(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
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



    getInputStream(function (stream) {
        var context = new FXAudio.RealTimeContext();

        var sourceUnit = new FXAudio.LiveInputSourceUnit(context);
        var destinationUnit = new FXAudio.AudioDestinationUnit(context);
        var flangerUnit = new FXAudio.FlangerUnit(context);
        var overdriveUnit = new FXAudio.OverdriveUnit(context);

        sourceUnit.ports.outputs[0].connect(flangerUnit.ports.inputs[0]);
        flangerUnit.ports.outputs[0].connect(overdriveUnit.ports.inputs[0]);
        overdriveUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(stream);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });


        initUI(flangerUnit, overdriveUnit);
    });
}());