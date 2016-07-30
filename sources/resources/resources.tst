/// <reference path="../_references.ts" />


namespace FXAudio {
    'use strict';


    export interface IStringResourceMap {
        [id: number]: string
    }


    export interface IResourceMap {
        strings: IStringResourceMap
    }



    export const ResourceMap: IResourceMap = {
        strings: {}
    };


    export enum ResourceKey {
        <% _.forEach(strings, function(value, key) { %>
            <%= key %>,
        <% }); %>
    }

    <% _.forEach(strings, function(value, key) { %>
        ResourceMap.strings[ResourceKey.<%= key %>] = '<%= value %>';
    <% }); %>
}
