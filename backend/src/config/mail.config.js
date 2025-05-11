import FormData from 'form-data';
import sgMail from '@sendgrid/mail';

export function getClient() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  return sgMail;
}