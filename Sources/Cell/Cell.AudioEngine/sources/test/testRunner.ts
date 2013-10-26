/// <reference path="_references.ts" />


module FxAudioEngine.Test {
    'use strict';


    export interface ITestRunner {
        environment: TestEnvironment;
        executeNext();
    }


    export class TestRunner implements ITestRunner {

        private _environment: TestEnvironment;

        private _activeStateIndex: number;

        private _stateProgression: ITestRunnerState[];


        public get environment(): TestEnvironment {
            return this._environment;
        }


        constructor() {
            this._environment = new TestEnvironment();

            this._stateProgression = [
                new LoadTestConfigurationState(this),
                new SetPageTitleState(this),
                new CreateContextState(this),
                new CreateComponentsState(this),
                new ConnectComponentsState(this),
                new LoadAudioDataState(this),
                new StartStreamingState(this)
            ];

            this._activeStateIndex = -1;
        }


        public execute(): void {
            this.executeNext();
        }

        public executeNext(): void {
            this._activeStateIndex++;

            var nextState = this._stateProgression[this._activeStateIndex];

            if (nextState) {
                nextState.execute();
            }
        }
    }
}
