/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=5926017902ed0c65ca47)
 * Config saved to config.json and https://gist.github.com/5926017902ed0c65ca47
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";function n(n){return this.each(function(){var i=t(this),s=i.data("bs.tab");s||i.data("bs.tab",s=new e(this)),"string"==typeof n&&s[n]()})}var e=function(n){this.element=t(n)};e.VERSION="3.2.0",e.prototype.show=function(){var n=this.element,e=n.closest("ul:not(.dropdown-menu)"),i=n.data("target");if(i||(i=n.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),!n.parent("li").hasClass("active")){var s=e.find(".active:last a")[0],a=t.Event("show.bs.tab",{relatedTarget:s});if(n.trigger(a),!a.isDefaultPrevented()){var o=t(i);this.activate(n.closest("li"),e),this.activate(o,o.parent(),function(){n.trigger({type:"shown.bs.tab",relatedTarget:s})})}}},e.prototype.activate=function(n,e,i){function s(){a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),n.addClass("active"),o?(n[0].offsetWidth,n.addClass("in")):n.removeClass("fade"),n.parent(".dropdown-menu")&&n.closest("li.dropdown").addClass("active"),i&&i()}var a=e.find("> .active"),o=i&&t.support.transition&&a.hasClass("fade");o?a.one("bsTransitionEnd",s).emulateTransitionEnd(150):s(),a.removeClass("in")};var i=t.fn.tab;t.fn.tab=n,t.fn.tab.Constructor=e,t.fn.tab.noConflict=function(){return t.fn.tab=i,this},t(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault(),n.call(t(this),"show")})}(jQuery),+function(t){"use strict";function n(n){return this.each(function(){var i=t(this),s=i.data("bs.collapse"),a=t.extend({},e.DEFAULTS,i.data(),"object"==typeof n&&n);!s&&a.toggle&&"show"==n&&(n=!n),s||i.data("bs.collapse",s=new e(this,a)),"string"==typeof n&&s[n]()})}var e=function(n,i){this.$element=t(n),this.options=t.extend({},e.DEFAULTS,i),this.transitioning=null,this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};e.VERSION="3.2.0",e.DEFAULTS={toggle:!0},e.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},e.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e=t.Event("show.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.$parent&&this.$parent.find("> .panel > .in");if(i&&i.length){var s=i.data("bs.collapse");if(s&&s.transitioning)return;n.call(i,"hide"),s||i.data("bs.collapse",null)}var a=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[a](0),this.transitioning=1;var o=function(){this.$element.removeClass("collapsing").addClass("collapse in")[a](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return o.call(this);var r=t.camelCase(["scroll",a].join("-"));this.$element.one("bsTransitionEnd",t.proxy(o,this)).emulateTransitionEnd(350)[a](this.$element[0][r])}}},e.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var n=t.Event("hide.bs.collapse");if(this.$element.trigger(n),!n.isDefaultPrevented()){var e=this.dimension();this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return t.support.transition?void this.$element[e](0).one("bsTransitionEnd",t.proxy(i,this)).emulateTransitionEnd(350):i.call(this)}}},e.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var i=t.fn.collapse;t.fn.collapse=n,t.fn.collapse.Constructor=e,t.fn.collapse.noConflict=function(){return t.fn.collapse=i,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(e){var i,s=t(this),a=s.attr("data-target")||e.preventDefault()||(i=s.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""),o=t(a),r=o.data("bs.collapse"),l=r?"toggle":s.data(),d=s.attr("data-parent"),c=d&&t(d);r&&r.transitioning||(c&&c.find('[data-toggle="collapse"][data-parent="'+d+'"]').not(s).addClass("collapsed"),s[o.hasClass("in")?"addClass":"removeClass"]("collapsed")),n.call(o,l)})}(jQuery),+function(t){"use strict";function n(){var t=document.createElement("bootstrap"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var e in n)if(void 0!==t.style[e])return{end:n[e]};return!1}t.fn.emulateTransitionEnd=function(n){var e=!1,i=this;t(this).one("bsTransitionEnd",function(){e=!0});var s=function(){e||t(i).trigger(t.support.transition.end)};return setTimeout(s,n),this},t(function(){t.support.transition=n(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(n){return t(n.target).is(this)?n.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);

jQuery(document).ready(function($){
    /*collapse*/
    $('.panel-collapse').collapse({toggle: false});
    $('body').on('click', '[data-toggle=collapse-next]', function (e) {
        var parent_id = $(this).data('parent');
        $(parent_id+' .panel-collapse').collapse('hide');
        var $target = $(this).parents('.panel').find('.panel-collapse');
        $target.collapse('toggle');
    });	
	$('a.accordion-toggle').click(function(e) {
        e.preventDefault();
        if(!$(this).parent().hasClass('active')) {
            $('.panel-title').removeClass('active');
            $(this).parent().addClass('active').next().addClass('active');
        } else {
            $('.panel-title').removeClass('active');
        }
    });

	
});
