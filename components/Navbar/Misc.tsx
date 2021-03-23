import React from 'react';
import { useActiveUser, UserCurrentStatus } from '../UserProvider';
import { useRouter } from 'next/router';
import { Text, Link } from '@geist-ui/react';

/**
 * Nav component
 */
export const Navbar: React.FC = () => {
  const { user, status } = useActiveUser();
  const router = useRouter();

  const navbarUserDropdown = <></>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', padding: '15px', borderBottom: '1px solid #eee' }}>
        <Link block href="/">
          Home
        </Link>
        <Link block href="/events">
          Events
        </Link>
        <Link block href="/schedule">
          Schedule
        </Link>
        <Link block href="/challenges">
          Challenges
        </Link>
        {status === UserCurrentStatus.LoggedIn ? (
          <>
            <Text className="text-muted">{user?.email}</Text>
            <Link block href={`/auth/logout?r=${process.browser ? window.location.pathname : `${router.basePath}${router.asPath}`}`}>
              Logout
            </Link>
          </>
        ) : (
          <Link block style={{ position: 'absolute', right: '10px' }} href={`/auth/login?r=${process.browser ? window.location.pathname : `${router.basePath}${router.asPath}`}`}>
            Login / Signup
          </Link>
        )}
      </div>
    </>
  );
};
