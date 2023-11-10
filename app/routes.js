//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
require('./routes/assess/v6/routes.js')(router);



// Run this code when a form is submitted to 'withdraw-referral-answe'
router.post('/withdraw-referral-answer', function (req, res) {

    // Make a variable and give it the value from 'withdrawal-reason'
    var withdrawalReason = req.session.data['withdrawal-reason']
  
    // Check whether the variable matches a condition
    if (withdrawalReason == "personal-health"){
      // Send user to next page
      res.redirect('/personal-health')
    } else {
      // Send user to another page
      res.redirect('/motivation-behaviour')
    }
  
  })
