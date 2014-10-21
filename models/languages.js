var BeGlobal = require('node-beglobal');
var _ = require('underscore');
var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'mh89nSy1B6Rn6JKzgs5Kwg%3D%3D'
});

var languages = null;

beglobal.languages.all(
  function(err, results) {
    if (err) {
      return console.log(err);
    }
    languages = _.chain(results)
    	.map(function(lang){
    		return {
    			code: lang.from.code,
    			name: lang.from.name
    		};
    	})
    	.uniq(false, function(lang){
    		return lang.code
    	})
    	.value();
  }
);

module.exports = {getLanguages: function(){
	return languages;
}};