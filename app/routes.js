//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
require('./routes/assess/v6/routes.js')(router);
require('./routes/assess/v7/routes.js')(router);
require('./routes/assess/v8/routes.js')(router);
require('./routes/refer/v9/routes.js')(router);



router.get('/refer/features/withdrawal/v1/withdraw-referral', function (req, res) {
  res.render('/refer/features/withdrawal/v1/withdraw-referral')
});

router.post('/refer/features/withdrawal/v1/withdraw-referral', function (req, res) {
	const withdrawalReason = req.session.data['reason-category']
    	if (withdrawalReason == 'Personal and health') {
			res.redirect('personal-health')
     	} 
		else if (withdrawalReason == 'Motivation and behaviour') {
       		res.redirect('motivation-behaviour')
     	}
		else if (withdrawalReason == 'Operational') {
			res.redirect('operational')
	  	}
		else if (withdrawalReason == 'Administrative error') {
			res.redirect('administrative-error')
	  	}
		else {
			res.redirect('other')
	  	}
 	});

	router.get('/refer/features/withdrawal/v2/withdraw-referral', function (req, res) {
		res.render('/refer/features/withdrawal/v2/withdraw-referral')
	});
	  
	router.post('/refer/features/withdrawal/v2/withdraw-referral', function (req, res) {
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


router.get('/assess/features/deselection/v1/deselection', function (req, res) {
		res.render('/assess/features/deselection/v1/deselection')
	});
	  

router.post('/assess/features/deselection/v1/deselection', function (req, res) {
	const deselectionReason = req.session.data['deselection-reason-category']
		if (deselectionReason == 'Personal and health') {
			res.redirect('personal-health')
		} 
		else if (deselectionReason == 'Group management') {
				res.redirect('group-management')
		}
		else if (deselectionReason == 'Operational') {
			res.redirect('operational')
		}
		else {
			res.redirect('other')
		}
	});

router.get('/assess/features/deselection/v2/deselection', function (req, res) {
		res.render('/assess/features/deselection/v2/deselection')
	});
	  
router.post('/assess/features/deselection/v2/deselection', function (req, res) {
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
