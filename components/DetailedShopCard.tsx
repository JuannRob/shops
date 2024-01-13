import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { IProductEntity } from '../ts/interfaces/api.interface';
interface ItemProps {
  shopItem: IProductEntity;
}

export default function DetailedShopCard(props: ItemProps) {
  const { shopItem } = props;
  return (
    <View style={styles.productCard}>
      <Image
        key={shopItem.id}
        source={{
          uri: shopItem.thumbnail,
        }}
        style={{
          height: 150,
          width: 150,
          borderTopLeftRadius: 9,
          borderBottomLeftRadius: 9,
        }}
      />
      <Text style={styles.cardTitle}>{shopItem.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  cardTitle: {
    //TODO: revisar tamaño del titulo
    width: '60%',
    textAlign: 'center',
    paddingTop: 5,
  },
});
