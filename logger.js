/* jshint evil:true*/

"use strict";

var silent = false;

function Logger(){
    this.logger = console;
}

// var methods = [ "log", "debug", "info", "warn", "error" ];

Logger.prototype.error = function(){
    if( !silent ){
        this.logger.error.apply( this.logger, arguments );
    }
};

module.exports = function(){
    return new Logger();
};

module.exports.toggleSlient = function(){
    silent = !silent;
};
