const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = function({toUser,ConfirmationCode}) {
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
            subject: 'Account Activation',
            html:`
            <h3>Hello ${toUser.fullname} </h3>
            <p>Thank you!
            \nTo activate your account please follw this link: ${[process.env.DOMAIN]}/confirm/${ConfirmationCode}
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
