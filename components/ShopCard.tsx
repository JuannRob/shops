import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { IShop } from '../ts/interfaces/shop.interface';

interface ItemProps {
  shopItem: IShop;
}

export default function ShopCard(props: ItemProps) {
  const { shopItem } = props;
  return (
    <View style={styles.boxShadow}>
      <View style={styles.shopCard}>
        <Image
          key={shopItem.uid}
          source={{
            uri: shopItem.avatarURL,
          }}
          style={styles.shopImg}
          resizeMode="contain"
        />
        <View style={styles.shopBody}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{shopItem.name}</Text>
          <Text style={{ fontSize: 15 }}>{shopItem.contactInfo}</Text>
          <Text style={styles.description}>{shopItem.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shopCard: {
    flexDirection: 'row',
  },
  shopImg: {
    height: '100%',
    width: '35%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  shopBody: {
    width: '65%',
    padding: 10,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  description: {
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'justify',
  },
  boxShadow: {
    borderRadius: 10,
    borderTopRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
  },
});
