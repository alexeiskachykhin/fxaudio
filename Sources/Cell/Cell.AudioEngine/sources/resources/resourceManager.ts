/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class ResourceManager {
        
        public static getString(resourceKey: ResourceKey, args: any[]): string {
            var resourceStringFormat = ResourceMap.strings[resourceKey];
            var resourceString = ResourceManager.formatString(resourceStringFormat, args);

            return resourceString;
        }


        private static formatString(s: string, args: any[]) {
            var formattedString = s.replace(/{(\d+)}/g, function (match, matchedNumber) {
                var replacement = args[matchedNumber] || match;
                return replacement;
            });

            return formattedString;
        }
    }
}

