/// <reference path="_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    interface ITestRunner {
        environment: ITestEnvironment;
        executeNext(state: ITestRunnerState);
    }

    interface ITestEnvironment {
        configurationFileUrl: string;
        configuration: any;
        audioDataFileUrl: string;
        audioData: ArrayBuffer;
        context: Context;
        components: Unit<any>[];
    }

    interface ITestRunnerState {
        execute(): void;
    }


    class TestRunner implements ITestRunner {

        private _environment: ITestEnvironment = {
            configurationFileUrl: '../nova/bufferSourceUnit.json',
            configuration: null,
            audioDataFileUrl: '../fixtures/audio/sample.mp3',
            audioData: null,
            context: null,
            components: []
        };


        public get environment(): ITestEnvironment {
            return this._environment;
        }


        public execute(): void {
            this.executeNext(new LoadTestConfigurationState(this));
        }

        public executeNext(state: ITestRunnerState): void {
            state.execute();
        }
    }


    class LoadTestConfigurationState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            var configurationFileUrl: string = this._testRunner.environment.configurationFileUrl;
            var request = new XMLHttpRequest();

            request.open('GET', configurationFileUrl, true);

            request.addEventListener('load', () => {
                var configuration = JSON.parse(request.responseText);

                this._testRunner.environment.configuration = configuration;
                this._testRunner.executeNext(new SetPageTitleState(this._testRunner));
            });

            request.send();
        }
    }

    class SetPageTitleState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            document.title = this._testRunner.environment.configuration.title;

            this._testRunner.executeNext(new CreateContext(this._testRunner));
        }
    }

    class CreateContext implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            this._testRunner.environment.context = new RealTimeContext();
            this._testRunner.executeNext(new CreateComponentsState(this._testRunner));
        }
    }

    class CreateComponentsState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            var componentDeclarations = this._testRunner.environment.configuration.components;
            var componentContext = this._testRunner.environment.context;

            for (var componentId in componentDeclarations) {
                if (!componentDeclarations.hasOwnProperty(componentId)) {
                    continue;
                }

                var componentDeclaration = componentDeclarations[componentId];
                var componentConstructor = this._resolveObject(componentDeclaration.type);

                var component = new componentConstructor(componentContext);

                this._testRunner.environment.components[componentId] = component;
            }

            this._testRunner.executeNext(new ConnectComponentsState(this._testRunner));
        }


        private _resolveObject<T>(objectPath: string): T {
            var pathPieces = objectPath.split('.');
            var currentObject = window;

            for (var i = 0; i < pathPieces.length; i++) {
                currentObject = currentObject[pathPieces[i]];
            }

            return <T><any>currentObject;
        }
    }

    class ConnectComponentsState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            var components = this._testRunner.environment.components;
            var connectionDeclarations = this._testRunner.environment.configuration.connections;

            for (var componentId in connectionDeclarations) {
                if (!connectionDeclarations.hasOwnProperty(componentId)) {
                    continue;
                }

                var connectionDeclaration: Array = connectionDeclarations[componentId];
                var sourceComponent = components[componentId];

                connectionDeclaration.forEach((targetComponentId: string) => {
                    var targetComponent = components[targetComponentId];
                    sourceComponent.ports.outputs[0].connect(targetComponent.ports.inputs[0]);
                });
            }

            this._testRunner.executeNext(new LoadAudioDataState(this._testRunner));
        }
    }

    class LoadAudioDataState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            var audioDataFileUrl: string = this._testRunner.environment.audioDataFileUrl;
            var request = new XMLHttpRequest();

            request.open('GET', audioDataFileUrl, true);
            request.responseType = 'arraybuffer';

            request.addEventListener('load', (e) => {
                this._testRunner.environment.audioData = request.response;
                this._testRunner.executeNext(new StartStreamingState(this._testRunner));
            });

            request.send();
        }
    }

    class StartStreamingState implements ITestRunnerState {

        private _testRunner: ITestRunner;


        constructor(testRunner: ITestRunner) {
            this._testRunner = testRunner;
        }


        public execute(): void {
            var components = this._testRunner.environment.components;

            for (var componentId in components) {
                if (!components.hasOwnProperty(componentId)) {
                    continue;
                }

                var component = components[componentId];

                if (component instanceof BufferSourceUnit) {
                    var bufferSourceUnit = <BufferSourceUnit>component;
                    var audioData = this._testRunner.environment.audioData;

                    var initOperation = bufferSourceUnit.init(audioData);

                    initOperation.addEventListener('success', function () {
                        bufferSourceUnit.stream.start(0);
                    });
                }
            }
        }
    }


    export class Bootstrapper {

        static run() {
            var testRunner = new TestRunner();
            testRunner.execute();
        }
    }
}

FxAudioEngine.Test.Bootstrapper.run();
