(function () {
    'use strict';


    function getInputStream(callback) {
        navigator.getUserMedia({
            audio: true
        }, callback, function () { });
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



    getInputStream(function (stream) {
        var context = new FxAudioEngine.RealTimeContext();

        var sourceUnit = new FxAudioEngine.LiveInputSourceUnit(context);
        var destinationUnit = new FxAudioEngine.AudioDestinationUnit(context);
        var tremoloUnit = new FxAudioEngine.TremoloUnit(context);

        sourceUnit.ports.outputs[0].connect(tremoloUnit.ports.inputs[0]);
        tremoloUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(stream);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });

        initOperation.addEventListener('error', function () {
            throw new Error('Initialization of source node has failed.');
        });

        initUI(tremoloUnit);
    });
}());