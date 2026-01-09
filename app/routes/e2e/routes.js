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
 {res.redirect('referral-summary') } 

 if(req.session.data['choose-cohort']=="sexual-offence") 

 { res.redirect('referral-summary')} 

}) 

// Change LDC status
// profiles/referral-details/change-ldc-status
router.post('/community/e2e/profiles/referral-details/change-ldc-status-post', function (req, res) { 

 if(req.session.data['choose-ldc-status']=="yes-ldc") 

// How can I set the LDC status on the personal details page to show or not sure depending on the option? 
// Check preferred-location-router journey
 {res.redirect('referral-summary') } 

 if(req.session.data['choose-ldc-status']=="no-ldc") 

 { res.redirect('referral-summary')} 

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
  //Delete row below after UR 15/10/25
  req.session.data['showAllocated'] = false; // Clear the allocated view
  const referralChanged = req.session.data['choose-referral-status']
    	if (referralChanged == 'deprioritised') {
			//Change below after UR 15/10/25 - remove -ur from all instances
      res.redirect('group-details-allocated-ur')
     	} 
		else if (referralChanged == 'recall') {		
      res.redirect('group-details-allocated-ur')
     	}
    else if (referralChanged == 'return-to-court') {
       		res.redirect('group-details-allocated-ur')
     	}
		else {
			res.redirect('group-details-allocated-ur')
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
//Change below after UR 15/10/25 - remove -ur
 { res.redirect('group-details-waitlist-ur')} 

}) 

// B) group/add-change-referral-status
router.post('/community/e2e/groups/add-change-referral-status-post', function (req, res) {
	req.session.data['show-success-banner'] = true;
  	req.session.data['showAllocated'] = true;
  //Change below after UR 15/10/25 - remove -ur
  res.redirect('group-details-allocated-ur');
})

// Make success banner show for a Scheduled > On programme referral update
// community/e2e/profiles/referral-details/change-referral-status-scheduled-group
router.post('/community/e2e/profiles/referral-details/change-referral-status-scheduled-on-prog-post', function (req, res) {
	req.session.data['show-success-banner'] = true;
  res.redirect('status-history');
})


// Make success banner show for creating a group
// community/e2e/groups/group-schedule-overview
router.get('/community/e2e/groups/group-schedule-overview', function (req, res) {
    const showBanner = req.session.data['show-success-banner'];
    req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
    res.render('community/e2e/groups/group-schedule-overview', {
        data: req.session.data,
        showBanner: showBanner
    });
})

router.post('/community/e2e/groups/group-schedule-overview-post', function (req, res) {
	req.session.data['show-success-banner'] = true;
  res.redirect('group-schedule-overview');
})

// Delete this after UR 15/10/25
 router.get('/community/e2e/groups/group-details-allocated-ur', function (req, res) {
    const showBanner = req.session.data['show-success-banner'];
    const showAllocated = req.session.data['showAllocated'];
    req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
    res.render('community/e2e/groups/group-details-allocated-ur', {
        data: req.session.data,
        showBanner: showBanner,
        showAllocated: showAllocated
    });
})

// Groups - /add-session-type routing
router.post('/community/e2e/groups/add-session-type-post', function (req, res) {

  if(req.session.data['add-session-choose-type']=="getting-started-1") 

 {res.redirect('add-session-group') } 

  if(req.session.data['add-session-choose-type']=="getting-started-2") 

 { res.redirect('add-session-group')} 

   if(req.session.data['add-session-choose-type']=="getting-started-121") 

 {res.redirect('add-session-individual') } 

  if(req.session.data['add-session-choose-type']=="getting-started-121-catch-up") 

 { res.redirect('add-session-individual')} 

}) 

// Redirect from add-session-group to add-session-group-check-answers
router.post('/community/e2e/groups/add-session-group-post', function (req, res) { 

 {res.redirect('add-session-group-check-answers') } 

}) 

// Redirect from add-session-group-check-answers to group-manage-schedule
router.post('/community/e2e/groups/add-session-group-check-answers-post', function (req, res) { 

 {res.redirect('group-manage-schedule') } 

}) 

// Redirect from add-session-individual to add-session-individual-check-answers
router.post('/community/e2e/groups/add-session-individual-post', function (req, res) { 

 {res.redirect('add-session-individual-check-answers') } 

}) 

// Redirect from add-session-individual-check-answers to group-manage-schedule
router.post('/community/e2e/groups/add-session-individual-check-answers-post', function (req, res) { 
    req.session.data['show-success-banner'] = true;
    {res.redirect('group-manage-schedule') } 

}) 

    // Show success banner
    router.get('/community/e2e/groups/group-manage-schedule', function (req, res) {
        const showBanner = req.session.data['show-success-banner'];
        req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
        res.render('community/e2e/groups/group-manage-schedule', {
            data: req.session.data,
            showBanner: showBanner
        });
    })


// Redirect when just the Alex River checkbox is selected
router.post('/community/e2e/groups/mark-attendance-post', function (req, res) {

  if(req.session.data['attendance']=="river-alex") 

 {res.redirect('attendance-individual') } 

  else 

 {res.redirect('attendance-group-mark')} 

}) 

// Mark attendance for individual or single person update in a group session - Alex River
router.post('/community/e2e/groups/attendance-individual-post', function (req, res) { 

 {res.redirect('attendance-individual-session-notes') } 

}) 

// Mark attendance flow for bulk updates in a group session
router.post('/community/e2e/groups/attendance-group-mark-post', function (req, res) { 

 {res.redirect('attendance-group-session-notes-1') } 

}) 

router.post('/community/e2e/groups/attendance-group-session-notes-1-post', function (req, res) { 

 {res.redirect('attendance-group-session-notes-2') } 

}) 

router.post('/community/e2e/groups/attendance-group-session-notes-2-post', function (req, res) { 

 {res.redirect('attendance-group-session-notes-3') } 

}) 

// Show success banners
router.post('/community/e2e/groups/attendance-individual-session-notes-post', function (req, res) { 
    req.session.data['show-success-banner-single'] = true;
    res.redirect('session-details-group'); 

}) 

router.post('/community/e2e/groups/attendance-group-session-notes-3-post', function (req, res) { 
    req.session.data['show-success-banner-multi'] = true;
    res.redirect('session-details-group'); 

}) 

router.get('/community/e2e/groups/session-details-group', function (req, res) {
    const showBannerSingle = req.session.data['show-success-banner-single'];
    const showBannerMulti = req.session.data['show-success-banner-multi'];
    const showBanner = req.session.data['show-success-banner'];
    req.session.data['show-success-banner-single'] = false; // Clear the banner so it only shows once
    req.session.data['show-success-banner-multi'] = false; // Clear the banner so it only shows once
    req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
    res.render('community/e2e/groups/session-details-group', {
        data: req.session.data,
        showBannerSingle: showBannerSingle,
        showBannerMulti: showBannerMulti,
        showBanner: showBanner
    });
})

// Update session notes inside the session notes detail page
router.post('/community/e2e/groups/session-details-notes-post', function (req, res) { 

 {res.redirect('session-details-notes-update') } 

}) 

// Show success banner
router.post('/community/e2e/groups/session-details-notes-update-post', function (req, res) { 
    req.session.data['show-success-banner'] = true;
    res.redirect('session-details-notes'); 

}) 

router.get('/community/e2e/groups/session-details-notes', function (req, res) {
    const showBanner = req.session.data['show-success-banner'];
    req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
    res.render('community/e2e/groups/session-details-notes', {
        data: req.session.data,
        showBanner: showBanner
    });
})

// Delete session
// Redirect
router.post('/community/e2e/groups/delete-session-post', function (req, res) {
  if (req.session.data['delete-session'] === 'yes') {
    req.session.data['show-success-banner'] = true;
    res.redirect('group-manage-schedule');
  } else {
    req.session.data['show-success-banner'] = false;
  res.redirect('session-details-individual');
  }
}) 

// Show success banner
router.get('/community/e2e/groups/group-manage-schedule', function (req, res) {
    const showBanner = req.session.data['show-success-banner'];
    req.session.data['show-success-banner'] = false; // Clear the banner so it only shows once
    res.render('community/e2e/groups/group-manage-schedule', {
        data: req.session.data,
        showBanner: showBanner
    });
})

// Edit-session-group-date-time-reschedule
// Redirect
// See further up for success banner settings for this
router.post('/community/e2e/groups/edit-session-group-date-time-reschedule-post', function (req, res) {
    req.session.data['show-success-banner'] = true;
    res.redirect('session-details-group'); 
}) 

// Put routes above this row - not below
}