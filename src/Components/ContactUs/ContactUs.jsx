import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './ContactUs.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setStatus(null);

    const serviceID = 'service_klq9jdv';
    const templateID = 'template_1kbwnkp';
    const publicKey = 'fn4MO7uR0wrM9al_P';
    const templateParams = {
      name,
      subject,
      email,
      to_email: 'vishalgupta25980@gmail.com',
    };

    try {
      const { default: emailjs } = await import('emailjs-com');
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus({ type: 'success', message: 'Message sent successfully. I’ll get back to you soon.' });
      setName('');
      setSubject('');
      setEmail('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ type: 'error', message: 'Message could not be sent. Please email me directly.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-section" id="contact_section" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div className="contact-hero">
          <p className="contact-kicker"><span /> Available for opportunities</p>
          <h2 id="contact-title">Let&apos;s build <em>something great.</em></h2>
          <p className="contact-lede">
            Have a project, an idea, or a role in mind? Tell me a little about it and
            let&apos;s start a conversation.
          </p>

          <div className="contact-direct">
            <a href="mailto:VishalGupta25980@gmail.com">
              <span>Email</span>
              <strong>VishalGupta25980@gmail.com</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="tel:+9773146258">
              <span>Phone</span>
              <strong>+91 97731 46258</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="contact-form-panel">
          <div className="contact-form-header">
            <div>
              <p>Start a conversation</p>
              <h3>Tell me about your project</h3>
            </div>
            <span>01 — 03</span>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field-grid">
              <label className="contact-field">
                <span><b>01</b> Your name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="contact-field">
                <span><b>02</b> Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="contact-field contact-field--wide">
                <span><b>03</b> What can I help with?</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="Website, app, full-time role..."
                  required
                />
              </label>
            </div>

            <div className="contact-submit-row">
              <p>Your details stay private and are only used to reply.</p>
              <button type="submit" className="contact-submit" disabled={isSending}>
                <span>{isSending ? 'Sending...' : 'Send enquiry'}</span>
                <ArrowUpRight aria-hidden="true" />
              </button>
            </div>

            {status && (
              <p className="contact-status" data-type={status.type} role="status">
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
