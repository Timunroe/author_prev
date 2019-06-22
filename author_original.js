// Customized version of https://gist.github.com/furf/646361, 
// which is based on https://johnresig.com/blog/javascript-micro-templating/

var data = {
	name: "Matthew Van Dongen",
	name_encode: "matthew-van-dongen",
	guid: "70c601f0-79a5-4189-b1da-147f61545d27",
  site: "thespec", 
	region: "hamilton",
	picaTargetClass: '#div1786 div, #div3795 div, #div4681 div',
	// otherwise, it's '.pica-target' for manual insertion
	picaTestClass: '.pica-results',
};

var url = "https://api.zuza.com/search/article/default?guid=" +
		data.guid +
		"&pageIndex=1&location=" +
		data.region +
		"&sort=datedesc&pageSize=15&startindex=1&endindex=5";

// define template
var templateString = '\
<style>.pica-content:hover, .pica-content:active {background-color: #E8E8E8;} a.pica-button:link {background-color: white; border: 2px solid; padding: 10px 20px; text-align: center; text-decoration: none !important; border-radius: .125rem;} a.pica-button:hover, a.pica-button:active {background-color: #E8E8E8;} .pica-image {border-radius: 100%; width: 75px; height: 75px; object-fit: cover; object-position: center;}</style> \
<h3>Recent articles by <%= name %></h3> \
<br><div class="<%= picaTestClass %>" style="display: flex; flex-wrap: wrap; justify-content: space-between;"> \
<% posts.forEach(function(post) { %> \
<% if (post.assetId != assetId) { %> \
<div class="pica-content" style="padding: 12px; max-width: 385px; display: flex; align-items: center; justify-content: space-between; border: 1px solid grey; margin-bottom: 18px; border-radius: .25rem;"> \
<div style="margin-right: 12px;"><img class="pica-image" src="<%= post.thumbnailUrl %>"></div> \
<p><a \
style="text-decoration: none !important; font-family: georgia, times, serif;font-weight: bold;" \
href="/<%= post.rootCategory %>-story/<%= post.assetId %>-<%= post.titleAlias %>/?utm_source=thespec&utm_medium=articleinline&utm_campaign=engagement&utm_content=textlink&utm_term=<%= post.assetId %>"> \
<%= post.title %> \
</a></p> \
</div> \
<% } %> \
<% }); %> \
 \
</div> \
<p style="margin-top: 16px;"> \
<a target="_blank" class="pica-button" href="/\
<%= region %>-author/<%= name_encode %>/<%= guid %>/?utm_source=<%= site %>&utm_medium=articleinline&utm_campaign=engagement&utm_content=textlink"> \
<small>MORE ARTICLES</small> \
</a></p> \
';

(function(){ // IIFE
	// TEMPLATE
  var cache = {};
  this.tmpl = function tmpl(str, data){
    var fn = cache[str] ?
      cache[str] :

      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    return data ? fn( data ) : fn;
  };
})(); // END IIFE

function getJson(url, currentId) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			console.log("success");
			var results = JSON.parse(request.responseText);
			data.posts = results["searchResultView"];
			data.assetId = currentId;
			applyTemplate(data);
		} else {
			// We reached our target server, but it returned an error
		}
	};
	request.onerror = function() {
		// There was a connection error of some sort
	};
	request.send();
} // END FUNC 

function applyTemplate(data) {
	var targets = document.querySelectorAll(data.picaTargetClass);
	// apply template results to target elements
	targets.forEach(function(el, i) {
		el.innerHTML = tmpl(templateString, data);
	});
} // END FUNC

// MAIN START
// 
var matches = document.querySelectorAll(data.picaTestClass);
if (matches.length == 0) { // RUN CHECK
	try {
		var assetId = ( (window.location.pathname.match(/\d{7}/))[0] );
	}
	catch(err) {
    var assetId = '';  
  }
	getJson(url, assetId);
	// dummy(picaTargetClass, templateString);
} else { // END RUN CHECK
	console.log("Already done");
}
// MAIN END
