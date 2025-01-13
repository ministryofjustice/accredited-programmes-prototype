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

router.post('/assess/update-status', function (req, res) {
	const referralSubmitted = req.session.data['referral-submitted']
    	if (referralSubmitted == 'Awaiting assessment') {
			res.redirect('awaiting-assessment')
     	} 
		else if (referralSubmitted == 'Not eligible') {
       		res.redirect('not-eligible')
     	}
		else if (referralSubmitted == 'On hold') {
			res.redirect('on-hold')
	  	}
		else {
			res.redirect('withdrawal-reason')
	  	}
 	});

router.post('/assess/features/rct/update-status', function (req, res) {
	const referralSubmitted = req.session.data['assessed-suitable']
		if (referralSubmitted == 'On programme') {
			res.redirect('on-programme')
		} 
		else if (referralSubmitted == 'Assessed as suitable but not ready') {
			res.redirect('assessed-suitable-not-ready')
		}
		else {
			res.redirect('#')
		}
	});

router.get('/assess/withdrawal-reason', function (req, res) {
	res.render('/assess/withdrawal-reason')
});
	  
router.post('/assess/withdrawal-reason', function (req, res) {
	const withdrawalReason = req.session.data['reason-category']
		if (withdrawalReason == 'Administrative error') {
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

router.get('/assess/features/withdrawal/v3/withdraw-referral', function (req, res) {
	res.render('/assess/features/withdrawal/v3/withdraw-referral')
});

		
router.post('/assess/features/withdrawal/v3/withdraw-referral', function (req, res) {
	const withdrawalReason = req.session.data['reason-category']
		if (withdrawalReason == 'Administrative error') {
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

/* router.get('/refer/on-hold', function (req, res) {
    res.render('/refer/on-hold')
});
router.post('/refer/on-hold', function (req, res) {
    res.redirect('/refer/status-history')
});*/

router.post('/pni-overrides/assess/v2/a/update-status', function (req, res) {
	const assessedSuitable = req.session.data['assessed-suitable']
    	if (assessedSuitable == 'On hold – assessment not completed') {
			res.redirect('on-hold-assessment')
     	} 
		else if (assessedSuitable == 'Assessed as suitable and ready to continue') {
       		res.redirect('suitable-ready-continue')
     	}
		else if (assessedSuitable == 'Assessed as suitable but not ready') {
			res.redirect('suitable-not-ready')
	  	}
		else if (assessedSuitable == 'Not suitable') {
			res.redirect('not-suitable')
	  	}
		else {
			res.redirect('withdrawal-reason')
	  	}
 	});

router.post('/pni-overrides/assess/v3/a/update-status', function (req, res) {
	const assessedSuitable = req.session.data['assessed-suitable']
		if (assessedSuitable == 'On hold – assessment not completed') {
			res.redirect('on-hold-assessment')
		} 
		else if (assessedSuitable == 'Assessed as suitable and ready to continue') {
			res.redirect('suitable-ready-continue')
		}
		else if (assessedSuitable == 'Assessed as suitable but not ready') {
			res.redirect('suitable-not-ready')
		}
		else if (assessedSuitable == 'Not suitable') {
			res.redirect('not-suitable')
		}
		else {
			res.redirect('withdrawal-reason')
		}
	});

router.get('/refer/withdrawal-category', function (req, res) {
	res.render('/refer/withdrawal-category')
	});
	  
router.post('/refer/withdrawal-category', function (req, res) {
	const withdrawalReason = req.session.data['reason-category']
		if (withdrawalReason == 'Administrative error') {
			res.redirect('administrative-error')
		} 
		else if (withdrawalReason == 'Motivation and behaviour') {
			res.redirect('motivation-behaviour')
		}
		else if (withdrawalReason == 'Operational') {
			res.redirect('operational')
		}
		else if (withdrawalReason == 'Personal and health') {
			res.redirect('personal-health')
		}
		else {
			res.redirect('other')
		}
	});

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

router.get('/refer/features/withdrawal/v3/withdrawal-category', function (req, res) {
	res.render('/refer/features/withdrawal/v3/withdrawal-category')
});

router.post('/refer/features/withdrawal/v3/withdrawal-category', function (req, res) {
	const withdrawalReason = req.session.data['reason-category']
		if (withdrawalReason == 'Administrative error') {
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
		else if (deselectionReason == 'Personal and health') {
			res.redirect('personal-health')
		}
		else {
			res.redirect('other')
		}
	});

// Logging session data  
router.use((req, res, next) => {    
	const log = {  
		method: req.method,  
		url: req.originalUrl,  
		data: req.session.data  
	}  
	console.log(JSON.stringify(log, null, 2))  
	
	next()  
})  

// GET SPRINT NAME - useful for relative templates  
router.use('/', (req, res, next) => {  
	res.locals.currentURL = req.originalUrl; //current screen  
	res.locals.prevURL = req.get('Referrer'); // previous screen
  
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  
	next();  
});

/* Building Choices High (8 pathways) journey */
router.post('/redirect-bc-high-pathways', function(request, response) {

	var high_hso = request.session.data['high_hso'];//
	var high_hwp = request.session.data['high_hwp'];//
  
	if (high_hso === "yes" && high_hwp === "yes"){
	  response.redirect("pni/find/8-building-choices/v1/building-choice-high-yes-yes") // Initial redirect
  
	}
	else if (high_hso === "no" && high_hwp === "yes"){
		response.redirect("pni/find/8-building-choices/v1/building-choice-high-no-yes") // Initial redirect
	
	  }
	else if (high_hso === "no" && high_hwp === "no"){
	  response.redirect("pni/find/8-building-choices/v1/building-choice-high-no-no") // Initial redirect
  
	}
	else {
	  response.redirect("pni/find/8-building-choices/v1/building-choice-high-yes-no")
	}
  })

router.post('/redirect-bc-moderate-pathways', function(request, response) {

	var moderate_hso = request.session.data['moderate_hso'];//
	var moderate_hwp = request.session.data['moderate_hwp'];//
  
	if (moderate_hso === "yes" && moderate_hwp === "yes"){
	  response.redirect("pni/find/8-building-choices/v1/building-choice-moderate-yes-yes") // Initial redirect
  
	}
	else if (moderate_hso === "no" && moderate_hwp === "yes"){
		response.redirect("pni/find/8-building-choices/v1/building-choice-moderate-no-yes") // Initial redirect
	
	  }
	else if (moderate_hso === "no" && moderate_hwp === "no"){
	  response.redirect("pni/find/8-building-choices/v1/building-choice-moderate-no-no") // Initial redirect
  
	}
	else {
	  response.redirect("pni/find/8-building-choices/v1/building-choice-moderate-yes-no")
	}
  })

/* Main FIND prototype journey */
router.post('/redirect-bc-high', function(request, response) {

	var high_hso = request.session.data['high_hso'];//
	var high_hwp = request.session.data['high_hwp'];//
  
	if (high_hso === "yes" && high_hwp === "yes"){
	  response.redirect("find/building-choices/building-choice-high-yes-yes") // Initial redirect
  
	}
	else if (high_hso === "no" && high_hwp === "yes"){
		response.redirect("find/building-choices/building-choice-high-no-yes") // Initial redirect
	
	  }
	else if (high_hso === "no" && high_hwp === "no"){
	  response.redirect("find/building-choices/building-choice-high-no-no") // Initial redirect
  
	}
	else {
	  response.redirect("find/building-choices/building-choice-high-yes-no")
	}
})

router.post('/redirect-bc-moderate', function(request, response) {

	var moderate_hso = request.session.data['moderate_hso'];//
	var moderate_hwp = request.session.data['moderate_hwp'];//
  
	if (moderate_hso === "yes" && moderate_hwp === "yes"){
	  response.redirect("find/building-choices/building-choice-moderate-yes-yes") // Initial redirect
  
	}
	else if (moderate_hso === "no" && moderate_hwp === "yes"){
		response.redirect("find/building-choices/building-choice-moderate-no-yes") // Initial redirect
	
	  }
	else if (moderate_hso === "no" && moderate_hwp === "no"){
	  response.redirect("find/building-choices/building-choice-moderate-no-no") // Initial redirect
  
	}
	else {
	  response.redirect("find/building-choices/building-choice-moderate-yes-no")
	}
})

/* Version 2 - Branch A (Recommended programmes (Moderate to High intensity) */
router.post('/redirect-bc-high-v2a', function(request, response) {

	var high_hso = request.session.data['high_hso'];//
  
	if (high_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/a/building-choices/building-choice-high-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/a/building-choices/building-choice-high-no")
	}
})

router.post('/redirect-bc-moderate-v2a', function(request, response) {

	var moderate_hso = request.session.data['moderate_hso'];//
  
	if (moderate_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/a/building-choices/building-choice-moderate-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/a/building-choices/building-choice-moderate-no")
	}
})

/* Version 2 - Branch B (Recommended programmes (High to Moderate intensity) */
router.post('/redirect-bc-high-v2b', function(request, response) {

	var high_hso = request.session.data['high_hso'];//
  
	if (high_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/b/building-choices/building-choice-high-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/b/building-choices/building-choice-high-no")
	}
})

router.post('/redirect-bc-moderate-v2b', function(request, response) {

	var moderate_hso = request.session.data['moderate_hso'];//
  
	if (moderate_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/b/building-choices/building-choice-moderate-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/b/building-choices/building-choice-moderate-no")
	}
})

/* Version 2 - Branch C (Recommended programmes (Not eligible) */
router.post('/redirect-bc-high-v2c', function(request, response) {

	var high_hso = request.session.data['high_hso'];//
  
	if (high_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/c/building-choices/building-choice-high-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/c/building-choices/building-choice-high-no")
	}
})

router.post('/redirect-bc-moderate-v2c', function(request, response) {

	var moderate_hso = request.session.data['moderate_hso'];//
  
	if (moderate_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/c/building-choices/building-choice-moderate-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/c/building-choices/building-choice-moderate-no")
	}
})

/* Version 2 - Branch D (Recommended programmes (All information missing) */
router.post('/redirect-bc-high-v2d', function(request, response) {

	var high_hso = request.session.data['high_hso'];//
  
	if (high_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/d/building-choices/building-choice-high-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/d/building-choices/building-choice-high-no")
	}
})

router.post('/redirect-bc-moderate-v2d', function(request, response) {

	var moderate_hso = request.session.data['moderate_hso'];//
  
	if (moderate_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/d/building-choices/building-choice-moderate-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/d/building-choices/building-choice-moderate-no")
	}
})

/* Version 2 - Branch E (Recommended programmes (Some information missing) */
router.post('/redirect-bc-high-v2e', function(request, response) {

	var high_hso = request.session.data['high_hso'];//
  
	if (high_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/e/building-choices/building-choice-high-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/e/building-choices/building-choice-high-no")
	}
})

router.post('/redirect-bc-moderate-v2e', function(request, response) {

	var moderate_hso = request.session.data['moderate_hso'];//
  
	if (moderate_hso === "yes"){
	  response.redirect("pni-overrides/find/v2/e/building-choices/building-choice-moderate-yes") // Initial redirect
  
	}
	else {
	  response.redirect("pni-overrides/find/v2/e/building-choices/building-choice-moderate-no")
	}
})