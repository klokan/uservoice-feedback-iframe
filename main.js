goog.provide('uservoice.main');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.net.Jsonp');


/**
 * Display the suggestions via UserVoice Public API JSON
 */
uservoice.main = function() {

  var parent = goog.dom.getElement('uv_suggestion_list');

  var jsonp = new goog.net.Jsonp('http://webglearth.uservoice.com/' +
      'api/v1/forums/93887/suggestions.json?client=ltazXkDrZ92eVcXGycKRag');

  jsonp.send({},
      function(data) {
        // console.log(data['suggestions']);
        goog.array.forEach(data['suggestions'],
            function(item) {
              // Create DOM structure to represent the note.
              var newSuggestion = goog.dom.createDom('li', {
                'class': 'uv_suggestion'
              },
              goog.dom.createDom('div', {
                'class': 'uv_votes'
              },
              goog.dom.createDom('div', {
                'class': 'uv_num_votes'
              },
              item['vote_count'].toString()),
              goog.dom.createTextNode('votes')),
              goog.dom.createDom('a', {
                'target': '_blank',
                'href': item['url']
              },
              item['title'])
              /* goog.dom.createDom('a', {
                'target': '_blank',
                'href': item['url'],
                'class': 'uv_comments'
              },
              item['title']), */
              );
              // Add the note's DOM structure to the document.
              goog.dom.appendChild(parent, newSuggestion);
            });
      });

  /*
<li class="uv_suggestion">
  <div class="uv_votes"><div class="uv_num_votes">1243</div>votes</div>
  <a href="http://link/" target="_blank">This is the title of a suggestion</a>
  <a href="http://link/" class="uv_comments">5&nbsp;comments</a>
</li>
  */

};

window['main'] = uservoice.main;
