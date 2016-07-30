/// <reference path="../_references.ts" />


namespace FXAudio {
    'use strict';


    export interface IEventSource {

        addEventListener(eventName: string, eventListener: Function): IEventSource;

        removeEventListener(eventName: string, eventListener: Function): IEventSource;
    }


    export interface IEventCompletionSource extends IEventSource {

        dispatchEvent(eventName, ...eventArgs: any[]): void;
    }


    export class EventSource implements IEventCompletionSource {

        private _events: any = {};


        private _defer(f: Function): void {
            window.setTimeout(f, 0); // TODO: Replace with "true" setImmediate implementation.
        }

        private _dispatchEvent(eventName, ...eventArgs: any[]): void {
            Contract.isNotNullOrUndefined(eventName, 'eventName');

            if (!this._events.hasOwnProperty(eventName)) {
                return;
            }

            const eventListeners: Function[] = this._events[eventName];

            eventListeners.forEach(
                (eventListener) => eventListener.apply(null, eventArgs));
        }


        public addEventListener(eventName: string, eventListener: Function): EventSource {
            Contract.isNotNullOrUndefined(eventName, 'eventName');
            Contract.isNotNullOrUndefined(eventListener, 'eventListener');

            const eventListeners: Function[] = this._events[eventName] || [];
            eventListeners.push(eventListener);

            this._events[eventName] = eventListeners;

            return this;
        }

        public removeEventListener(eventName: string, eventListener: Function): EventSource {
            Contract.isNotNullOrUndefined(eventName, 'eventName');
            Contract.isNotNullOrUndefined(eventListener, 'eventListener');

            if (!this._events.hasOwnProperty(eventName)) {
                return;
            }

            const eventListeners: Function[] = this._events[eventName];
            const eventListenerIndex: number = eventListeners.indexOf(eventListener);

            if (eventListenerIndex < 0) {
                return;
            }

            eventListeners.splice(eventListenerIndex, 1);

            return this;
        }

        public dispatchEvent(eventName, ...eventArgs: any[]): void {
            Contract.isNotNullOrUndefined(eventName, 'eventName');

            const args = arguments;

            this._defer(() => {
                this._dispatchEvent.apply(this, args);
            });
        }
    }
}
