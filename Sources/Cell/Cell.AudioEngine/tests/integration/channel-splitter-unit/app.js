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

    function initUI(leftGain, rightGain) {
        var channels = [leftGain, rightGain];
        var channelSwitches = document.getElementsByTagName('input');


        var channelSwitchChangeHandler = function () {
            var channel = channels[this.dataset.channel];
            channel.gain.value = Number(this.checked);
        };

        for (var i = 0; i <= channelSwitches.length - 1; i++) {
            var channelSwitch = channelSwitches[i];
            channelSwitch.addEventListener('change', channelSwitchChangeHandler);
        }
    }


    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FxAudioEngine.FxRealTimeContext();

        var sourceUnit = new FxAudioEngine.FxBufferSourceUnit(context);
        var destinationUnit = new FxAudioEngine.FxAudioDestinationUnit(context);
        var splitterUnit = new FxAudioEngine.FxChannelSplitterUnit(context, 2);

        var leftGain = context.audioContext.createGain();
        var rightGain = context.audioContext.createGain();

        sourceUnit.ports.outputs[0].connect(splitterUnit.ports.inputs[0]);
        splitterUnit.ports.outputs[0]._audioNode.connect(leftGain, 0, 0);
        splitterUnit.ports.outputs[0]._audioNode.connect(rightGain, 1, 0);

        leftGain.connect(destinationUnit.ports.inputs[0]._audioNode);
        rightGain.connect(destinationUnit.ports.inputs[0]._audioNode);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });


        initUI(leftGain, rightGain);
    });
}());