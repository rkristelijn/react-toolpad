// React and React Router

// Internal imports
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router-dom';

import { brandingConfig, navigationConfig } from './shared/navigation/navigationConfig';
import { ApolloProvider } from './shared/providers/apollo';

export default function App() {
  return (
    <ApolloProvider>
      <ReactRouterAppProvider navigation={navigationConfig} branding={brandingConfig}>
        <Outlet />
      </ReactRouterAppProvider>
    </ApolloProvider>
  );
}
