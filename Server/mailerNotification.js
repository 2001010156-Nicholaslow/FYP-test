const nodemailer = require("nodemailer");

exports.sendNotifaEmail = function({toUser}) {
    return new Promise((res,rej) => {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GOOGLE_USER,
              pass: process.env.GOOGLE_PASSWORD,
            }
          })

          const message = {
            from: process.env.GOOGLE_USER,
            to: toUser.email,
            subject: 'Job Alert',
            html:`
            <h3>Hello ${toUser.fullname} </h3>
            <p>Your application has been review!
            \nTo View your application status.Please login to view status: ${[process.env.DOMAIN]}/Login/login
            \nCheers,
            `
        }

        transport.sendMail(message, function(err,info) {
            if(err){
                rej(err)
            }else{
                res(info)
            }
        })


    })
}
