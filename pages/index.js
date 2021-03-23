import { Text, Page } from '@geist-ui/react';
import { Navbar } from '../components/Navbar';
import { useActiveUser } from '../components/UserProvider';

export default function Home() {
  const { user } = useActiveUser();
  return (
    <>
      <Navbar />
      <Page className="homepage-container">
        <Text h2 style={{ marginBottom: '5px' }}>
          Mercury
        </Text>
        <Text style={{ marginTop: '0', color: '#555' }}>TD Email System</Text>
        {user?.isAdmin && <>you&apos;re an admin</>}
      </Page>
    </>
  );
}
