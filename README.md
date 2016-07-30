# FXAudio

FXAudio is an audio library of popular Guitar FX written on top of Web Audio API. It normalizes differences between built-in nodes and custom nodes for the benefit of faster app development.

## Why use FXAudio?

### Ease of use

FXAudio defines an abstraction called *Unit* that allows to seamlessly connect custom audio nodes to standard nodes of Web Audio API.

```javascript
const context = new FXAudio.RealTimeContext();

const sourceUnit = new FXAudio.LiveInputSourceUnit(context);
const echoUnit = new FXAudio.EchoUnit(context);
const destinationUnit = new FXAudio.AudioDestinationUnit(context);

echoUnit.delayTime = 1;
echoUnit.feedback = 0.25;
echoUnit.balance = 0.5;

sourceUnit.ports.outputs[0].connect(echoUnit.ports.inputs[0]);
echoUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);

const initOperation = sourceUnit.init(stream);

initOperation.addEventListener('success', function () {
    sourceUnit.stream.start(0);
});
```

See how custom *EchoUnit* is no different than *LiveInputSourceUnit* and *AudioDestinationUnit* that wrap standards Web Audio API nodes.


### Popular Guitar FX out of the box

FXAudio ships with set of popular Guitar FX units. With dozen lines of code you can setup decent chain of FX.

```javascript
const sourceUnit = new FXAudio.LiveInputSourceUnit(context);
const destinationUnit = new FXAudio.AudioDestinationUnit(context);
const flangerUnit = new FXAudio.FlangerUnit(context);
const overdriveUnit = new FXAudio.OverdriveUnit(context);

sourceUnit.ports.outputs[0].connect(flangerUnit.ports.inputs[0]);
flangerUnit.ports.outputs[0].connect(overdriveUnit.ports.inputs[0]);
overdriveUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);

const initOperation = sourceUnit.init(stream);

initOperation.addEventListener('success', function () {
    sourceUnit.stream.start(0);
});
```


### Build your own Units

Documentation TBD