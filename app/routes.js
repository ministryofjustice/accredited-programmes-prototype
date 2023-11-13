//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
require('./routes/assess/v6/routes.js')(router);



router.get('/refer/features/withdrawal/v1/withdraw-referral', function (req, res) {
  res.render('/refer/features/withdrawal/v1/withdraw-referral')
});

router.post('/refer/features/withdrawal/v1/withdraw-referral', function (req, res) {
   const withdrawalReason = req.session.data['reason-category']

     if (withdrawalReason == 'Personal and health'){
       res.redirect('personal-health')
     } else {
       res.redirect('motivation-behaviour')
     }
 });


router.get('/assess/deselect/withdraw-referral', function (req, res) {
    res.render('/assess/deselect/withdraw-referral')
 });
 
 router.post('/assess/deselect/withdraw-referral', function (req, res) {
     const withdrawalReason = req.session.data['withdrawal-reason']
 
       if (withdrawalReason == 'Personal and health'){
         res.redirect('personal-health')
       }else {
         res.redirect('motivation-behaviour')
       }
   });
