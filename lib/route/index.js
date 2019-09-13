const adminRoute        = require('../module/admin/adminRoute'),
      userRoute         = require('../module/user/userRoute'),
      groupRoute        = require('../module/group/groupRoute'),
      cronjobRoute      = require('../module/cronjob/cronRoute'),
      
      responseHandler   = require('../responseHandler');
      basicAuth         = require('../middleware/basicAuth');
//========================== Export Module Start ==========================

module.exports = function(app){
    // Attach User Routes
    app.use('/demo/api/v1/cronjob', cronjobRoute);
    app.use(basicAuth.basicAuthentication);
    app.use('/demo/api/v1/admin', adminRoute);
    app.use('/demo/api/v1/user', userRoute);
    app.use('/demo/api/v1/group', groupRoute);

    // Attach ErrorHandler to Handle All Errors
    app.use(responseHandler.handleError);
}
//========================== Export Module End ============================