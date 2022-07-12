const nodemailer = require("nodemailer");

exports.sendNotifaEmail = function({toUser,ConfirmationCode}) {
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
            <p>Thank you!</p>
            <p>To activate your account please follw this link: <a target="_" href="${[process.env.DOMAIN]}/confirm/${ConfirmationCode}</p>
            <p>Cheers,</p>
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
