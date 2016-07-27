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

    function initUI(leftVolumeUnit, rightVolumeUnit) {
        var channels = [leftVolumeUnit, rightVolumeUnit];
        var channelSwitches = document.getElementsByTagName('input');


        var channelSwitchChangeHandler = function () {
            var channel = channels[this.dataset.channel];
            channel.level = Number(this.checked);
        };

        for (var i = 0; i <= channelSwitches.length - 1; i++) {
            var channelSwitch = channelSwitches[i];
            channelSwitch.addEventListener('change', channelSwitchChangeHandler);
        }
    }


    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FxAudioEngine.RealTimeContext();

        var sourceUnit = new FxAudioEngine.BufferSourceUnit(context);
        var destinationUnit = new FxAudioEngine.AudioDestinationUnit(context);
        var splitterUnit = new FxAudioEngine.ChannelSplitterUnit(context, 2);
        var leftVolumeUnit = new FxAudioEngine.VolumeUnit(context);
        var rightVolumeUnit = new FxAudioEngine.VolumeUnit(context);

        sourceUnit.ports.outputs[0].connect(splitterUnit.ports.inputs[0]);
        splitterUnit.ports.outputs[0].connect(leftVolumeUnit.ports.inputs[0]);
        splitterUnit.ports.outputs[1].connect(rightVolumeUnit.ports.inputs[0]);
        leftVolumeUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);
        rightVolumeUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });


        initUI(leftVolumeUnit, rightVolumeUnit);
    });
}());