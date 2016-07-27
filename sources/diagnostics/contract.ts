/// <reference path="../_references.ts" />


module FXAudio {
    'use strict';


    export class Contract {

        public static requires(condition: boolean, argument: string, message?: string): void {
            if (!condition) {
                throw Errors.argument(argument, message);
            }
        }

        public static isNotNullOrUndefined(value: any, argument: string): void {
            if ((value === null) || (typeof value === 'undefined')) {
                throw Errors.argumentNullOrUndefined(argument);
            }
        }

        public static isPositiveOrZero(value: number, argument: string): void {
            if (value < 0) {
                throw Errors.argumentOutOfRange(argument);
            }
        }
    }
}
