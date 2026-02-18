import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const carlogo = require("@/assets/images/taxi.png");

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/taxical");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <Image source={carlogo} style={styles.carlogo} />
        <Text style={styles.appnameen}>TAXI METER</Text>
        <Text style={styles.appnameth}>TAXI FARE CALCULATOR</Text>
        <ActivityIndicator
          size="large"
          color="#007E6E"
          style={{ marginTop: 20 }}
        />
      </View>
      <View
        style={{
          padding: 20,
          marginTop: 20,
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Text style={styles.textid}>ID : 6652410025</Text>
        <Text style={styles.textname}>NAME : ชัยสิทธิ์ เพิ่มผล</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textid: {
    fontFamily: "kanit_400Regular",
    fontSize: 16,
    color: "#80898d",
  },
  textname: {
    fontFamily: "kanit_400Regular",
    fontSize: 16,
    color: "#80898d",
  },
  cards: {
    backgroundColor: "#F5C857",
    padding: 60,
    borderRadius: 10,
    alignItems: "center",
    gap: 5,
  },
  appnameen: {
    fontFamily: "kanit_700Bold",
    fontSize: 24,
    color: "#1B211A",
  },
  appnameth: {
    fontFamily: "kanit_400Regular",
    fontSize: 20,
    color: "#007E6E",
  },
  carlogo: {
    width: 200,
    height: 200,
  },
  container: {
    gap: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe52a",
  },
});
