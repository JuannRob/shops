import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IShop } from '../ts/interfaces/shop.interface';
import GlobalStyles from 'constants/Styles';
interface ItemProps {
  shopItem: IShop;
}

const windowWidth = Dimensions.get('window').width;

const ShopCard = (props: ItemProps) => {
  const { shopItem } = props;
  return (
    <Link
      href={{
        pathname: '/(app)/shops/detail',
        params: { id: shopItem.uid },
      }}
      asChild>
      <TouchableOpacity
        style={{
          ...GlobalStyles.shadow,
          backgroundColor: 'white',
          flexDirection: 'row',
          borderRadius: 10,
        }}>
        <Image
          key={shopItem.uid}
          source={{
            uri: shopItem.avatarURL,
          }}
          style={styles.shopImg}
          resizeMode="cover"
        />
        <View style={styles.shopBody}>
          <Text style={GlobalStyles.defaultText}>{shopItem.name}</Text>
          <Text style={styles.description}>{shopItem.description}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default ShopCard;

const styles = StyleSheet.create({
  shopImg: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: windowWidth * 0.25,
    height: '100%',
    aspectRatio: 1,
  },
  shopBody: {
    flex: 1,
    width: windowWidth * 0.6,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});
