var data = {};
var templateString = '\
<style>.pica-content:hover, .pica-content:active {background-color: #E8E8E8;} a.pica-button:link {background-color: white; border: 2px solid; padding: 10px 20px; text-align: center; text-decoration: none !important; border-radius: .125rem;} a.pica-button:hover, a.pica-button:active {background-color: #E8E8E8;} .pica-image {border-radius: 100%; width: 75px; height: 75px; object-fit: cover; object-position: center;}</style> \
<h3>Recent articles by [[ tpl_data['name'] ]]</h3> \
<br><div class="[[ tpl_data['test_selector'] ]]" style="display: flex; flex-wrap: wrap; justify-content: space-between;"> \
<% posts.forEach(function(post) { %> \
<% if (post.assetId != assetId) { %> \
<div class="pica-content" style="padding: 12px; max-width: 385px; display: flex; align-items: center; justify-content: space-between; border: 1px solid grey; margin-bottom: 18px; border-radius: .25rem;"> \
<div style="margin-right: 12px;"><img class="pica-image" src="<%= post.thumbnailUrl %>"></div> \
<p><a \
style="text-decoration: none !important; font-family: georgia, times, serif;font-weight: bold;" \
href="/<%= post.rootCategory %>-story/<%= post.assetId %>-<%= post.titleAlias %>/?utm_source=[[ tpl_data['site'] ]]&utm_medium=articleinline&utm_campaign=engagement&utm_content=textlink&utm_term=<%= post.assetId %>"> \
<%= post.title %> \
</a></p> \
</div> \
<% } %> \
<% }); %> \
 \
</div> \
<p style="margin-top: 16px;"> \
<a target="_blank" class="pica-button" href="/\
[[ tpl_data['region'] ]]-author/[[ tpl_data['name_encode'] ]]/[[ tpl_data['uid'] ]]/?utm_source=[[ tpl_data['site'] ]]&utm_medium=articleinline&utm_campaign=engagement&utm_content=textlink"> \
<small>MORE ARTICLES</small> \
</a></p> \
';

(function(){
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
})();

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
		}
	};
	request.onerror = function() {
	};
	request.send();
}

function applyTemplate(data) {
	var targets = document.querySelectorAll('[[ !tpl_data['target_selector'] ]]');
	targets.forEach(function(el, i) {
		el.innerHTML = tmpl(templateString, data);
	});
}

var matches = document.querySelectorAll('.' + '[[ !tpl_data['test_selector'] ]]');
if (matches.length == 0) {
	try {
		var assetId = ( (window.location.pathname.match(/\d{7}/))[0] );
	}
	catch(err) {
    var assetId = '';  
  }
	getJson('[[ !tpl_data['url'] ]]', assetId);
} else {
	console.log("Already done");
}
