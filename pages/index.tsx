import { Text, Page, Checkbox, Input, Textarea, Divider, Slider, Button, useToasts, Card, Link } from '@geist-ui/react';
import { useState } from 'react';
import { orgName, mailingLists, htmlContentPlaceholder } from '../components/constants';
import { Navbar } from '../components/Navbar';
import { useActiveUser } from '../components/UserProvider';

export default function Home(): JSX.Element {
  const { user, status } = useActiveUser();
  const [selectedMailingLists, setSelectedMailingLists] = useState([]);
  const [emailSubject, setEmailSubject] = useState(``);
  const [emailHtml, setEmailHtml] = useState(htmlContentPlaceholder);
  const [previewWidth, setPreviewWidth] = useState(400);
  const [, setToast] = useToasts();

  const previewWidthChangeHandler = (val) => setPreviewWidth(val);

  const mailingListSelectionHandler = (values) => {
    setSelectedMailingLists(values);
  };

  const sendEmail = async () => {
    const res = await fetch('/mailing/api/messages/send', {
      body: JSON.stringify({
        to: selectedMailingLists.join(),
        from: process.env.NEXT_PUBLIC_SENDER_EMAIL,
        subject: emailSubject,
        html: emailHtml
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    if (res.status == 200) {
      sendNotification('E-mail sent successfully!', 'success');
      setTimeout(() => {
        // reset form to prevent duplicate send
      }, 5000);
    } else {
      sendNotification('E-mail failed to send!', 'error');
    }
  };

  const sendNotification = (msg, intent) => {
    setToast({ text: msg, type: intent, delay: 3000 });
  };

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
        {!user?.isAdmin && (
          <>
            <Card>
              <h4>Access Denied</h4>
              <p>You do not have admin priviledges to send emails. Please login to an admin account to send bulk emails.</p>
              <Card.Footer>
                <Link color block href="/auth/login?r=/mailing/">
                  Login
                </Link>
              </Card.Footer>
            </Card>
          </>
        )}
        {/* If user is admin, show everything normally */}
        {user?.isAdmin && (
          <>
            <Divider align="start">E-mail Recipients</Divider>
            <Text className="sub-heading">Choose which lists to send a mail to:</Text>
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
            <Button type="secondary" ghost onClick={sendEmail}>
              Send E-mail
            </Button>
          </>
        )}
      </Page>
    </>
  );
}
