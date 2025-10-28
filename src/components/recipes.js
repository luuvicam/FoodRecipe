import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          numColumns={2}
          keyExtractor={(item) => item.idFood}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, { 
        marginLeft: index % 2 === 0 ? 0 : wp(2),
        marginRight: index % 2 === 1 ? 0 : wp(2)
      }]} 
      testID="articleDisplay"
      onPress={() => navigation.navigate("RecipeDetail", { ...item })}
    >
      <Image
        source={{ uri: item.recipeImage }}
        style={styles.articleImage}
      />
      <Text style={styles.articleText} numberOfLines={1}>
        {item.recipeName}
      </Text>
      <Text style={styles.articleDescription} numberOfLines={2}>
        {item.cookingDescription}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  flatListContainer: {
    paddingBottom: hp(2),
  },
  cardContainer: {
    flex: 1,
    marginBottom: hp(2),
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  articleImage: {
    width: "100%",
    height: hp(15),
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  articleText: {
    fontSize: hp(1.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginTop: hp(1),
    marginBottom: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.4),
    color: "#6B7280", // gray-500
    lineHeight: hp(1.8),
  },
});
