const nodemailer = require("nodemailer");

exports.sendPasswordResetEmailconfirm = function({toUser,ConfirmationCode}) {
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
            subject: 'Account password change',
            html:`1
            <h3>Hello ${toUser.fullname} </h3>
            <p>The password for your account:${toUser.fullname} has been change.To login in click here: <a target="_" href="${[process.env.DOMAIN]}</p>
            <p>If this is not you, please contact our us immediately</p>
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
