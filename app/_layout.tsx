import { Provider } from 'contexts/auth.context';
import { Slot } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
}
