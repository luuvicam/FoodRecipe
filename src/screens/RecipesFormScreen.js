import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saverecipe = async () => {
    try {
      // Create new recipe object
      const newRecipe = {
        title,
        image,
        description,
        id: recipeToEdit ? recipeToEdit.id : Date.now().toString(), // Use existing ID if editing, or create new one
        createdAt: recipeToEdit ? recipeToEdit.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Get existing recipes from AsyncStorage
      const existingRecipesJSON = await AsyncStorage.getItem("customrecipes");
      let recipes = existingRecipesJSON ? JSON.parse(existingRecipesJSON) : [];

      if (recipeToEdit) {
        // Editing existing recipe
        if (recipeIndex !== undefined) {
          recipes[recipeIndex] = newRecipe;
        } else {
          // Find recipe by ID if index not provided
          const recipeIndexById = recipes.findIndex(recipe => recipe.id === recipeToEdit.id);
          if (recipeIndexById !== -1) {
            recipes[recipeIndexById] = newRecipe;
          }
        }
        
        // Call callback if provided
        if (onrecipeEdited) {
          onrecipeEdited(newRecipe);
        }
      } else {
        // Adding new recipe
        recipes.push(newRecipe);
      }

      // Save updated recipes array back to AsyncStorage
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
      
      // Navigate back
      navigation.goBack();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
