const nodemailer = require("nodemailer");

exports.sendPasswordResetEmail = function({toUser,ConfirmationCode}) {
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
            <h3>Hello ${toUser.fullname} </h3>
            <p>To reset your account password please follow this link: <a target="_" href="${[process.env.DOMAIN]}/confirm/${PasswordReset}</p>
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
