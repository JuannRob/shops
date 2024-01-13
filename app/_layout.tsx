import { Provider } from 'context/auth.context';
import { Slot } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
}
