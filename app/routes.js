//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
require('./routes/assess/v6/routes.js')(router);





  router.post('/withdraw-referral-answer', function (req, res) {
    const withdrawalReason = req.session.data['withdrawal-reason']

      if (withdrawalReason == 'Personal and health'){
        res.redirect('personal-health')
      }else {
        res.redirect('motivation-behaviour')
      }
  });
