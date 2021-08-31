import { Text, Page, Checkbox, Input, Textarea, Divider, Slider, Button, useToasts, Card, Link } from '@geist-ui/react';
import { useState } from 'react';
import { orgName, htmlContentPlaceholder } from '../components/constants';
import { Navbar } from '../components/Navbar';
import { useActiveUser } from '../components/UserProvider';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function Home(): JSX.Element {
  const { user } = useActiveUser();
  const [selectedMailingLists, setSelectedMailingLists] = useState([]);
  const [emailSubject, setEmailSubject] = useState(``);
  const [emailHtml, setEmailHtml] = useState(htmlContentPlaceholder);
  const [previewWidth, setPreviewWidth] = useState(400);
  const [, setToast] = useToasts();

  const previewWidthChangeHandler = (val) => setPreviewWidth(val);

  const mailingListSelectionHandler = (values) => {
    setSelectedMailingLists(values);
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const sendEmail = async () => {
    const res = await fetch('/mailing/api/messages/send', {
      body: JSON.stringify({
        to: selectedMailingLists.join(),
        from: process.env.NEXT_PUBLIC_SENDER_EMAIL,
        subject: emailSubject,
        html: emailHtml
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST'
    });
    if (res.status == 200) {
      const body = await res.json();
      sendNotification(`E-mail sent to Mailgun! ${body.message}`, 'success');

      // animation variables
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, particleCount: 100 };

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      setTimeout(() => {
        // reset form to prevent duplicate send
      }, 5000);
    } else {
      const error = await res.text();
      sendNotification(`E-mail failed to send! ${error}`, 'error');
    }
  };

  const sendNotification = (msg, intent) => {
    setToast({ text: msg, type: intent, delay: 8000 });
  };

  const [mailingLists, setMailingLists] = useState([]);
  useEffect(() => {
    fetch('/mailing/api/lists/get')
      .then((res) => res.json())
      .then((data) => setMailingLists(data.items));
  }, []);

  return (
    <>
      <Navbar />
      <Page className="homepage-container">
        <Text h2 style={{ marginBottom: '5px' }}>
          Mercury
        </Text>
        <Text className="sub-heading">{orgName} Email System</Text>
        <br />
        {/* If user is not admin, deny access and prompt them to login */}
        {!user?.isAdmin ? (
          <Card>
            <h4>Access Denied</h4>
            <p>You do not have admin priviledges to send emails. Please login to an admin account to send bulk emails.</p>
            <Card.Footer>
              <Link color block href="/auth/login?r=/mailing/">
                Login
              </Link>
            </Card.Footer>
          </Card>
        ) : (
          /* If user is admin, show everything normally */
          <>
            <Divider align="start">E-mail Recipients</Divider>
            <Text className="sub-heading">Choose which lists to send a mail to (there may be overlap between lists):</Text>
            <Checkbox.Group value={[]} size="medium" onChange={mailingListSelectionHandler}>
              {mailingLists.map((mList, i) => (
                <Checkbox key={`mailing-list-${i}`} value={mList.address}>
                  {mList.name}
                </Checkbox>
              ))}
            </Checkbox.Group>

            <br />
            <br />
            <Divider align="start">E-mail Content</Divider>
            <Input className="inp-full-width" label="Subject" placeholder="Announcement from Tamudatathon" onChange={(e) => setEmailSubject(e.target.value)} />
            <br />
            <br />
            <Textarea width="100%" minHeight="200px" resize="vertical" placeholder={htmlContentPlaceholder} initialValue={htmlContentPlaceholder} onChange={(e) => setEmailHtml(e.target.value)} />

            <br />
            <br />
            <Text className="sub-heading">Preview:</Text>
            <div className="preview-dimensions-input-container">
              Width: <Slider min={350} max={900} initialValue={400} value={previewWidth} onChange={previewWidthChangeHandler} />
            </div>
            <iframe title="emailPreview" allow="fullscreen" width={`${previewWidth}px`} height={`500px`} srcDoc={emailHtml}></iframe>

            <br />
            <br />
            <Divider align="start">Final Steps</Divider>
            <Text className="sub-heading">Sending to: {selectedMailingLists.length == 0 ? `no one... add E-Mail Recipients above` : selectedMailingLists.join(', ')}</Text>
            <Button type="secondary" ghost onClick={() => (confirm('Are you sure you want to send this email?') ? sendEmail() : undefined)}>
              Send E-mail
            </Button>
          </>
        )}
      </Page>
    </>
  );
}
