/*
Copyright 2013 Mike Dunn
http://upshots.org/
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(window,$,undefined)
{
    //-- debated on whether to remove "only"
    //-- decision based on it being a shortcut to jQuery's ".css()" method
    $.getStyles = function(source, except)
    {
        source = $(source);

        var dom     = source.get(0),
            style   = (window.getComputedStyle)? window.getComputedStyle(dom, null) : (dom.currentStyle || dom.style),
            product = {};

		$.each(style, function(indexkey, value)
        {
            var name = ( typeof indexkey == 'number' )? value : indexkey;

            if( typeof name == 'string' )
            {
                product[name] = (style.getPropertyValue)? style.getPropertyValue(name) : value;
            }
        });

		// remove any styles specified...
		// be careful on blacklist - sometimes vendor-specific values aren't obvious but will be visible...  e.g., excepting 'color' will still let '-webkit-text-fill-color' through, which will in fact color the text
        $.each(except,function(index,value)
        {
            delete product[value];
        });

		// one way out so we can process blacklist in one spot
		return product;
	};

    //-- updated for chaining
    //-- sugar - source is the selector, dom element or jQuery instance to copy from - except is optional
    $.fn.copyCSS = function(source,except)
    {
        return this.css($.getStyles(source,except));
	};

})(this,jQuery);
