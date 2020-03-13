const config    = require('../config');
const Promise   = require('bluebird');
var ejs         = require('ejs');
const sgMail    = require('@sendgrid/mail');

sgMail.setApiKey(config.cfg.sendgridKey);


function _templateRead(template, params) {
    let filename = "../emailTemplate/"+template;
    return new Promise(function (resolve, reject) {
        ejs.renderFile(filename, params, function (error, htmlData) {
            if (error) {
                console.log("_templateRead err", error)
                reject(error);
            }
            resolve(htmlData);
        });
    });
}

function sendEmail(payload) {
    return _templateRead(payload.template,payload)
        .then(function (htmlContent) {
            const msg = {
                to: payload.email,
                from: config.cfg.smtp.fromEmail,
                subject: payload.subject,
                html: htmlContent,
            };
            sgMail.send(msg);
        })
}



// ========================== Export Module Start ==========================
module.exports = {
    sendEmail
}
// ========================== Export Module End ============================
