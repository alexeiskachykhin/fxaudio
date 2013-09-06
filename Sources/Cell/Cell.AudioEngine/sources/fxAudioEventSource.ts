module FxAudioEngine {
    'use strict';


    export interface IFxAudioEventSource {

        addEventListener(eventName: string, eventListener: Function): IFxAudioEventSource;

        removeEventListener(eventName: string, eventListener: Function): IFxAudioEventSource;
    }


    export interface IFxAudioEventCompletionSource extends IFxAudioEventSource {

         dispatchEvent(eventName, ...eventArgs: any[]): void;
    }


    export class FxAudioEventSource implements IFxAudioEventCompletionSource {

        private _events: any = {};


        public addEventListener(eventName: string, eventListener: Function): FxAudioEventSource {
	        if (typeof eventListener !== 'function') {
	            throw new TypeError('Event listener is not a function.');
            }


            var eventListeners: Function[] = this._events[eventName] || [];
            eventListeners.push(eventListener);

            this._events[eventName] = eventListeners;

            return this;
        }

        public removeEventListener(eventName: string, eventListener: Function): FxAudioEventSource {
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
            if (!this._events.hasOwnProperty(eventName)) { 
                return; 
            }


            var eventListeners: Function[] = this._events[eventName]; 

            eventListeners.forEach(
                (eventListener) => eventListener.apply(null, eventArgs));
        }
    }
}	
