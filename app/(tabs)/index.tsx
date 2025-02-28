import { Image, StyleSheet, Platform, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGetApi } from '@/hooks/useGetApi';
import { useCallback, useEffect, useState } from 'react';

export default function HomeScreen() {
  const { makeRequest, status } = useGetApi();
  const [ message, setMessage ] = useState('');
  const [ volunteer, setVolunteer] = useState();

  const NGO = 'YWCA Child Development Centre - Ang Mo Kio';
  useEffect(() => {
    (async function apiCall() {
      const response = await makeRequest('ngo/youth');
      setMessage(response.data.Name);
    })();
  }, []);

  const searchVolunteer = useCallback(async () => {
    const response = await makeRequest(`volunteer/search/${NGO}`);
    setVolunteer(response.data);
  }, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! {message}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Ready to find volunteers?</ThemedText>
        <ThemedText>
          <Button onPress={searchVolunteer} title={"Search"}></Button>
        </ThemedText>
      </ThemedView>
      {volunteer && <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Ready to find volunteers?</ThemedText>
        <ThemedText>
          {volunteer}
        </ThemedText>
      </ThemedView>
      }
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
