import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Contacts from "expo-contacts";
import { useState } from "react";
import { Button } from "react-native";
import { FlatList } from "react-native";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      {
      }
      if (data.length > 0) {
        setContacts(data);
      }
    }
    
  };
  console.log(contacts);
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.phoneNumbers && item.phoneNumbers[0]?.number !== "") {
            return (
              <View style={styles.item}>
                <Text style={styles.name}>{item.name} {item.phoneNumbers[0].number}</Text>
              </View>
            );
          }

          return (
            <View style={styles.item}>
            <Text>{item.name} Ei numeroa</Text>
            </View>
          );
        }}
      />
      <Button title="Get Contacts" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    padding: 16,
  },
});
