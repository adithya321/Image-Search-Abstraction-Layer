module.exports = function(app, db) {
  var historyDB = db.collection('search-history');

  app.get('/:query', function(req, res) {
    var query = req.params.query;
    var size = req.query.offset || 10;
    //var search = new Search(process.env.BING_API_KEY);
    
    var history = {
      "term": query,
      "when": new Date().toLocaleString()
    };
    save(history);

    /*search.images(query, {
      top: size
    }, function(err, results) {
      if (err) throw err;
      res.send(results.map(makeList));
    });*/

    function makeList(img) {
      return {
        "url": img.url,
        "snippet": img.title,
        "thumbnail": img.thumbnail.url,
        "context": img.sourceUrl
      };
    }
  });

  function save(obj, db) {
    historyDB.save(obj, function(err, result) {
      if (err) throw err;
      res.send('Saved ' + result);
    });
  }
};