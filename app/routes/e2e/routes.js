//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

// Logging session data  
module.exports = function (router) {   
    router.use((req, res, next) => {    
    const log = {  
      method: req.method,  
      url: req.originalUrl,  
      data: req.session.data  
    }  
     console.log(JSON.stringify(log, null, 2))  
     next()  
   });

// Change cohort
// profile/referral-details/change-cohort
router.post('/community/e2e/profiles/referral-details/change-cohort-post', function (req, res) { 

 if(req.session.data['choose-cohort']=="general-offence") 

// How can I set the cohort on the personal details page to general or sexual offence depending on the option? 
// Check preferred-location-router journey
 {res.redirect('personal-details') } 

 if(req.session.data['choose-cohort']=="sexual-offence") 

 { res.redirect('personal-details')} 

}) 

// Change LDC status
// profiles/referral-details/change-ldc-status
router.post('/community/e2e/profiles/referral-details/change-ldc-status-post', function (req, res) { 

 if(req.session.data['choose-ldc-status']=="yes-ldc") 

// How can I set the LDC status on the personal details page to show or not sure depending on the option? 
// Check preferred-location-router journey
 {res.redirect('personal-details') } 

 if(req.session.data['choose-ldc-status']=="no-ldc") 

 { res.redirect('personal-details')} 

}) 

// Change referral status
// profiles/referral-details/change-referral-status
// and
// profiles/referral-details-change-referral-status-scheduled-update
// profiles/referral-details-change-referral-status-awaiting-allocation-update
router.post('/community/e2e/profiles/referral-details/change-referral-status-post', function (req, res) {
	req.session.data['show-success-banner'] = true;
  const referralChanged = req.session.data['choose-referral-status']
    	if (referralChanged == 'awaiting-allocation') {
			res.redirect('status-history')
     	} 
		else if (referralChanged == 'suitable-but-not-ready') {
       		res.redirect('status-history')
     	}
		else if (referralChanged == 'deprioritised') {
			res.redirect('status-history')
	  	}
        else if (referralChanged == 'recall') {
			res.redirect('status-history')
	  	}
		else {
			res.redirect('status-history')
	  	}
 	})

  router.get('/community/e2e/profiles/referral-details/status-history', function (req, res) {
    const showBanner = req.session.data['show-success-banner'];
    req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
    res.render('community/e2e/profiles/referral-details/status-history', {
        data: req.session.data,
        showBanner: showBanner
    });
})

// Change referral status Scheduled > On programme
// profiles/referral-details/change-referral-status-scheduled-group
router.post('/community/e2e/profiles/referral-details/change-referral-status-scheduled-group-post', function (req, res) { 

 if(req.session.data['started-programme']=="yes") 

 {res.redirect('change-referral-status-scheduled-on-prog') } 

 if(req.session.data['started-programme']=="no") 

 { res.redirect('change-referral-status-scheduled-update')} 

}) 


// Show success banner and inset text when user has submitted motivation form
// profiles/referral-details/change-motivation-background
router.post('/community/e2e/profiles/referral-details/change-motivation-background-post', function (req, res) { 
    req.session.data['show-success-banner'] = true;
    req.session.data['show-last-update'] = true;
    res.redirect('motivation-background');

 })

router.get('/community/e2e/profiles/referral-details/motivation-background', function (req, res) {
    const showBanner = req.session.data['show-success-banner'];
    req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
    res.render('community/e2e/profiles/referral-details/motivation-background', {
        data: req.session.data,
        showBanner: showBanner
    });
})

// Remove from group and change referral status journey
// A) groups/remove-from-group
router.post('/community/e2e/groups/remove-from-group-post', function (req, res) { 

 if(req.session.data['remove-from-group']=="yes") 

 {res.redirect('remove-change-referral-status') } 

 if(req.session.data['remove-from-group']=="no") 

 { res.redirect('group-details-allocated')} 

}) 

// B) group/remove-change-referral-status
router.post('/community/e2e/groups/remove-change-referral-status-post', function (req, res) {
	req.session.data['show-success-banner'] = true;
  const referralChanged = req.session.data['choose-referral-status']
    	if (referralChanged == 'deprioritised') {
			res.redirect('group-details-allocated')
     	} 
		else if (referralChanged == 'recall') {
       		res.redirect('group-details-allocated')
     	}
    else if (referralChanged == 'return-to-court') {
       		res.redirect('group-details-allocated')
     	}
		else {
			res.redirect('group-details-allocated')
	  	}
})

 router.get('/community/e2e/groups/group-details-allocated', function (req, res) {
    const showBanner = req.session.data['show-success-banner'];
    req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
    res.render('community/e2e/groups/group-details-allocated', {
        data: req.session.data,
        showBanner: showBanner
    });
})

// Add to a group and change referral status to Scheduled
// A) groups/add-to-group
router.post('/community/e2e/groups/add-to-group-post', function (req, res) { 

 if(req.session.data['add-to-group']=="yes") 

 {res.redirect('add-change-referral-status') } 

 if(req.session.data['add-to-group']=="no") 

 { res.redirect('group-details-waitlist')} 

}) 

// B) group/add-change-referral-status
router.post('/community/e2e/groups/add-change-referral-status-post', function (req, res) {
	req.session.data['show-success-banner'] = true;
  res.redirect('group-details-allocated');
})

// Make success banner show for a Scheduled > On programme referral update
// community/e2e/profiles/referral-details/change-referral-status-scheduled-group
router.post('/community/e2e/profiles/referral-details/change-referral-status-scheduled-on-prog-post', function (req, res) {
	req.session.data['show-success-banner'] = true;
  res.redirect('status-history');
})



}