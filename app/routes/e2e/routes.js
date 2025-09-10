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
// profile/referral-details/change-ldc-status
router.post('/community/e2e/profiles/referral-details/change-ldc-status-post', function (req, res) { 

 if(req.session.data['choose-ldc-status']=="yes-ldc") 

// How can I set the LDC status on the personal details page to show or not sure depending on the option? 
// Check preferred-location-router journey
 {res.redirect('personal-details') } 

 if(req.session.data['choose-ldc-status']=="no-ldc") 

 { res.redirect('personal-details')} 

}) 

// Change referral status
// profile/referral-details/change-referral-status
router.post('/community/e2e/profiles/referral-details/change-referral-status-post', function (req, res) {
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

}