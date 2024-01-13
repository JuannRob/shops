import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { IProductEntity } from '../ts/interfaces/api.interface';
interface ItemProps {
  shopItem: IProductEntity;
}

export default function SmallShopCard(props: ItemProps) {
  const { shopItem } = props;
  return (
    <View style={styles.productCard}>
      <Image
        key={shopItem.id}
        source={{
          uri: shopItem.thumbnail,
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{shopItem.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {},
});
