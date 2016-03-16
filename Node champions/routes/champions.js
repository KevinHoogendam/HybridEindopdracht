var express = require('express');
var router = express.Router();

/*
 * GET championlist.
 */
router.get('/championlist', function(req, res) {
    var db = req.db;
    var collection = db.get('championlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addchampion.
 */
router.post('/addchampion', function(req, res) {
    var db = req.db;
    var collection = db.get('championlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletechampion.
 */
router.delete('/deletechampion/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('championlist');
    var championToDelete = req.params.id;
    collection.remove({ '_id' : championToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;

