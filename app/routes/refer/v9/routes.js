module.exports = function (router) {
    var version = "v9";

    router.get('/refer/' + version + '/update-status', function (req, res) {
        res.render('/refer/' + version + '/update-status')
    });
    router.post('/refer/' + version + '/update-status', function (req, res) {
        res.redirect('status-history')
    });

    router.get('/refer/' + version + '/withdraw-referral', function (req, res) {
        res.render('/refer/' + version + '/withdraw-referral')
    });
  
    router.post('/refer/' + version + '/withdraw-referral', function (req, res) {
        const withdrawalReason = req.session.data['reason-category']
        if (withdrawalReason == 'Administrative error (referrers only)') {
            res.redirect('administrative-error')
        } 
        else if (withdrawalReason == 'Motivation and behaviour') {
                res.redirect('motivation-behaviour')
        }
        else if (withdrawalReason == 'Operational') {
            res.redirect('operational')
        }
        else if (withdrawalReason == 'Other') {
            res.redirect('other')
        }
        else {
            res.redirect('personal-health')
        }
    });
}



