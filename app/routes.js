//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/* CUSTODY */

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

router.post('/pni-overrides/assess/v4/a/update-status', function (req, res) {
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


/* HSP referrals */
router.post('/redirect-conviction-yes', function(request, response) {

	var hsp_yes = request.session.data['hsp_conviction'];//
  
	if (hsp_yes === "yes"){
	  response.redirect("hsp/find/v1/a/conviction-yes") // Initial redirect
  
	}
	else {
	  response.redirect("hsp/find/v1/a/conviction-no")
	}
})

router.post('/redirect-sexual-offence-18-over', function(request, response) {

	var age_18_over = request.session.data['sexual_offence_details'];//
	var age_18_under = request.session.data['sexual_offence_details'];//
  
	if (age_18_over === "committed against someone aged 18 or older"){
	  response.redirect("hsp/find/v1/a/sexual-offence-18-over") // Initial redirect
  
	}
	else if (age_18_under === "committed against someone aged under 18"){
	  response.redirect("hsp/find/v1/a/sexual-offence-under-18")
	}
	else {
		response.redirect("hsp/find/v1/a/not-eligible-for-hsp")
	  }
})

router.post('/sexual-offence-category-answer', function(request, response) {
    var sexualOffenceCategory = request.session.data['sexual_offence_category']
    if (sexualOffenceCategory.includes("committed against someone aged under 18") 
        && sexualOffenceCategory.includes("committed against someone aged 18 or older")){
        response.redirect("hsp/find/v1/a/sexual-offence-under-18-over")
    } 
    else if (sexualOffenceCategory.includes("exhibitionism") 
        && sexualOffenceCategory.includes("frotteurism")){
        response.redirect("hsp/refer/start-now")
    } 
    else if (sexualOffenceCategory.includes("committed against someone aged under 18")){
        response.redirect("hsp/find/v1/a/sexual-offence-under-18")
    } 
    else if (sexualOffenceCategory.includes("committed against someone aged 18 or older")){
        response.redirect("hsp/find/v1/a/sexual-offence-18-over")
    }
    else if (sexualOffenceCategory.includes("exhibitionism")){
        response.redirect("hsp/find/v1/a/not-eligible-for-hsp")
    }
    else if (sexualOffenceCategory.includes("frotteurism")){
        response.redirect("hsp/find/v1/a/not-eligible-for-hsp")
    }
    else if (sexualOffenceCategory.includes("voyeurism")){
        response.redirect("hsp/find/v1/a/not-eligible-for-hsp")
    }
    else if (sexualOffenceCategory.includes("sexual murder")){
        response.redirect("hsp/refer/start-now")
    }
    else if (sexualOffenceCategory.includes("sexual penetration of a corpse")){
        response.redirect("hsp/refer/start-now")
    }
    else {
        response.redirect("hsp/find/v1/a/not-eligible-for-hsp")
    }
})

router.post('/sexual-offence-details-answer', function(request, response) {
    var sexualOffenceDetails = ""; 
    if(request.session.data['sexual_offence_details'] == undefined  ||
           request.session.data['sexual_offence_details'].length == 0) 
        {
                        
        }
    else {
        sexualOffenceDetails = request.session.data['sexual_offence_details'];
    }
    
    if (sexualOffenceDetails.includes("A victim aged 12 or younger") 
        && sexualOffenceDetails.includes("A male victim aged 15 or younger")
        && sexualOffenceDetails.includes("More than one victim aged 15 or younger")){
        response.redirect("hsp/refer/v1/b/start-now")
    } 
    else if (sexualOffenceDetails.includes("Self-reported sexual attraction to under-18s")){
        response.redirect("hsp/refer/v1/b/start-now")
    } 
    else {
        response.redirect("hsp/find/v1/b/not-eligible-for-hsp")
    }
})

router.post('/sexual-offence-details-answer-v2', function(request, response) {
    var sexualOffenceDetails = ""; 
    if(request.session.data['sexual_offence_details'] == undefined  ||
           request.session.data['sexual_offence_details'].length == 0) 
        {
                        
        }
    else {
        sexualOffenceDetails = request.session.data['sexual_offence_details'];
    }
    
    if (sexualOffenceDetails.includes("A victim aged 12 or younger") 
        && sexualOffenceDetails.includes("A male victim aged 15 or younger")
        && sexualOffenceDetails.includes("More than one victim aged 15 or younger")){
        response.redirect("hsp/refer/v2/b/start-now")
    } 
    else if (sexualOffenceDetails.includes("Self-reported sexual attraction to under-18s")){
        response.redirect("hsp/refer/v2/b/start-now")
    } 
    else {
        response.redirect("hsp/find/v2/b/not-eligible-for-hsp")
    }
})

/* All - Branch A (Recommended programmes (Moderate to High intensity) */
router.post('/redirect-bc-high-all', function(request, response) {

	var high_hso_all = request.session.data['high_hso_all'];//
  
	if (high_hso_all === "yes"){
	  response.redirect("all/overrides/find/building-choices/building-choice-high-yes") // Initial redirect
  
	}
	else {
	  response.redirect("all/overrides/find/building-choices/building-choice-high-no")
	}
})

router.post('/redirect-bc-moderate-all', function(request, response) {

	var moderate_hso_all = request.session.data['moderate_hso_all'];//
  
	if (moderate_hso_all === "yes"){
	  response.redirect("all/overrides/find/building-choices/building-choice-moderate-yes") // Initial redirect
  
	}
	else {
	  response.redirect("all/overrides/find/building-choices/building-choice-moderate-no")
	}
})

// router.post('/pni-overrides/assess/v4/a/update-status', function (req, res) {
router.post('/all/overrides/assess/update-status', function (req, res) {
	const assessedSuitable = req.session.data['assessed-suitable']
		if (assessedSuitable == 'On hold – assessment not completed') {
			res.redirect('on-hold-assessment')
		} 
		else if (assessedSuitable == 'Assessed as suitable and ready to continue') {
			res.redirect('reason-why-no-match-pni')
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



/* COMMUNITY */
router.post('/community/assess/update-status', function (req, res) {
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

router.post('/redirect-about-person-sexual-offence', function(request, response) {
	var moderate_pso = request.session.data['moderate_pso'];//
	
	if (moderate_pso === "yes"){
		response.redirect("/community/refer/about-person-sexual-offence-yes") // Initial redirect
	}
	else {
		response.redirect("/community/refer/about-person-sexual-offence-no")
	}
})

/* v1 */
router.post('/community/assess/v1/update-status', function (req, res) {
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

router.post('/redirect-about-person-sexual-offence', function(request, response) {
	var moderate_pso = request.session.data['moderate_pso'];//
	if (moderate_pso === "yes"){
		response.redirect("/community/refer/v1/about-person-sexual-offence-yes") // Initial redirect
	}
	else {
		response.redirect("/community/refer/v1/about-person-sexual-offence-no")
	}
})

/* v2 */
router.post('/redirect-about-person-sexual-offence', function(request, response) {
	var moderate_pso = request.session.data['moderate_pso'];//
	if (moderate_pso === "yes"){
		response.redirect("/community/refer/v2/about-person-sexual-offence-yes") // Initial redirect
	}
	else {
		response.redirect("/community/refer/v2/about-person-sexual-offence-no")
	}
})

//This is the routes for the going back to check answers from day availability 
// router.post('/community/refer/v2/features/pops-availability/availabilityrouter', function (req, res) {
router.post('/community/refer/v2/availabilityrouter', function (req, res) {
	req.session.data['referral-information-three'] ="done";
		if (req.session.data['camefromcheckanswers'] =="true") {
			req.session.data['camefromcheckanswers'] ="false";
			res.redirect('check-answers')
		} 
		
		else {
			res.redirect('task-list')
		}
	});

// This is the routes line breaks {
/* router.post('/community/assess/v3/preferred-location-router', function (req, res) {
// Continue to the next page
	let originalStringlocation = String(req.session.data['location-preference']);
	let newStringlocation = originalStringlocation.replace(/,(?!\s)/g, "\n");
	if(newStringlocation == "undefined")
	{
		req.session.data['location-preference-formatted'] = "None";
	}
	else
	{
		req.session.data['location-preference-formatted'] = newStringlocation;
	}
	res.redirect('no-locations');
}); */

// This is the routes line breaks {
router.post('/community/assess/v3/preferred-location-router', function (req, res) {
	//Prev string setup - @enor this all seems to work as expected
	let originalStringlocation = String(req.session.data['location-preference']);
	let newStringlocation = originalStringlocation.replace(/,(?!\s)/g, "\n");
	if(newStringlocation == "undefined")
	{
		req.session.data['location-preference-formatted'] = "No information added";
	}
	else
	{
		req.session.data['location-preference-formatted'] = newStringlocation;
	}
	//Redirect based on answer to yes no radio
	var moreLocations = req.session.data['moreLocations']
	if (moreLocations == "yes"){
	res.redirect('preferred-location-alternates')
	} else {
	res.redirect('no-locations')
	}
});
		
router.post('/community/assess/v3/preferred-location-alt-router', function (req, res) {

//Don't know how this all works exactly but it does
let original = req.session.data['location-preference-formatted'] || '';
let alternative = req.session.data['location-preference'] || '';
let combined = `${original}\n${alternative}`;

let originalStringlocation = String(req.session.data['location-preference']);
	let newStringlocation = combined.replace(/,(?!\s)/g, "\n");
	if(newStringlocation == "undefined")
	{
		req.session.data['location-preference-2-formatted'] = "No information added";
	}
	else
	{
		req.session.data['location-preference-2-formatted'] = newStringlocation;
	}
	res.redirect('no-locations');
});


// This is the routes line breaks {
router.post('/community/assess/v3/design-concepts/location/a/preferred-location-router', function (req, res) {
// Continue to the next page
	let originalStringlocation = String(req.session.data['location-preference']);
	let newStringlocation = originalStringlocation.replace(/,(?!\s)/g, "\n");
	if(newStringlocation == "undefined")
	{
		req.session.data['location-preference-formatted'] = "None";
	}
	else
	{
		req.session.data['location-preference-formatted'] = newStringlocation;
	}
	res.redirect('no-locations');
});
	
// This is the routes line breaks {
router.post('/community/assess/v3/design-concepts/location/b/preferred-location-router', function (req, res) {
	// Continue to the next page
	let originalStringlocation = String(req.session.data['location-preference']);
	let newStringlocation = originalStringlocation.replace(/,(?!\s)/g, "\n");
	if(newStringlocation == "undefined")
	{
		req.session.data['location-preference-formatted'] = "None";
	}
	else
	{
		req.session.data['location-preference-formatted'] = newStringlocation;
	}
	res.redirect('no-locations');
});
		
// This is the routes line breaks {
router.post('/community/assess/v3/design-concepts/location/c/preferred-location-router', function (req, res) {
	//Prev string setup - @enor this all seems to work as expected
	let originalStringlocation = String(req.session.data['location-preference']);
	let newStringlocation = originalStringlocation.replace(/,(?!\s)/g, "\n");
	if(newStringlocation == "undefined")
	{
		req.session.data['location-preference-formatted'] = "None";
	}
	else
	{
		req.session.data['location-preference-formatted'] = newStringlocation;
	}
	//Redirect based on answer to yes no radio
	var moreLocations = req.session.data['moreLocations']
	if (moreLocations == "yes"){
	res.redirect('preferred-location-alternates')
	} else {
	res.redirect('no-locations')
	}
});
		
router.post('/community/assess/v3/design-concepts/location/c/preferred-location-alt-router', function (req, res) {

//Don't know how this all works exactly but it does
let original = req.session.data['location-preference-formatted'] || '';
let alternative = req.session.data['location-preference'] || '';
let combined = `${original}\n${alternative}`;

let originalStringlocation = String(req.session.data['location-preference']);
	let newStringlocation = combined.replace(/,(?!\s)/g, "\n");
	if(newStringlocation == "undefined")
	{
		req.session.data['location-preference-2-formatted'] = "No information added";
	}
	else
	{
		req.session.data['location-preference-2-formatted'] = newStringlocation;
	}
	res.redirect('no-locations');
});

// Community groups routers - V1
router.post('/community/groups/assess/v1/allocate-router', function(request, response) {
	var cancel_continue_group = request.session.data['cancel-continue-group'];//
	
	if (cancel_continue_group === "Cancel allocation for Adrian Poole"){
		response.redirect("allocate-bc-group-1") // Initial redirect
	}
	else if (cancel_continue_group === "Cancel allocation for Dan Jackson") {
		response.redirect('allocate-bc-group-1')
	}
	else if (cancel_continue_group === "Cancel allocation for Roman Fredric") {
		response.redirect('allocate-bc-group-1')
	}
	else {
		response.redirect("confirmation")
	}
})

router.post('/community/groups/assess/v1/availability-router', function(request, response) {

	var cancel_continue_group = request.session.data['cancel-continue-group'];//
	
	if (cancel_continue_group === "Cancel allocation for Adrian Poole"){
		response.redirect("allocate-bc-group-1") // Initial redirect
	}
	else if (cancel_continue_group === "Cancel allocation for Dan Jackson") {
		response.redirect('allocate-bc-group-1')
	}
	else if (cancel_continue_group === "Cancel allocation for Roman Fredric") {
		response.redirect('allocate-bc-group-1')
	}
	else {
		response.redirect("availability")
	}
})

// Community groups routers - V2
router.post('/community/groups/assess/v2/allocate-router', function(request, response) {
	var cancel_continue_group_2 = request.session.data['cancel-continue-group-2'];//
	
	if (cancel_continue_group_2 === "no"){
		response.redirect("allocate-bc-group-1") // Initial redirect
	}
	else if (cancel_continue_group_2 === "Cancel allocation for Dan Jackson") {
		response.redirect('allocate-bc-group-1')
	}
	else if (cancel_continue_group_2 === "Cancel allocation for Roman Fredric") {
		response.redirect('allocate-bc-group-1')
	}
	else {
		response.redirect("bc-group-1")
	}
})

router.post('/community/groups/assess/v2/availability-router', function(request, response) {

	var cancel_continue_group = request.session.data['cancel-continue-group'];//
	
	if (cancel_continue_group === "yes"){
		response.redirect("availability") 
	}
	else {
		response.redirect("allocate-bc-group-1")
	}
})