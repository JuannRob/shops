import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { fetchShops } from 'services/db/shop.service';
import { IShop } from 'ts/interfaces/shop.interface';

import ShopCard from 'components/ShopCard';
import GlobalStyle from 'constants/Styles';
import { handleError } from 'utils/handleError';

export default function List() {
  const [shops, setShops] = useState<IShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchShops()
      .then((shops) => {
        setShops(shops);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color="black" style={{ flex: 1 }} />;

  return (
    <>
      {!isLoading && shops.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shops}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => <ShopCard shopItem={item as IShop} />}
          contentContainerStyle={{ padding: 20, gap: 15 }}
        />
      ) : (
        <View style={GlobalStyle.container}>
          <Text style={GlobalStyle.title}>No shops found</Text>
        </View>
      )}
    </>
  );
}
