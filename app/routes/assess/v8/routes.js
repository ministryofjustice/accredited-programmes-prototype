module.exports = function (router) {
    var version = "v8";
    router.get('/assess/' + version + '/update-status', function (req, res) {
        res.render('/assess/' + version + '/update-status')
    });
    router.post('/assess/' + version + '/update-status', function (req, res) {
        res.redirect('status-history')
  });
}

