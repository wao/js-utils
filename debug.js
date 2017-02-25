/* jshint debug:true */
"use strict";

var logger = require( "logger" )();

/**
 * Provide method help to debug application
 *
 * @namespace
 */
var Debug = {
    AssertError : Error,

    /**
     * Raise Debug.AssertError if valueOrFunctionOrString is evaluated as false
     *
     * @param { Function } valueOrFunctionOrString expr expect to be true
     * @param { String } msg Message will be output when assert failed
     * @param { Object } options Configure for this call. It contains
     *             options.slient -- indicate if print error log to console object when failed
     */
    assert : function( valueOrFunctionOrString, msg, options ){
        var value = valueOrFunctionOrString;
        var errMsg;
        var error;
        options = options||{};
        var silent = options.silent || false;

        // FIXME: maybe use this to replace logger.
        // var output = options.console || console;


        // eslint-disable-next-line underscore/prefer-underscore-typecheck
        if( typeof valueOrFunctionOrString === "function" ){
            value = valueOrFunctionOrString.call();
        }

        if( !value ){
            error = new Error( errMsg );
            var location = error.stack.split( "\n" )[ 2 ];
            msg = msg || "";
            errMsg = "Assert Failed: " + msg + location;
            error = new Error( errMsg );
            if( !silent ){
                logger.error( errMsg );
            }

            debugger; // eslint-disable-line

            throw error;
        }
    },
};

module.exports = Debug;

