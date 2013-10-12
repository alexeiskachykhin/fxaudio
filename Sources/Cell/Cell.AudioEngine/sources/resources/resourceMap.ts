/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export interface IStringResourceMap {
        [id: number]: string
    }


    export interface IResourceMap {
        strings: IStringResourceMap
    }



    export var ResourceMap: IResourceMap = {
        strings: {}
    };

    ResourceMap.strings[ResourceKey.ARGUMENT_ERROR_MESSAGE] = 'Invalid argument {0}: {1}.';
    ResourceMap.strings[ResourceKey.ARGUMENT_OUT_OF_RANGE_ERROR_MESSAGE] = 'Argument out of range {0}.';
    ResourceMap.strings[ResourceKey.ARGUMENT_NULL_OR_UNDEFINED_ERROR_MESSAGE] = 'Argument is null or empty {0}.';
    ResourceMap.strings[ResourceKey.ABSTRACT_ERROR_MESSAGE] = 'This method is abstract.';
    ResourceMap.strings[ResourceKey.NOT_YET_IMPLEMENTED_ERROR_MESSAGE] = 'Not implemented.';
    ResourceMap.strings[ResourceKey.INVALID_OPERATION_ERROR_MESSAGE] = 'Invalid operation: {0}.';
}
