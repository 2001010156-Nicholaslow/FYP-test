const nodemailer = require("nodemailer");

exports.sendPasswordResetEmail = function({toUser,PasswordReset}) {
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
            subject: 'Password Reset',
            html:`
            <h3>Hello ${toUser.name} </h3>
            <p>To reset your account password please follow this link: ${[process.env.DOMAIN]}/reset/${PasswordReset}
            \nIf you did not request for a password change, Please contact us immediately
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
