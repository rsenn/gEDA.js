
// Voltage units
Volt = 1;
mV = 0.001;

/*
 * Logic levels
 * 
 * Read more:
 * https://de.wikipedia.org/wiki/Logikpegel
 * https://en.wikipedia.org/wiki/Logic_level
 */
CMOS = 'CMOS';
TTL = 'TTL';

PARSER_ROOT = 'js/parsers';

//Capture JS errors from js files called using the $.getScript function
$.extend({
    getScript: function (url, callback) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = url;
        head.appendChild(script);
        return undefined;
    },
});

$.getScript(PARSER_ROOT+'/gaf.js');

/*
 * Stall execution of main, until all dependencies are resolved
 */
var handle = window.setInterval(function()
                                { 
                                    if ( typeof GAF != 'undefined' && typeof GAF_Object != 'undefined' )
                                    {
                                        window.clearInterval(handle);
                                        main();
                                    }
                                }, 1000);

/*
 * When document and all scripts are ready:
 * Import all schematics in document
 */
function main()
{
    var schematics = [];
    var elmt = $('geda-schematic');
    console.log(elmt.length+' schematic(s) found in document.');
    for (var i=0; i<elmt.length; i++)
    {
        elmt[i] = $(elmt[i]);
        // import model from enclosed text
        schematics.push( new GAF(elmt[i].html()) );
        // add imported schematic to DOM
        schematics[i]
            .exportDOM( $('<geda-schematic format="application/gaf-xml"></geda-schematic>') )
            .insertAfter( elmt[i] );
        elmt[i].css('display','none');
    }
};

/*
 * Register <geda-schematic> as valid HTML element
 *
 * http://www.w3.org/TR/custom-elements/
 * http://www.html5rocks.com/en/tutorials/webcomponents/customelements/
 */
geda_schematic = document.registerElement('geda-schematic');

// TODO: Register an element after it was created (onload) -> immediately pipe to importer
