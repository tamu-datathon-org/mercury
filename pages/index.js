import { Text, Page, Checkbox, Input, Textarea, Divider, Slider, Button, useToasts } from '@geist-ui/react';
import { useState } from 'react';
import { useActiveUser } from '../components/UserProvider';
import htmlContentPlaceholder from '../components/constants';

export default function Home() {
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

  const sendEmail = () => {
    console.log('sending email to', selectedMailingLists, emailSubject);
    sendNotification('E-mail send successfully!', 'warning');
  };

  const sendNotification = (msg, intent) => {
    setToast({ text: msg, type: intent, delay: 3000 });
  };

  return (
    <>
      {/* <Navbar /> */}
      <Page className="homepage-container">
        <Text h2 style={{ marginBottom: '5px' }}>
          Mercury
        </Text>
        <Text className="sub-heading">TD Email System</Text>
        {user?.isAdmin && <>you&apos;re an admin</>}

        <br />
        <Divider align="start">E-mail Recipients</Divider>
        <Text className="sub-heading">Choose which lists to send a mail to:</Text>
        <Checkbox.Group value={[]} size="medium" onChange={mailingListSelectionHandler}>
          <Checkbox value="participants">Participants</Checkbox>
          <Checkbox value="former_participants">Former Participants</Checkbox>
          <Checkbox value="sponsors">Sponsors</Checkbox>
          <Checkbox value="mentors">Mentors</Checkbox>
          <Checkbox value="data_science_students">DS Students</Checkbox>
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
      </Page>
    </>
  );
}
