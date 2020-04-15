var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FXAudio;
(function (FXAudio) {
    'use strict';
    FXAudio.ResourceMap = {
        strings: {}
    };
    var ResourceKey;
    (function (ResourceKey) {
        ResourceKey[ResourceKey["ARGUMENT_ERROR_MESSAGE"] = 0] = "ARGUMENT_ERROR_MESSAGE";
        ResourceKey[ResourceKey["ARGUMENT_OUT_OF_RANGE_ERROR_MESSAGE"] = 1] = "ARGUMENT_OUT_OF_RANGE_ERROR_MESSAGE";
        ResourceKey[ResourceKey["ARGUMENT_NULL_OR_UNDEFINED_ERROR_MESSAGE"] = 2] = "ARGUMENT_NULL_OR_UNDEFINED_ERROR_MESSAGE";
        ResourceKey[ResourceKey["ABSTRACT_ERROR_MESSAGE"] = 3] = "ABSTRACT_ERROR_MESSAGE";
        ResourceKey[ResourceKey["NOT_YET_IMPLEMENTED_ERROR_MESSAGE"] = 4] = "NOT_YET_IMPLEMENTED_ERROR_MESSAGE";
        ResourceKey[ResourceKey["INVALID_OPERATION_ERROR_MESSAGE"] = 5] = "INVALID_OPERATION_ERROR_MESSAGE";
    })(ResourceKey = FXAudio.ResourceKey || (FXAudio.ResourceKey = {}));
    FXAudio.ResourceMap.strings[ResourceKey.ARGUMENT_ERROR_MESSAGE] = 'Invalid argument {0}: {1}.';
    FXAudio.ResourceMap.strings[ResourceKey.ARGUMENT_OUT_OF_RANGE_ERROR_MESSAGE] = 'Argument out of range {0}.';
    FXAudio.ResourceMap.strings[ResourceKey.ARGUMENT_NULL_OR_UNDEFINED_ERROR_MESSAGE] = 'Argument is null or empty {0}.';
    FXAudio.ResourceMap.strings[ResourceKey.ABSTRACT_ERROR_MESSAGE] = 'This method is abstract.';
    FXAudio.ResourceMap.strings[ResourceKey.NOT_YET_IMPLEMENTED_ERROR_MESSAGE] = 'Not implemented.';
    FXAudio.ResourceMap.strings[ResourceKey.INVALID_OPERATION_ERROR_MESSAGE] = 'Invalid operation: {0}.';
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var ResourceManager = (function () {
        function ResourceManager() {
        }
        ResourceManager.getString = function (resourceKey, args) {
            var resourceStringFormat = FXAudio.ResourceMap.strings[resourceKey];
            var resourceString = ResourceManager.formatString(resourceStringFormat, args);
            return resourceString;
        };
        ResourceManager.formatString = function (s, args) {
            var formattedString = s.replace(/{(\d+)}/g, function (match, matchedNumber) {
                var replacement = args[matchedNumber] || match;
                return replacement;
            });
            return formattedString;
        };
        return ResourceManager;
    }());
    FXAudio.ResourceManager = ResourceManager;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var Errors = (function () {
        function Errors() {
        }
        Errors.argument = function (argument, message) {
            var errorMessage = FXAudio.ResourceManager.getString(FXAudio.ResourceKey.ARGUMENT_ERROR_MESSAGE, [argument, message]);
            return new Error(errorMessage);
        };
        Errors.argumentOutOfRange = function (argument) {
            var errorMessage = FXAudio.ResourceManager.getString(FXAudio.ResourceKey.ARGUMENT_OUT_OF_RANGE_ERROR_MESSAGE, [argument]);
            return new Error(errorMessage);
        };
        Errors.argumentNullOrUndefined = function (argument) {
            var errorMessage = FXAudio.ResourceManager.getString(FXAudio.ResourceKey.ARGUMENT_NULL_OR_UNDEFINED_ERROR_MESSAGE, [argument]);
            return new Error(errorMessage);
        };
        Errors.abstract = function () {
            var errorMessage = FXAudio.ResourceManager.getString(FXAudio.ResourceKey.ABSTRACT_ERROR_MESSAGE, null);
            return new Error(errorMessage);
        };
        Errors.notYetImplemented = function () {
            var errorMessage = FXAudio.ResourceManager.getString(FXAudio.ResourceKey.NOT_YET_IMPLEMENTED_ERROR_MESSAGE, null);
            return new Error(errorMessage);
        };
        Errors.invalidOperation = function (message) {
            var errorMessage = FXAudio.ResourceManager.getString(FXAudio.ResourceKey.INVALID_OPERATION_ERROR_MESSAGE, null);
            return new Error(errorMessage);
        };
        return Errors;
    }());
    FXAudio.Errors = Errors;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var Contract = (function () {
        function Contract() {
        }
        Contract.requires = function (condition, argument, message) {
            if (!condition) {
                throw FXAudio.Errors.argument(argument, message);
            }
        };
        Contract.isNotNullOrUndefined = function (value, argument) {
            if ((value === null) || (typeof value === 'undefined')) {
                throw FXAudio.Errors.argumentNullOrUndefined(argument);
            }
        };
        Contract.isPositiveOrZero = function (value, argument) {
            if (value < 0) {
                throw FXAudio.Errors.argumentOutOfRange(argument);
            }
        };
        return Contract;
    }());
    FXAudio.Contract = Contract;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var EventSource = (function () {
        function EventSource() {
            this._events = {};
        }
        EventSource.prototype._defer = function (f) {
            window.setTimeout(f, 0);
        };
        EventSource.prototype._dispatchEvent = function (eventName) {
            var eventArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                eventArgs[_i - 1] = arguments[_i];
            }
            FXAudio.Contract.isNotNullOrUndefined(eventName, 'eventName');
            if (!this._events.hasOwnProperty(eventName)) {
                return;
            }
            var eventListeners = this._events[eventName];
            eventListeners.forEach(function (eventListener) { return eventListener.apply(null, eventArgs); });
        };
        EventSource.prototype.addEventListener = function (eventName, eventListener) {
            FXAudio.Contract.isNotNullOrUndefined(eventName, 'eventName');
            FXAudio.Contract.isNotNullOrUndefined(eventListener, 'eventListener');
            var eventListeners = this._events[eventName] || [];
            eventListeners.push(eventListener);
            this._events[eventName] = eventListeners;
            return this;
        };
        EventSource.prototype.removeEventListener = function (eventName, eventListener) {
            FXAudio.Contract.isNotNullOrUndefined(eventName, 'eventName');
            FXAudio.Contract.isNotNullOrUndefined(eventListener, 'eventListener');
            if (!this._events.hasOwnProperty(eventName)) {
                return;
            }
            var eventListeners = this._events[eventName];
            var eventListenerIndex = eventListeners.indexOf(eventListener);
            if (eventListenerIndex < 0) {
                return;
            }
            eventListeners.splice(eventListenerIndex, 1);
            return this;
        };
        EventSource.prototype.dispatchEvent = function (eventName) {
            var _this = this;
            var eventArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                eventArgs[_i - 1] = arguments[_i];
            }
            FXAudio.Contract.isNotNullOrUndefined(eventName, 'eventName');
            var args = arguments;
            this._defer(function () {
                _this._dispatchEvent.apply(_this, args);
            });
        };
        return EventSource;
    }());
    FXAudio.EventSource = EventSource;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var Context = (function () {
        function Context(audioContext) {
            FXAudio.Contract.isNotNullOrUndefined(audioContext, 'audioContext');
            this._audioContext = audioContext;
        }
        Object.defineProperty(Context.prototype, "audioContext", {
            get: function () {
                return this._audioContext;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "sampleRate", {
            get: function () {
                return this._audioContext.sampleRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "currentTime", {
            get: function () {
                return this._audioContext.currentTime;
            },
            enumerable: true,
            configurable: true
        });
        return Context;
    }());
    FXAudio.Context = Context;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var OfflineAudioContext = window.OfflineAudioContext ||
        window.webkitOfflineAudioContext ||
        window.mozOfflineAudioContext;
    var OfflineContext = (function (_super) {
        __extends(OfflineContext, _super);
        function OfflineContext(numberOfChannels, length, sampleRate) {
            var _this = this;
            FXAudio.Contract.isPositiveOrZero(numberOfChannels, 'numberOfChannels');
            FXAudio.Contract.isPositiveOrZero(length, 'length');
            FXAudio.Contract.isPositiveOrZero(sampleRate, 'sampleRate');
            _this = _super.call(this, new OfflineAudioContext(numberOfChannels, length, sampleRate)) || this;
            return _this;
        }
        return OfflineContext;
    }(FXAudio.Context));
    FXAudio.OfflineContext = OfflineContext;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var AudioContext = window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext;
    var RealTimeContext = (function (_super) {
        __extends(RealTimeContext, _super);
        function RealTimeContext() {
            return _super.call(this, new AudioContext()) || this;
        }
        return RealTimeContext;
    }(FXAudio.Context));
    FXAudio.RealTimeContext = RealTimeContext;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var Circuit = (function () {
        function Circuit(context) {
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            this._context = context;
            this._inputs = [];
            this._outputs = [];
        }
        Object.defineProperty(Circuit.prototype, "context", {
            get: function () {
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circuit.prototype, "inputs", {
            get: function () {
                return this._inputs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circuit.prototype, "outputs", {
            get: function () {
                return this._outputs;
            },
            enumerable: true,
            configurable: true
        });
        Circuit.prototype._publishInputComponent = function (audioNode) {
            FXAudio.Contract.isNotNullOrUndefined(audioNode, 'audioNode');
            FXAudio.AudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, FXAudio.UnitPortDirection.INPUT, this._inputs);
        };
        Circuit.prototype._publishInputComponents = function (audioNodes) {
            FXAudio.Contract.isNotNullOrUndefined(audioNodes, 'audioNodes');
            FXAudio.AudioUtilities.AudioInterface.createPortsFromAudioNodes(audioNodes, FXAudio.UnitPortDirection.INPUT, this._inputs);
        };
        Circuit.prototype._publishOutputComponent = function (audioNode) {
            FXAudio.Contract.isNotNullOrUndefined(audioNode, 'audioNode');
            FXAudio.AudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, FXAudio.UnitPortDirection.OUTPUT, this._outputs);
        };
        Circuit.prototype._publishOutputComponents = function (audioNodes) {
            FXAudio.Contract.isNotNullOrUndefined(audioNodes, 'audioNodes');
            FXAudio.AudioUtilities.AudioInterface.createPortsFromAudioNodes(audioNodes, FXAudio.UnitPortDirection.OUTPUT, this._outputs);
        };
        return Circuit;
    }());
    FXAudio.Circuit = Circuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var Unit = (function () {
        function Unit(circuit) {
            FXAudio.Contract.isNotNullOrUndefined(circuit, 'circuit');
            var audioInterface = new FXAudio.UnitInterface(circuit.inputs, circuit.outputs);
            this._ports = audioInterface;
            this._circuit = circuit;
        }
        Object.defineProperty(Unit.prototype, "ports", {
            get: function () {
                return this._ports;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Unit.prototype, "circuit", {
            get: function () {
                return this._circuit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Unit.prototype, "context", {
            get: function () {
                return this._circuit.context;
            },
            enumerable: true,
            configurable: true
        });
        return Unit;
    }());
    FXAudio.Unit = Unit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var UnitPortDirection;
    (function (UnitPortDirection) {
        UnitPortDirection[UnitPortDirection["INPUT"] = 0] = "INPUT";
        UnitPortDirection[UnitPortDirection["OUTPUT"] = 1] = "OUTPUT";
    })(UnitPortDirection = FXAudio.UnitPortDirection || (FXAudio.UnitPortDirection = {}));
    var UnitPort = (function () {
        function UnitPort(audioNode, channel, direction) {
            FXAudio.Contract.isNotNullOrUndefined(audioNode, 'audioNode');
            FXAudio.Contract.isPositiveOrZero(channel, 'channel');
            FXAudio.Contract.isNotNullOrUndefined(direction, 'direction');
            this._audioNode = audioNode;
            this._direction = direction;
            this._channel = channel;
        }
        UnitPort.prototype.connect = function (port) {
            FXAudio.Contract.isNotNullOrUndefined(port, 'port');
            FXAudio.Contract.requires(port._direction === UnitPortDirection.INPUT, 'port');
            FXAudio.Contract.requires(this._direction === UnitPortDirection.OUTPUT, 'port');
            var sourceAudioNode = this._audioNode;
            var destinationAudioNode = port._audioNode;
            sourceAudioNode.connect(destinationAudioNode, this._channel, port._channel);
        };
        UnitPort.prototype.disconnect = function () {
            this._audioNode.disconnect(this._channel);
        };
        return UnitPort;
    }());
    FXAudio.UnitPort = UnitPort;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var UnitInterface = (function () {
        function UnitInterface(inputs, outputs) {
            FXAudio.Contract.isNotNullOrUndefined(inputs, 'inputs');
            FXAudio.Contract.isNotNullOrUndefined(outputs, 'outputs');
            this._inputs = inputs;
            this._outputs = outputs;
        }
        Object.defineProperty(UnitInterface.prototype, "inputs", {
            get: function () {
                return this._inputs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnitInterface.prototype, "outputs", {
            get: function () {
                return this._outputs;
            },
            enumerable: true,
            configurable: true
        });
        return UnitInterface;
    }());
    FXAudio.UnitInterface = UnitInterface;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["ANALYSER"] = 0] = "ANALYSER";
        NodeType[NodeType["BIQUAD_FILTER"] = 1] = "BIQUAD_FILTER";
        NodeType[NodeType["BUFFER_SOURCE"] = 2] = "BUFFER_SOURCE";
        NodeType[NodeType["CHANNEL_MERGER"] = 3] = "CHANNEL_MERGER";
        NodeType[NodeType["CHANNEL_SPLITTER"] = 4] = "CHANNEL_SPLITTER";
        NodeType[NodeType["CONVOLVER"] = 5] = "CONVOLVER";
        NodeType[NodeType["DELAY"] = 6] = "DELAY";
        NodeType[NodeType["DESTINATION"] = 7] = "DESTINATION";
        NodeType[NodeType["DYNAMICS_COMPRESSOR"] = 8] = "DYNAMICS_COMPRESSOR";
        NodeType[NodeType["GAIN"] = 9] = "GAIN";
        NodeType[NodeType["SCRIPT_PROCESSOR"] = 10] = "SCRIPT_PROCESSOR";
        NodeType[NodeType["MEDIA_ELEMENT_SOURCE"] = 11] = "MEDIA_ELEMENT_SOURCE";
        NodeType[NodeType["MEDIA_STREAM_DESTINATION"] = 12] = "MEDIA_STREAM_DESTINATION";
        NodeType[NodeType["MEDIA_STREAM_SOURCE"] = 13] = "MEDIA_STREAM_SOURCE";
        NodeType[NodeType["OSCILLATOR"] = 14] = "OSCILLATOR";
        NodeType[NodeType["PANNER"] = 15] = "PANNER";
        NodeType[NodeType["WAVE_SHAPER"] = 16] = "WAVE_SHAPER";
    })(NodeType = FXAudio.NodeType || (FXAudio.NodeType = {}));
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var WebAudioAPIUtilities = (function () {
        function WebAudioAPIUtilities() {
        }
        WebAudioAPIUtilities.prototype.routeLinear = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var chainOfNodes = (args[0] instanceof Array)
                ? args[0]
                : args;
            for (var i = 0; i <= chainOfNodes.length - 2; i++) {
                var audioNode = chainOfNodes[i];
                var nextAudioNode = chainOfNodes[i + 1];
                audioNode.connect(nextAudioNode);
            }
        };
        WebAudioAPIUtilities.prototype.routeCross = function (a, b) {
            FXAudio.Contract.isNotNullOrUndefined(a, 'a');
            FXAudio.Contract.isNotNullOrUndefined(b, 'b');
            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < b.length; j++) {
                    a[i].connect(b[j]);
                }
            }
        };
        WebAudioAPIUtilities.prototype.routeWithFeedback = function (a, b) {
            a.connect(b);
            b.connect(a);
        };
        WebAudioAPIUtilities.prototype.createNode = function (audioContext, nodeType) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            FXAudio.Contract.isNotNullOrUndefined(audioContext, 'audioContext');
            var factoryMethod;
            switch (nodeType) {
                case FXAudio.NodeType.ANALYSER:
                    factoryMethod = audioContext.createAnalyser;
                    break;
                case FXAudio.NodeType.BIQUAD_FILTER:
                    factoryMethod = audioContext.createBiquadFilter;
                    break;
                case FXAudio.NodeType.BUFFER_SOURCE:
                    factoryMethod = audioContext.createBufferSource;
                    break;
                case FXAudio.NodeType.CHANNEL_MERGER:
                    factoryMethod = audioContext.createChannelMerger;
                    break;
                case FXAudio.NodeType.CHANNEL_SPLITTER:
                    factoryMethod = audioContext.createChannelSplitter;
                    break;
                case FXAudio.NodeType.CONVOLVER:
                    factoryMethod = audioContext.createConvolver;
                    break;
                case FXAudio.NodeType.DELAY:
                    factoryMethod = audioContext.createDelay;
                    break;
                case FXAudio.NodeType.DESTINATION:
                    factoryMethod = function () { return audioContext.destination; };
                    break;
                case FXAudio.NodeType.DYNAMICS_COMPRESSOR:
                    factoryMethod = audioContext.createDynamicsCompressor;
                    break;
                case FXAudio.NodeType.GAIN:
                    factoryMethod = audioContext.createGain;
                    break;
                case FXAudio.NodeType.MEDIA_ELEMENT_SOURCE:
                    factoryMethod = audioContext.createMediaElementSource;
                    break;
                case FXAudio.NodeType.MEDIA_STREAM_DESTINATION:
                    factoryMethod = audioContext.createMediaStreamDestination;
                    break;
                case FXAudio.NodeType.MEDIA_STREAM_SOURCE:
                    factoryMethod = audioContext.createMediaStreamSource;
                    break;
                case FXAudio.NodeType.OSCILLATOR:
                    factoryMethod = audioContext.createOscillator;
                    break;
                case FXAudio.NodeType.PANNER:
                    factoryMethod = audioContext.createPanner;
                    break;
                case FXAudio.NodeType.SCRIPT_PROCESSOR:
                    factoryMethod = audioContext.createPanner;
                    break;
                case FXAudio.NodeType.WAVE_SHAPER:
                    factoryMethod = audioContext.createWaveShaper;
                    break;
            }
            var audioNode = factoryMethod.apply(audioContext, args);
            return audioNode;
        };
        return WebAudioAPIUtilities;
    }());
    FXAudio.WebAudioAPIUtilities = WebAudioAPIUtilities;
    var UnitInterfaceUtilities = (function () {
        function UnitInterfaceUtilities() {
        }
        UnitInterfaceUtilities.prototype.createPortsFromAudioNode = function (audioNode, direction, ports) {
            FXAudio.Contract.isNotNullOrUndefined(audioNode, 'audioNode');
            FXAudio.Contract.isNotNullOrUndefined(ports, 'ports');
            var numberOfPorts;
            switch (direction) {
                case FXAudio.UnitPortDirection.INPUT:
                    numberOfPorts = audioNode.numberOfInputs;
                    break;
                case FXAudio.UnitPortDirection.OUTPUT:
                    numberOfPorts = audioNode.numberOfOutputs;
                    break;
                default:
                    numberOfPorts = 0;
                    break;
            }
            for (var portIndex = 0; portIndex < numberOfPorts; portIndex++) {
                var port = new FXAudio.UnitPort(audioNode, portIndex, direction);
                ports.push(port);
            }
        };
        UnitInterfaceUtilities.prototype.createPortsFromAudioNodes = function (audioNodes, direction, ports) {
            FXAudio.Contract.isNotNullOrUndefined(audioNodes, 'audioNodes');
            FXAudio.Contract.isNotNullOrUndefined(ports, 'ports');
            for (var i = 0; i < audioNodes.length; i++) {
                var audioNode = audioNodes[i];
                this.createPortsFromAudioNode(audioNode, direction, ports);
            }
        };
        return UnitInterfaceUtilities;
    }());
    FXAudio.UnitInterfaceUtilities = UnitInterfaceUtilities;
    var AudioUtilities = (function () {
        function AudioUtilities() {
        }
        AudioUtilities.WebAudioAPI = new WebAudioAPIUtilities();
        AudioUtilities.AudioInterface = new UnitInterfaceUtilities();
        return AudioUtilities;
    }());
    FXAudio.AudioUtilities = AudioUtilities;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var AdapterCircuit = (function (_super) {
        __extends(AdapterCircuit, _super);
        function AdapterCircuit(context, audioNodeType) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this._audioNodeType = audioNodeType;
            _this._audioNodeFactoryMethodArguments = args;
            _this._createAdapterComponents();
            _this._publishAdapterComponents();
            return _this;
        }
        Object.defineProperty(AdapterCircuit.prototype, "audioNode", {
            get: function () {
                return this._audioNode;
            },
            enumerable: true,
            configurable: true
        });
        AdapterCircuit.prototype._createAdapterComponents = function () {
            this._audioNode = this._createNode();
        };
        AdapterCircuit.prototype._publishAdapterComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._audioNode, '_audioNode');
            this._publishInputComponent(this._audioNode);
            this._publishOutputComponent(this._audioNode);
        };
        AdapterCircuit.prototype._createNode = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            FXAudio.Contract.isNotNullOrUndefined(this._audioNodeType, '_audioNodeType');
            FXAudio.Contract.isNotNullOrUndefined(this._audioNodeFactoryMethodArguments, '_audioNodeFactoryMethodArguments');
            var audioContext = this.context.audioContext;
            var audioNodeType = this._audioNodeType;
            var audioNodeArguments = this._audioNodeFactoryMethodArguments;
            var audioNode = FXAudio.AudioUtilities.WebAudioAPI.createNode(audioContext, audioNodeType, audioNodeArguments);
            return audioNode;
        };
        return AdapterCircuit;
    }(FXAudio.Circuit));
    FXAudio.AdapterCircuit = AdapterCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var AudioDestinationCircuit = (function (_super) {
        __extends(AudioDestinationCircuit, _super);
        function AudioDestinationCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context, FXAudio.NodeType.DESTINATION) || this;
            return _this;
        }
        return AudioDestinationCircuit;
    }(FXAudio.AdapterCircuit));
    FXAudio.AudioDestinationCircuit = AudioDestinationCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var AudioDestinationUnit = (function (_super) {
        __extends(AudioDestinationUnit, _super);
        function AudioDestinationUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.AudioDestinationCircuit(context)) || this;
            return _this;
        }
        Object.defineProperty(AudioDestinationUnit.prototype, "maxChannelCount", {
            get: function () {
                return this.circuit.audioNode.maxNumberOfChannels;
            },
            enumerable: true,
            configurable: true
        });
        return AudioDestinationUnit;
    }(FXAudio.Unit));
    FXAudio.AudioDestinationUnit = AudioDestinationUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var AudioSourceState;
    (function (AudioSourceState) {
        AudioSourceState[AudioSourceState["PLAYING"] = 0] = "PLAYING";
        AudioSourceState[AudioSourceState["STOPPED"] = 1] = "STOPPED";
        AudioSourceState[AudioSourceState["PAUSED"] = 2] = "PAUSED";
        AudioSourceState[AudioSourceState["AWAITING"] = 3] = "AWAITING";
    })(AudioSourceState = FXAudio.AudioSourceState || (FXAudio.AudioSourceState = {}));
    ;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var AudioSourceUnit = (function (_super) {
        __extends(AudioSourceUnit, _super);
        function AudioSourceUnit(circuit) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(circuit, 'circuit');
            _this = _super.call(this, circuit) || this;
            return _this;
        }
        AudioSourceUnit.prototype.init = function (source) {
            throw FXAudio.Errors.abstract();
        };
        return AudioSourceUnit;
    }(FXAudio.Unit));
    FXAudio.AudioSourceUnit = AudioSourceUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var BufferAudioSourceController = (function () {
        function BufferAudioSourceController(audioSourceNode) {
            this._state = FXAudio.AudioSourceState.AWAITING;
            FXAudio.Contract.isNotNullOrUndefined(audioSourceNode, 'audioSourceNode');
            this._audioSourceNode = audioSourceNode;
        }
        Object.defineProperty(BufferAudioSourceController.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferAudioSourceController.prototype, "canStart", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferAudioSourceController.prototype, "canStop", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferAudioSourceController.prototype, "canRewind", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        BufferAudioSourceController.prototype.start = function (when) {
            FXAudio.Contract.isPositiveOrZero(when, 'when');
            this._audioSourceNode.start(when);
            this._state = FXAudio.AudioSourceState.PLAYING;
        };
        BufferAudioSourceController.prototype.stop = function (when) {
            FXAudio.Contract.isPositiveOrZero(when, 'when');
            this._audioSourceNode.stop(when);
            this._state = FXAudio.AudioSourceState.STOPPED;
        };
        return BufferAudioSourceController;
    }());
    FXAudio.BufferAudioSourceController = BufferAudioSourceController;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var BufferSourceCircuit = (function (_super) {
        __extends(BufferSourceCircuit, _super);
        function BufferSourceCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context, FXAudio.NodeType.BUFFER_SOURCE) || this;
            return _this;
        }
        return BufferSourceCircuit;
    }(FXAudio.AdapterCircuit));
    FXAudio.BufferSourceCircuit = BufferSourceCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var AudioBufferState;
    (function (AudioBufferState) {
        AudioBufferState[AudioBufferState["NODATA"] = 0] = "NODATA";
        AudioBufferState[AudioBufferState["DECODING"] = 1] = "DECODING";
        AudioBufferState[AudioBufferState["READY"] = 2] = "READY";
    })(AudioBufferState = FXAudio.AudioBufferState || (FXAudio.AudioBufferState = {}));
    ;
    var BufferSourceUnit = (function (_super) {
        __extends(BufferSourceUnit, _super);
        function BufferSourceUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.BufferSourceCircuit(context)) || this;
            _this._audioSourceController = new FXAudio.BufferAudioSourceController(_this._audioSourceNode);
            return _this;
        }
        Object.defineProperty(BufferSourceUnit.prototype, "_audioSourceNode", {
            get: function () {
                return this.circuit.audioNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferSourceUnit.prototype, "stream", {
            get: function () {
                return this._audioSourceController;
            },
            enumerable: true,
            configurable: true
        });
        BufferSourceUnit.prototype.init = function (audioData) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(audioData, 'audioData');
            this._bufferState = AudioBufferState.DECODING;
            var asyncCompletionSource = new FXAudio.EventSource();
            this.context.audioContext.decodeAudioData(audioData, function (audioBuffer) {
                _this._audioSourceNode.buffer = audioBuffer;
                _this._bufferState = AudioBufferState.READY;
                asyncCompletionSource.dispatchEvent('success');
            }, function () {
                _this._audioSourceNode.buffer = null;
                _this._bufferState = AudioBufferState.NODATA;
                asyncCompletionSource.dispatchEvent('error');
            });
            return asyncCompletionSource;
        };
        return BufferSourceUnit;
    }(FXAudio.AudioSourceUnit));
    FXAudio.BufferSourceUnit = BufferSourceUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var LiveInputAudioSourceController = (function () {
        function LiveInputAudioSourceController() {
            this._state = FXAudio.AudioSourceState.AWAITING;
        }
        Object.defineProperty(LiveInputAudioSourceController.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LiveInputAudioSourceController.prototype, "canStart", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LiveInputAudioSourceController.prototype, "canStop", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LiveInputAudioSourceController.prototype, "canRewind", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        LiveInputAudioSourceController.prototype.start = function (when) {
            FXAudio.Contract.isPositiveOrZero(when, 'when');
            this._state = FXAudio.AudioSourceState.PLAYING;
        };
        LiveInputAudioSourceController.prototype.stop = function (when) {
            throw FXAudio.Errors.invalidOperation();
        };
        return LiveInputAudioSourceController;
    }());
    FXAudio.LiveInputAudioSourceController = LiveInputAudioSourceController;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var LiveInputSourceCircuit = (function (_super) {
        __extends(LiveInputSourceCircuit, _super);
        function LiveInputSourceCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this._createLiveInputSourceCircuit();
            return _this;
        }
        LiveInputSourceCircuit.prototype.mountStream = function (stream) {
            FXAudio.Contract.isNotNullOrUndefined(stream, 'stream');
            FXAudio.Contract.isNotNullOrUndefined(this._outputGainNode, '_outputGainNode');
            this._mediStreamSourceNode = this.context.audioContext.createMediaStreamSource(stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        };
        LiveInputSourceCircuit.prototype._createLiveInputSourceCircuit = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            this._outputGainNode = this.context.audioContext.createGain();
            this._publishOutputComponent(this._outputGainNode);
        };
        return LiveInputSourceCircuit;
    }(FXAudio.Circuit));
    FXAudio.LiveInputSourceCircuit = LiveInputSourceCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var LiveInputSourceUnit = (function (_super) {
        __extends(LiveInputSourceUnit, _super);
        function LiveInputSourceUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.LiveInputSourceCircuit(context)) || this;
            _this._audioSourceController = new FXAudio.LiveInputAudioSourceController();
            return _this;
        }
        Object.defineProperty(LiveInputSourceUnit.prototype, "stream", {
            get: function () {
                return this._audioSourceController;
            },
            enumerable: true,
            configurable: true
        });
        LiveInputSourceUnit.prototype.init = function (stream) {
            FXAudio.Contract.isNotNullOrUndefined(stream, 'stream');
            var asyncCompletionSource = new FXAudio.EventSource();
            try {
                this.circuit.mountStream(stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }
            return asyncCompletionSource;
        };
        return LiveInputSourceUnit;
    }(FXAudio.AudioSourceUnit));
    FXAudio.LiveInputSourceUnit = LiveInputSourceUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var NetworkAudioSourceController = (function () {
        function NetworkAudioSourceController(mediaElement) {
            this._state = FXAudio.AudioSourceState.AWAITING;
            FXAudio.Contract.isNotNullOrUndefined(mediaElement, 'mediaElement');
            this._mediaElement = mediaElement;
        }
        Object.defineProperty(NetworkAudioSourceController.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkAudioSourceController.prototype, "canStart", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkAudioSourceController.prototype, "canStop", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkAudioSourceController.prototype, "canRewind", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkAudioSourceController.prototype, "time", {
            get: function () {
                return this._mediaElement.currentTime;
            },
            set: function (value) {
                this._mediaElement.currentTime = value;
            },
            enumerable: true,
            configurable: true
        });
        NetworkAudioSourceController.prototype.start = function (when) {
            FXAudio.Contract.isPositiveOrZero(when, 'when');
            this._mediaElement.play();
            this._state = FXAudio.AudioSourceState.PLAYING;
        };
        NetworkAudioSourceController.prototype.stop = function (when) {
            FXAudio.Contract.isPositiveOrZero(when, 'when');
            this._mediaElement.pause();
            this._state = FXAudio.AudioSourceState.STOPPED;
        };
        return NetworkAudioSourceController;
    }());
    FXAudio.NetworkAudioSourceController = NetworkAudioSourceController;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var NetworkSourceCircuit = (function (_super) {
        __extends(NetworkSourceCircuit, _super);
        function NetworkSourceCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this._createNetworkSourceCircuit();
            return _this;
        }
        NetworkSourceCircuit.prototype.mountMediaElement = function (mediaElement) {
            FXAudio.Contract.isNotNullOrUndefined(mediaElement, 'mediaElement');
            FXAudio.Contract.isNotNullOrUndefined(this._outputGainNode, '_outputGainNode');
            this._mediElementSourceNode = this.context.audioContext.createMediaElementSource(mediaElement);
            this._mediElementSourceNode.connect(this._outputGainNode);
        };
        NetworkSourceCircuit.prototype._createNetworkSourceCircuit = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            this._outputGainNode = this.context.audioContext.createGain();
            this._publishOutputComponent(this._outputGainNode);
        };
        return NetworkSourceCircuit;
    }(FXAudio.Circuit));
    FXAudio.NetworkSourceCircuit = NetworkSourceCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var NetworkSourceUnit = (function (_super) {
        __extends(NetworkSourceUnit, _super);
        function NetworkSourceUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.NetworkSourceCircuit(context)) || this;
            return _this;
        }
        Object.defineProperty(NetworkSourceUnit.prototype, "stream", {
            get: function () {
                return this._audioSourceController;
            },
            enumerable: true,
            configurable: true
        });
        NetworkSourceUnit.prototype.init = function (mediaElement) {
            FXAudio.Contract.isNotNullOrUndefined(mediaElement, 'mediaElement');
            var asyncCompletionSource = new FXAudio.EventSource();
            try {
                this.circuit.mountMediaElement(mediaElement);
                this._audioSourceController = new FXAudio.NetworkAudioSourceController(mediaElement);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }
            return asyncCompletionSource;
        };
        return NetworkSourceUnit;
    }(FXAudio.AudioSourceUnit));
    FXAudio.NetworkSourceUnit = NetworkSourceUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var VolumeCircuit = (function (_super) {
        __extends(VolumeCircuit, _super);
        function VolumeCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context, FXAudio.NodeType.GAIN) || this;
            return _this;
        }
        return VolumeCircuit;
    }(FXAudio.AdapterCircuit));
    FXAudio.VolumeCircuit = VolumeCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var VolumeUnit = (function (_super) {
        __extends(VolumeUnit, _super);
        function VolumeUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.VolumeCircuit(context)) || this;
            return _this;
        }
        Object.defineProperty(VolumeUnit.prototype, "level", {
            get: function () {
                return this.circuit.audioNode.gain.value;
            },
            set: function (value) {
                this.circuit.audioNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return VolumeUnit;
    }(FXAudio.Unit));
    FXAudio.VolumeUnit = VolumeUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var ChannelMergerCircuit = (function (_super) {
        __extends(ChannelMergerCircuit, _super);
        function ChannelMergerCircuit(context, numberOfInputs) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            _this = _super.call(this, context, FXAudio.NodeType.CHANNEL_MERGER, numberOfInputs) || this;
            return _this;
        }
        return ChannelMergerCircuit;
    }(FXAudio.AdapterCircuit));
    FXAudio.ChannelMergerCircuit = ChannelMergerCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var ChannelMergerUnit = (function (_super) {
        __extends(ChannelMergerUnit, _super);
        function ChannelMergerUnit(context, numberOfInputs) {
            if (numberOfInputs === void 0) { numberOfInputs = 6; }
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            _this = _super.call(this, new FXAudio.ChannelMergerCircuit(context, numberOfInputs)) || this;
            return _this;
        }
        return ChannelMergerUnit;
    }(FXAudio.Unit));
    FXAudio.ChannelMergerUnit = ChannelMergerUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var ChannelSplitterCircuit = (function (_super) {
        __extends(ChannelSplitterCircuit, _super);
        function ChannelSplitterCircuit(context, numberOfOutputs) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');
            _this = _super.call(this, context, FXAudio.NodeType.CHANNEL_SPLITTER, numberOfOutputs) || this;
            return _this;
        }
        return ChannelSplitterCircuit;
    }(FXAudio.AdapterCircuit));
    FXAudio.ChannelSplitterCircuit = ChannelSplitterCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var ChannelSplitterUnit = (function (_super) {
        __extends(ChannelSplitterUnit, _super);
        function ChannelSplitterUnit(context, numberOfOutputs) {
            if (numberOfOutputs === void 0) { numberOfOutputs = 6; }
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');
            _this = _super.call(this, new FXAudio.ChannelSplitterCircuit(context, numberOfOutputs)) || this;
            return _this;
        }
        return ChannelSplitterUnit;
    }(FXAudio.Unit));
    FXAudio.ChannelSplitterUnit = ChannelSplitterUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var SignalHubCircuit = (function (_super) {
        __extends(SignalHubCircuit, _super);
        function SignalHubCircuit(context, numberOfInputs, numberOfOutputs) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            FXAudio.Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');
            _this = _super.call(this, context) || this;
            _this._createSignalHubCircuit(numberOfInputs, numberOfOutputs);
            return _this;
        }
        SignalHubCircuit.prototype._createSignalHubCircuit = function (numberOfInputs, numberOfOutputs) {
            FXAudio.Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            FXAudio.Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');
            var inputs = this._creatComponentGroup(numberOfInputs);
            var outputs = this._creatComponentGroup(numberOfOutputs);
            FXAudio.AudioUtilities.WebAudioAPI.routeCross(inputs, outputs);
            this._publishInputComponents(inputs);
            this._publishOutputComponents(outputs);
        };
        SignalHubCircuit.prototype._creatComponentGroup = function (numberOfNodes) {
            FXAudio.Contract.isPositiveOrZero(numberOfNodes, 'numberOfNodes');
            var nodes = [];
            for (var i = 0; i < numberOfNodes; i++) {
                var node = FXAudio.AudioUtilities.WebAudioAPI.createNode(this.context.audioContext, FXAudio.NodeType.GAIN);
                nodes.push(node);
            }
            return nodes;
        };
        return SignalHubCircuit;
    }(FXAudio.Circuit));
    FXAudio.SignalHubCircuit = SignalHubCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var SignalMergerCircuit = (function (_super) {
        __extends(SignalMergerCircuit, _super);
        function SignalMergerCircuit(context, numberOfInputs) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            _this = _super.call(this, context, numberOfInputs, 1) || this;
            return _this;
        }
        return SignalMergerCircuit;
    }(FXAudio.SignalHubCircuit));
    FXAudio.SignalMergerCircuit = SignalMergerCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var SignalMergerUnit = (function (_super) {
        __extends(SignalMergerUnit, _super);
        function SignalMergerUnit(context, numberOfInputs) {
            if (numberOfInputs === void 0) { numberOfInputs = 6; }
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            _this = _super.call(this, new FXAudio.SignalMergerCircuit(context, numberOfInputs)) || this;
            return _this;
        }
        return SignalMergerUnit;
    }(FXAudio.Unit));
    FXAudio.SignalMergerUnit = SignalMergerUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var SignalSplitterCircuit = (function (_super) {
        __extends(SignalSplitterCircuit, _super);
        function SignalSplitterCircuit(context, numberOfOutputs) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');
            _this = _super.call(this, context, 1, numberOfOutputs) || this;
            return _this;
        }
        return SignalSplitterCircuit;
    }(FXAudio.SignalHubCircuit));
    FXAudio.SignalSplitterCircuit = SignalSplitterCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var SignalSplitterUnit = (function (_super) {
        __extends(SignalSplitterUnit, _super);
        function SignalSplitterUnit(context, numberOfOutputs) {
            if (numberOfOutputs === void 0) { numberOfOutputs = 6; }
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');
            _this = _super.call(this, new FXAudio.SignalSplitterCircuit(context, numberOfOutputs)) || this;
            return _this;
        }
        return SignalSplitterUnit;
    }(FXAudio.Unit));
    FXAudio.SignalSplitterUnit = SignalSplitterUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var DelayCircuit = (function (_super) {
        __extends(DelayCircuit, _super);
        function DelayCircuit(context, maxDelayTime) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');
            _this = _super.call(this, context, FXAudio.NodeType.DELAY, maxDelayTime) || this;
            return _this;
        }
        return DelayCircuit;
    }(FXAudio.AdapterCircuit));
    FXAudio.DelayCircuit = DelayCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var DelayUnit = (function (_super) {
        __extends(DelayUnit, _super);
        function DelayUnit(context, maxDelayTime) {
            if (maxDelayTime === void 0) { maxDelayTime = 3.0; }
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');
            _this = _super.call(this, new FXAudio.DelayCircuit(context, maxDelayTime)) || this;
            return _this;
        }
        Object.defineProperty(DelayUnit.prototype, "time", {
            get: function () {
                return this.circuit.audioNode.delayTime.value;
            },
            set: function (value) {
                this.circuit.audioNode.delayTime.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return DelayUnit;
    }(FXAudio.Unit));
    FXAudio.DelayUnit = DelayUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var EchoUnit = (function (_super) {
        __extends(EchoUnit, _super);
        function EchoUnit(context, maxDelayTime) {
            if (maxDelayTime === void 0) { maxDelayTime = 1.0; }
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');
            _this = _super.call(this, new FXAudio.EchoCircuit(context, maxDelayTime)) || this;
            return _this;
        }
        Object.defineProperty(EchoUnit.prototype, "delayTime", {
            get: function () {
                return this.circuit.delayNode.delayTime.value;
            },
            set: function (value) {
                this.circuit.delayNode.delayTime.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EchoUnit.prototype, "feedback", {
            get: function () {
                return this.circuit.feedbackNode.gain.value;
            },
            set: function (value) {
                this.circuit.feedbackNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EchoUnit.prototype, "balance", {
            get: function () {
                return this.circuit.balanceNode.gain.value;
            },
            set: function (value) {
                this.circuit.balanceNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return EchoUnit;
    }(FXAudio.Unit));
    FXAudio.EchoUnit = EchoUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var EchoCircuit = (function (_super) {
        __extends(EchoCircuit, _super);
        function EchoCircuit(context, maxDelayTime) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            FXAudio.Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');
            _this = _super.call(this, context) || this;
            _this._createEchoComponents(maxDelayTime);
            _this._connectEchoComponents();
            _this._publishEchoComponents();
            return _this;
        }
        Object.defineProperty(EchoCircuit.prototype, "inputNode", {
            get: function () {
                return this._inputNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EchoCircuit.prototype, "delayNode", {
            get: function () {
                return this._delayNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EchoCircuit.prototype, "feedbackNode", {
            get: function () {
                return this._feedbackNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EchoCircuit.prototype, "balanceNode", {
            get: function () {
                return this._balanceNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EchoCircuit.prototype, "outputNode", {
            get: function () {
                return this._outputNode;
            },
            enumerable: true,
            configurable: true
        });
        EchoCircuit.prototype._createEchoComponents = function (maxDelayTime) {
            FXAudio.Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');
            var audioContext = this.context.audioContext;
            this._inputNode = audioContext.createGain();
            this._delayNode = audioContext.createDelay(maxDelayTime);
            this._feedbackNode = audioContext.createGain();
            this._balanceNode = audioContext.createGain();
            this._outputNode = audioContext.createGain();
        };
        EchoCircuit.prototype._connectEchoComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._inputNode, '_inputNode');
            FXAudio.Contract.isNotNullOrUndefined(this._delayNode, '_delayNode');
            FXAudio.Contract.isNotNullOrUndefined(this._feedbackNode, '_feedbackNode');
            FXAudio.Contract.isNotNullOrUndefined(this._balanceNode, '_balanceNode');
            FXAudio.Contract.isNotNullOrUndefined(this._outputNode, '_outputNode');
            FXAudio.AudioUtilities.WebAudioAPI.routeLinear(this._inputNode, this._outputNode);
            FXAudio.AudioUtilities.WebAudioAPI.routeLinear(this._inputNode, this._delayNode, this._balanceNode, this._outputNode);
            FXAudio.AudioUtilities.WebAudioAPI.routeWithFeedback(this._delayNode, this._feedbackNode);
        };
        EchoCircuit.prototype._publishEchoComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._inputNode, '_inputNode');
            FXAudio.Contract.isNotNullOrUndefined(this._outputNode, '_outputNode');
            this._publishInputComponent(this._inputNode);
            this._publishOutputComponent(this._outputNode);
        };
        return EchoCircuit;
    }(FXAudio.Circuit));
    FXAudio.EchoCircuit = EchoCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var OverdriveCircuit = (function (_super) {
        __extends(OverdriveCircuit, _super);
        function OverdriveCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this._createOverdriveComponents();
            _this._connectOverdriveComponents();
            _this._publishOverdriveComponents();
            return _this;
        }
        Object.defineProperty(OverdriveCircuit.prototype, "gainNode", {
            get: function () {
                return this._gainNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OverdriveCircuit.prototype, "lowPassFilterNode", {
            get: function () {
                return this._lowPassFilterNode;
            },
            enumerable: true,
            configurable: true
        });
        OverdriveCircuit.prototype.getDrive = function () {
            return this._drive;
        };
        OverdriveCircuit.prototype.setDrive = function (value) {
            FXAudio.Contract.isPositiveOrZero(value, 'value');
            var k = value;
            var deg = Math.PI / 180;
            var sampleRate = this.context.sampleRate;
            var shapingCurve = new Float32Array(sampleRate);
            for (var i = 0; i < sampleRate; i += 1) {
                var x = i * 2 / sampleRate - 1;
                shapingCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }
            this._waveShaperNode.curve = shapingCurve;
            this._drive = value;
        };
        OverdriveCircuit.prototype._createOverdriveComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            var audioContext = this.context.audioContext;
            this._lowPassFilterNode = audioContext.createBiquadFilter();
            this._lowPassFilterNode.type = 0;
            this._lowPassFilterNode.frequency.value = 3000;
            this._waveShaperNode = audioContext.createWaveShaper();
            this.setDrive(120);
            this._gainNode = audioContext.createGain();
        };
        OverdriveCircuit.prototype._connectOverdriveComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._lowPassFilterNode, '_lowPassFilterNode');
            FXAudio.Contract.isNotNullOrUndefined(this._waveShaperNode, '_waveShaperNode');
            FXAudio.Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');
            FXAudio.AudioUtilities.WebAudioAPI.routeLinear(this._lowPassFilterNode, this._waveShaperNode, this._gainNode);
        };
        OverdriveCircuit.prototype._publishOverdriveComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._lowPassFilterNode, '_lowPassFilterNode');
            FXAudio.Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');
            this._publishInputComponent(this._lowPassFilterNode);
            this._publishOutputComponent(this._gainNode);
        };
        return OverdriveCircuit;
    }(FXAudio.Circuit));
    FXAudio.OverdriveCircuit = OverdriveCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var OverdriveUnit = (function (_super) {
        __extends(OverdriveUnit, _super);
        function OverdriveUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.OverdriveCircuit(context)) || this;
            return _this;
        }
        Object.defineProperty(OverdriveUnit.prototype, "level", {
            get: function () {
                return this.circuit.gainNode.gain.value;
            },
            set: function (value) {
                this.circuit.gainNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OverdriveUnit.prototype, "tone", {
            get: function () {
                return this.circuit.lowPassFilterNode.frequency.value;
            },
            set: function (value) {
                this.circuit.lowPassFilterNode.frequency.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OverdriveUnit.prototype, "drive", {
            get: function () {
                return this.circuit.getDrive();
            },
            set: function (value) {
                this.circuit.setDrive(value);
            },
            enumerable: true,
            configurable: true
        });
        return OverdriveUnit;
    }(FXAudio.Unit));
    FXAudio.OverdriveUnit = OverdriveUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var TremoloCircuit = (function (_super) {
        __extends(TremoloCircuit, _super);
        function TremoloCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this._createTremoloComponents();
            _this._connectTremoloComponents();
            _this._publishTremoloComponents();
            return _this;
        }
        Object.defineProperty(TremoloCircuit.prototype, "lfoNode", {
            get: function () {
                return this._lfoNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TremoloCircuit.prototype, "depthNode", {
            get: function () {
                return this._depthNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TremoloCircuit.prototype, "gainNode", {
            get: function () {
                return this._gainNode;
            },
            enumerable: true,
            configurable: true
        });
        TremoloCircuit.prototype._createTremoloComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            var audioContext = this.context.audioContext;
            this._depthNode = audioContext.createGain();
            this._lfoNode = audioContext.createOscillator();
            this._lfoNode.start(0);
            this._gainNode = audioContext.createGain();
        };
        TremoloCircuit.prototype._connectTremoloComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._lfoNode, '_lfoNode');
            FXAudio.Contract.isNotNullOrUndefined(this._depthNode, '_depthNode');
            FXAudio.Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');
            this._lfoNode.connect(this._depthNode);
            this._depthNode.connect(this._gainNode.gain);
        };
        TremoloCircuit.prototype._publishTremoloComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');
            this._publishInputComponent(this._gainNode);
            this._publishOutputComponent(this._gainNode);
        };
        return TremoloCircuit;
    }(FXAudio.Circuit));
    FXAudio.TremoloCircuit = TremoloCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var DEFAULT_SPEED = 0.5;
    var DEFAULT_DEPTH = 1;
    var TremoloUnit = (function (_super) {
        __extends(TremoloUnit, _super);
        function TremoloUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.TremoloCircuit(context)) || this;
            _this.speed = DEFAULT_SPEED;
            _this.depth = DEFAULT_DEPTH;
            return _this;
        }
        Object.defineProperty(TremoloUnit.prototype, "speed", {
            get: function () {
                return this.circuit.lfoNode.frequency.value;
            },
            set: function (value) {
                this.circuit.lfoNode.frequency.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TremoloUnit.prototype, "depth", {
            get: function () {
                return this.circuit.depthNode.gain.value;
            },
            set: function (value) {
                this.circuit.depthNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return TremoloUnit;
    }(FXAudio.Unit));
    FXAudio.TremoloUnit = TremoloUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var MAX_DELAY_TIME = 0.05;
    var ComboFilterCircuit = (function (_super) {
        __extends(ComboFilterCircuit, _super);
        function ComboFilterCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this._createComboFilterComponents();
            _this._connectComboFilterComponents();
            _this._publishComboFilterComponents();
            return _this;
        }
        Object.defineProperty(ComboFilterCircuit.prototype, "inputNode", {
            get: function () {
                return this._inputNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComboFilterCircuit.prototype, "outputNode", {
            get: function () {
                return this._outputNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComboFilterCircuit.prototype, "delayNode", {
            get: function () {
                return this._delayNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComboFilterCircuit.prototype, "feedbackNode", {
            get: function () {
                return this._feedbackNode;
            },
            enumerable: true,
            configurable: true
        });
        ComboFilterCircuit.prototype._createComboFilterComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            var audioContext = this.context.audioContext;
            this._inputNode = audioContext.createGain();
            this._outputNode = audioContext.createGain();
            this._delayNode = audioContext.createDelay(MAX_DELAY_TIME);
            this._feedbackNode = audioContext.createGain();
        };
        ComboFilterCircuit.prototype._connectComboFilterComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._inputNode, '_inputNode');
            FXAudio.Contract.isNotNullOrUndefined(this._outputNode, '_outputNode');
            FXAudio.Contract.isNotNullOrUndefined(this._delayNode, '_delayNode');
            FXAudio.Contract.isNotNullOrUndefined(this._feedbackNode, '_feedbackNode');
            this._inputNode.connect(this._outputNode);
            this._inputNode.connect(this._delayNode);
            this._delayNode.connect(this._outputNode);
            this._delayNode.connect(this._feedbackNode);
            this._feedbackNode.connect(this._inputNode);
        };
        ComboFilterCircuit.prototype._publishComboFilterComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._inputNode, '_inputNode');
            FXAudio.Contract.isNotNullOrUndefined(this._outputNode, '_outputNode');
            this._publishInputComponent(this._inputNode);
            this._publishOutputComponent(this._outputNode);
        };
        return ComboFilterCircuit;
    }(FXAudio.Circuit));
    FXAudio.ComboFilterCircuit = ComboFilterCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var ModulatedComboFilterCircuit = (function (_super) {
        __extends(ModulatedComboFilterCircuit, _super);
        function ModulatedComboFilterCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this._createModulatedComboFilterComponents();
            _this._connectModulatedComboFilterComponents();
            return _this;
        }
        Object.defineProperty(ModulatedComboFilterCircuit.prototype, "lfoNode", {
            get: function () {
                return this._lfoNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModulatedComboFilterCircuit.prototype, "depthNode", {
            get: function () {
                return this._depthNode;
            },
            enumerable: true,
            configurable: true
        });
        ModulatedComboFilterCircuit.prototype._createModulatedComboFilterComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            var audioContext = this.context.audioContext;
            this._depthNode = audioContext.createGain();
            this._lfoNode = audioContext.createOscillator();
            this._lfoNode.start(0);
        };
        ModulatedComboFilterCircuit.prototype._connectModulatedComboFilterComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._lfoNode, '_lfoNode');
            FXAudio.Contract.isNotNullOrUndefined(this._depthNode, '_depthNode');
            FXAudio.Contract.isNotNullOrUndefined(this.delayNode, 'delayNode');
            this._lfoNode.connect(this._depthNode);
            this._depthNode.connect(this.delayNode.delayTime);
        };
        return ModulatedComboFilterCircuit;
    }(FXAudio.ComboFilterCircuit));
    FXAudio.ModulatedComboFilterCircuit = ModulatedComboFilterCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var DEFAULT_FEEDBACK = 0;
    var DEFAULT_DELAY_TIME = 0.010;
    var ChorusCircuit = (function (_super) {
        __extends(ChorusCircuit, _super);
        function ChorusCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this.feedbackNode.gain.value = DEFAULT_FEEDBACK;
            _this.delayNode.delayTime.value = DEFAULT_DELAY_TIME;
            return _this;
        }
        return ChorusCircuit;
    }(FXAudio.ModulatedComboFilterCircuit));
    FXAudio.ChorusCircuit = ChorusCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var DEFAULT_DEPTH = 0.002;
    var DEFAULT_RATE = 0.25;
    var ChorusUnit = (function (_super) {
        __extends(ChorusUnit, _super);
        function ChorusUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.ChorusCircuit(context)) || this;
            _this.depth = DEFAULT_DEPTH;
            _this.rate = DEFAULT_RATE;
            return _this;
        }
        Object.defineProperty(ChorusUnit.prototype, "rate", {
            get: function () {
                return this.circuit.lfoNode.frequency.value;
            },
            set: function (value) {
                this.circuit.lfoNode.frequency.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChorusUnit.prototype, "depth", {
            get: function () {
                return this.circuit.depthNode.gain.value;
            },
            set: function (value) {
                this.circuit.depthNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return ChorusUnit;
    }(FXAudio.Unit));
    FXAudio.ChorusUnit = ChorusUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var FlangerCircuit = (function (_super) {
        __extends(FlangerCircuit, _super);
        function FlangerCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            return _this;
        }
        return FlangerCircuit;
    }(FXAudio.ModulatedComboFilterCircuit));
    FXAudio.FlangerCircuit = FlangerCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var DEFAULT_DEPTH = 0.002;
    var DEFAULT_SPEED = 0.25;
    var DEFAULT_FEEDBACK = 0.5;
    var DEFAULT_DELAY_TIME = 0.005;
    var FlangerUnit = (function (_super) {
        __extends(FlangerUnit, _super);
        function FlangerUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.FlangerCircuit(context)) || this;
            _this.delayTime = DEFAULT_DELAY_TIME;
            _this.feedback = DEFAULT_FEEDBACK;
            _this.depth = DEFAULT_DEPTH;
            _this.speed = DEFAULT_SPEED;
            return _this;
        }
        Object.defineProperty(FlangerUnit.prototype, "speed", {
            get: function () {
                return this.circuit.lfoNode.frequency.value;
            },
            set: function (value) {
                this.circuit.lfoNode.frequency.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlangerUnit.prototype, "delayTime", {
            get: function () {
                return this.circuit.delayNode.delayTime.value;
            },
            set: function (value) {
                this.circuit.delayNode.delayTime.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlangerUnit.prototype, "depth", {
            get: function () {
                return this.circuit.depthNode.gain.value;
            },
            set: function (value) {
                this.circuit.depthNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlangerUnit.prototype, "feedback", {
            get: function () {
                return this.circuit.feedbackNode.gain.value;
            },
            set: function (value) {
                this.circuit.feedbackNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return FlangerUnit;
    }(FXAudio.Unit));
    FXAudio.FlangerUnit = FlangerUnit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var NUMBER_OF_CHANNELS = 2;
    var DEFAULT_DECAY = 2.0;
    var DEFAULT_TIME = 3;
    var ReverbCircuit = (function (_super) {
        __extends(ReverbCircuit, _super);
        function ReverbCircuit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, context) || this;
            _this._createReverbComponents();
            _this._connectReverbComponents();
            _this._publishReverbComponents();
            return _this;
        }
        Object.defineProperty(ReverbCircuit.prototype, "gainNode", {
            get: function () {
                return this._gainNode;
            },
            enumerable: true,
            configurable: true
        });
        ReverbCircuit.prototype.getTime = function () {
            return this._time;
        };
        ReverbCircuit.prototype.setTime = function (value) {
            this._time = value;
            this._buildImpulseResponse();
        };
        ReverbCircuit.prototype.getDecay = function () {
            return this._decay;
        };
        ReverbCircuit.prototype.setDecay = function (value) {
            this._decay = value;
            this._buildImpulseResponse();
        };
        ReverbCircuit.prototype._createReverbComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            var audioContext = this.context.audioContext;
            this._convolverNode = audioContext.createConvolver();
            this._gainNode = audioContext.createGain();
            this._time = DEFAULT_TIME;
            this._decay = DEFAULT_DECAY;
            this._buildImpulseResponse();
        };
        ReverbCircuit.prototype._connectReverbComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._convolverNode, '_convolverNode');
            FXAudio.Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');
            this._convolverNode.connect(this._gainNode);
        };
        ReverbCircuit.prototype._publishReverbComponents = function () {
            FXAudio.Contract.isNotNullOrUndefined(this._convolverNode, '_convolverNode');
            FXAudio.Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');
            this._publishInputComponent(this._convolverNode);
            this._publishOutputComponent(this._gainNode);
        };
        ReverbCircuit.prototype._buildImpulseResponse = function () {
            FXAudio.Contract.isNotNullOrUndefined(this.context, 'context');
            FXAudio.Contract.isNotNullOrUndefined(this._convolverNode, '_convolverNode');
            var audioContext = this.context.audioContext;
            var rate = audioContext.sampleRate;
            var decay = this._decay;
            var numberOfSamples = rate * this._time;
            var impulseResponse = audioContext.createBuffer(NUMBER_OF_CHANNELS, numberOfSamples, rate);
            var impulseResponseLeft = impulseResponse.getChannelData(0);
            var impulseResponseRight = impulseResponse.getChannelData(1);
            for (var i = 0; i < numberOfSamples; i++) {
                var factor = Math.pow(1 - i / numberOfSamples, decay);
                impulseResponseLeft[i] = (Math.random() * 2 - 1) * factor;
                impulseResponseRight[i] = (Math.random() * 2 - 1) * factor;
            }
            this._convolverNode.buffer = impulseResponse;
        };
        return ReverbCircuit;
    }(FXAudio.Circuit));
    FXAudio.ReverbCircuit = ReverbCircuit;
})(FXAudio || (FXAudio = {}));
var FXAudio;
(function (FXAudio) {
    'use strict';
    var ReverbUnit = (function (_super) {
        __extends(ReverbUnit, _super);
        function ReverbUnit(context) {
            var _this = this;
            FXAudio.Contract.isNotNullOrUndefined(context, 'context');
            _this = _super.call(this, new FXAudio.ReverbCircuit(context)) || this;
            return _this;
        }
        Object.defineProperty(ReverbUnit.prototype, "time", {
            get: function () {
                return this.circuit.getTime();
            },
            set: function (value) {
                this.circuit.setTime(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ReverbUnit.prototype, "decay", {
            get: function () {
                return this.circuit.getDecay();
            },
            set: function (value) {
                this.circuit.setDecay(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ReverbUnit.prototype, "level", {
            get: function () {
                return this.circuit.gainNode.gain.value;
            },
            set: function (value) {
                this.circuit.gainNode.gain.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return ReverbUnit;
    }(FXAudio.Unit));
    FXAudio.ReverbUnit = ReverbUnit;
})(FXAudio || (FXAudio = {}));
//# sourceMappingURL=fxaudio.js.map