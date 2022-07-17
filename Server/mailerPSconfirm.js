const nodemailer = require("nodemailer");

exports.sendPasswordResetEmailconfirm = function({toUser}) {
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
            html:`
            <h3>Hello ${toUser.name} </h3>
            <p>You have just successfully change your password.\n
            If you did not request for a password change, Please contact us immediately\n
            To login, please follow this link: ${[process.env.DOMAIN]}
            Cheers,
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
