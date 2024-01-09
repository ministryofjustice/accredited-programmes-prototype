module.exports = function (router) {
    var version = "v8";

    router.get('/assess/' + version + '/update-status', function (req, res) {
        res.render('/assess/' + version + '/update-status')
    });
    router.post('/assess/' + version + '/update-status', function (req, res) {
        res.redirect('status-history')
    });

    router.get('/assess/' + version + '/deselection/deselection', function (req, res) {
        res.render('/assess/' + version + '/deselection/deselection')
    });
  
    router.post('/assess/' + version + '/deselection/deselection', function (req, res) {
        const deselectionReason = req.session.data['deselection-reason-category']
		if (deselectionReason == 'Motivation and behaviour') {
			res.redirect('motivation-behaviour')
		} 
		else if (deselectionReason == 'Operational') {
				res.redirect('operational')
		}
		else if (deselectionReason == 'Other') {
			res.redirect('other')
		}
		else {
			res.redirect('personal-health')
		}
    });

    router.get('/assess/' + version + '/withdrawal/withdraw-referral', function (req, res) {
        res.render('/assess/' + version + '/withdrawal/withdraw-referral')
    });
  
    router.post('/assess/' + version + '/withdrawal/withdraw-referral', function (req, res) {
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

