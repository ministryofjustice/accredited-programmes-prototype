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
}

