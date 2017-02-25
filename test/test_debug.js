/* jshint*/
/* global describe, it */
"use strict";

var Debug = require( "../debug" );
var expect = require( "chai" ).expect;

describe( "Debug.assert", function(){
    it( "Do nothing when value is true", function(){
        expect( Debug.assert.bind( null, true, "test it" ) ).not.to.throw( Debug.AssertError, /test it/ );
    });

    it( "Throw AssertError when value is false", function(){
        expect( Debug.assert.bind( null, false, "test it", { silent : true }) ).to.throw( Debug.AssertError, /test it/ );
    });
});


