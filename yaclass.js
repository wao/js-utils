"use strict";

var _ = require( "underscore" );
var Debug = require( "./debug" );

// If user doesn't specify a based class, YaBaseClass will be the base class.
function YaBaseClass(){
    this.initialize.apply( this, arguments );
}

YaBaseClass.prototype.initialize = _.noop;

function inherit( pDerivedClass, pBaseClass ){
    pDerivedClass.prototype = _.create( pBaseClass.prototype, {});
    pDerivedClass.prototype.constructor = pDerivedClass;
    pDerivedClass.__super__ = pBaseClass.prototype;
    // pDerivedClass.__superConstructor__ = pBaseClass;
}

function ClassBuilder( funcConstructor ){
    Debug.assert( _.isFunction( funcConstructor ) );
    this.mConstructor = funcConstructor;
    inherit( this.mConstructor, YaBaseClass );
    return this;
}

_.extend( ClassBuilder.prototype, {
    inherit : function( pBaseClass ){
        inherit( this.mConstructor, pBaseClass );
        return this;
    },

    extend : function(){
        var self = this;
        _.each( arguments, function( props ){
            _.extend( self.mConstructor.prototype, props );
        }, this );
        return this;
    },

    extendStatic : function(){
        var self = this;
        _.each( arguments, function( props ){
            _.extend( self.mConstructor, _.omit( props, "__super__", "prototype" ) );
        }, this );
        return this;
    },
});

function newClassBuilder( funcConstructor ){
    return new ClassBuilder( funcConstructor );
}

module.exports = newClassBuilder;
