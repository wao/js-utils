/* jshint expr:true*/
// eslint-disable-next-line no-unused-vars
/* global describe, it, before, after, beforeEach, afterEach */
"use strict";

var Debug = require( "../debug" );
var expect = require( "chai" ).expect;

// eslint-disable-next-line no-unused-vars
var Sinon = require( "sinon" );

var yaClass = require( "../yaclass" );

function BaseClass(){
    this.mBase = 100;
}

function MyClass(){
    MyClass.__super__.constructor.apply( this, arguments );

    this.mSub = 200;
}

yaClass( MyClass ).inherit( BaseClass ).extend({
    base : function(){
        return this.mBase;
    },

    sub : function(){
        return this.mSub;
    },
});

describe( "yaclass", function(){
    it( "define class can be initialize", function(){
        expect( new MyClass() ).to.be.instanceof( MyClass );
    });

    it( "to be a instance of super class", function(){
        expect( new MyClass() ).to.be.instanceof( BaseClass );
    });

    it( "setup __super__.constrctor to be a super class", function(){
        expect( MyClass.__super__.constructor ).to.be.equals( BaseClass );
    });

    it( "call super constructor", function(){
        expect( ( new MyClass() ).base() ).to.be.equals( 100 );
    });

    it( "define a class without specify BaseClass will automatic subclass which call initialize()", function(){
        var MyClass = function(){
            Debug.assert( "constructor" in MyClass.__super__ );
            MyClass.__super__.constructor.apply( this, arguments );
        };

        yaClass( MyClass ).extend({
            initialize : function(){
                this.called = 100;
            },
        });

        var a = new MyClass();

        expect( a.called ).to.be.equals( 100 );
    });
});
