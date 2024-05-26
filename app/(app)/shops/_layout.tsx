import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
      <Stack.Screen name="list" options={{ title: 'Shops' }}></Stack.Screen>
      <Stack.Screen name="detail" options={{ title: 'Detail' }}></Stack.Screen>
    </Stack>
  );
}
