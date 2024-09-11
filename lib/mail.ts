import {Resend } from 'resend';

const resend =  new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'Resend <onboarding@resend.dev>',
    to: email,
    subject: 'AuthApp: Email confirmation request',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
  })
  .catch(error => Response.json({ error }, { status: 500 }));

}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'Resend <onboarding@resend.dev>',
    to: email,
    subject: 'AuthApp: Password reset request',
    html: `<p>Click <a href="${resetLink }">here</a> to reset your password.</p>`
  })
  .catch(error => Response.json({ error }, { status: 500 }));
}


export const sendTwoFactorTokenByEmail = async (email: string, token: string) => {

  await resend.emails.send({
    from: 'Resend <onboarding@resend.dev>',
    to: email,
    subject: 'AuthApp: Two Factor Code',
    html: `<p>Your code is ${ token }</p>`
  })
  .catch(error => Response.json({ error }, { status: 500 }));
}


