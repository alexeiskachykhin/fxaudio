/// <reference path="../_references.ts" />


namespace FXAudio {
    'use strict';


    export class ResourceManager {
        
        public static getString(resourceKey: ResourceKey, args: any[]): string {
            const resourceStringFormat = ResourceMap.strings[resourceKey];
            const resourceString = ResourceManager.formatString(resourceStringFormat, args);

            return resourceString;
        }


        private static formatString(s: string, args: any[]) {
            const formattedString = s.replace(/{(\d+)}/g, function (match, matchedNumber) {
                const replacement = args[matchedNumber] || match;
                return replacement;
            });

            return formattedString;
        }
    }
}

