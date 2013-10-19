(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
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



    getInputStream(function (stream) {
        var context = new FxAudioEngine.RealTimeContext();

        var sourceUnit = new FxAudioEngine.LiveInputSourceUnit(context);
        var destinationUnit = new FxAudioEngine.AudioDestinationUnit(context);
        var flangerUnit = new FxAudioEngine.FlangerUnit(context);
        var overdriveUnit = new FxAudioEngine.OverdriveUnit(context);

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


        initUI(flangerUnit);
    });
}());