// React and React Router

// Internal imports
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router-dom';

import { BRANDING, NAVIGATION } from './navigation/config';
import { ApolloProvider } from './providers/ApolloProvider';

export default function App() {
  return (
    <ApolloProvider>
      <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
        <Outlet />
      </ReactRouterAppProvider>
    </ApolloProvider>
  );
}
