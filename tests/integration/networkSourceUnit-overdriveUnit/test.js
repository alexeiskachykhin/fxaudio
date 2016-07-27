(function () {
    'use strict';


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


    var context = new FXAudio.RealTimeContext();

    var sourceUnit = new FXAudio.NetworkSourceUnit(context);
    var destinationUnit = new FXAudio.AudioDestinationUnit(context);
    var overdriveUnit = new FXAudio.OverdriveUnit(context);

    sourceUnit.ports.outputs[0].connect(overdriveUnit.ports.inputs[0]);
    overdriveUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);
    

    var mediaElement = document.querySelector('audio');
    var initOperation = sourceUnit.init(mediaElement);

    initOperation.addEventListener('success', function () {
        sourceUnit.stream.start(0);
    });


    initUI(overdriveUnit);
}());