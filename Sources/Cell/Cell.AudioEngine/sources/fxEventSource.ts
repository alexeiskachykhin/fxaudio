module FxAudioEngine {
    'use strict';


    export interface IFxEventSource {

        addEventListener(eventName: string, eventListener: Function): IFxEventSource;

        removeEventListener(eventName: string, eventListener: Function): IFxEventSource;
    }


    export interface IFxEventCompletionSource extends IFxEventSource {

         dispatchEvent(eventName, ...eventArgs: any[]): void;
    }


    export class FxEventSource implements IFxEventCompletionSource {

        private _events: any = {};


        private _defer(f: Function): void {
            window.setTimeout(f, 0); // TODO: Replace with "true" setImmediate implementation.
        }

        private _dispatchEvent(eventName, ...eventArgs: any[]): void {
            if (!this._events.hasOwnProperty(eventName)) {
                return;
            }


            var eventListeners: Function[] = this._events[eventName];

            eventListeners.forEach(
                (eventListener) => eventListener.apply(null, eventArgs));
        }


        public addEventListener(eventName: string, eventListener: Function): FxEventSource {
	        if (typeof eventListener !== 'function') {
	            throw new TypeError('Event listener is not a function.');
            }


            var eventListeners: Function[] = this._events[eventName] || [];
            eventListeners.push(eventListener);

            this._events[eventName] = eventListeners;

            return this;
        }

        public removeEventListener(eventName: string, eventListener: Function): FxEventSource {
            if (!this._events.hasOwnProperty(eventName)) {
                return;
            }


            var eventListeners: Function[] = this._events[eventName];
            var eventListenerIndex: number = eventListeners.indexOf(eventListener);

            if (eventListenerIndex < 0) {
                return;
            }

            eventListeners.splice(eventListenerIndex, 1);

            return this;
        }

        public dispatchEvent(eventName, ...eventArgs: any[]): void {
            var args = arguments;

            this._defer(() => {
                this._dispatchEvent.apply(this, args);
            });
        }
    }
}	
