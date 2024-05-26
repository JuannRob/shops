import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getShopById } from 'services/db/shop.service';
import { IShop } from 'ts/interfaces/shop.interface';
import GlobalStyles from 'constants/Styles';
import { handleError } from 'utils/handleError';

const Detail = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const [shop, setShop] = useState<IShop | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getShopById(id)
      .then((shop) => {
        setShop(shop);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color="black" style={{ flex: 1 }} />;

  return (
    <View style={GlobalStyles.container}>
      {shop ? (
        <>
          <Image source={{ uri: shop.avatarURL }} style={styles.avatar} />
          <Text style={[GlobalStyles.title, { marginBottom: 5 }]}>{shop.name}</Text>
          <Text style={[GlobalStyles.defaultText, { marginBottom: 5 }]}>{shop.description}</Text>
          <Text style={[GlobalStyles.defaultText, { marginBottom: 5, fontWeight: 'bold' }]}>
            {shop.categoryName}
          </Text>
          <Text
            style={[
              GlobalStyles.defaultText,
              { marginBottom: 5 },
            ]}>{`[ ${shop.ownerName} |  ${shop.contactInfo} ]`}</Text>
        </>
      ) : (
        <Text style={GlobalStyles.title}>Shop not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 350,
    height: 350,
    marginBottom: 10,
    borderRadius: 15,
  },
});

export default Detail;
