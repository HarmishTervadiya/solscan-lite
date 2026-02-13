import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import EthIcon from "../../assets/c09ded1da7bc8ee7669707364ca8aa5a0fff5108.png";
import DaiIcon from "../../assets/700200cb25b6fde7dbcfb0c7bcc8bc96032bb777.jpg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Swap() {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView enabled behavior="position">
        <Text style={styles.header}>Swap Tokens</Text>
        <View style={styles.currencyCard}>
          <View style={styles.cardRow}>
            <TouchableOpacity style={styles.currencyDropdown}>
              <Image source={EthIcon} style={styles.icon} />
              <Text style={styles.currencyLabel}>ETH</Text>
              <Ionicons name="chevron-down" size={20} color={"#fff"} />
            </TouchableOpacity>
            <TextInput style={styles.amount}>0.28014</TextInput>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.balance}>Balance: 0.00661 ETH</Text>
            <Text style={styles.balance}>$499.749</Text>
          </View>
        </View>
        <View style={styles.swapArrow}>
          <Ionicons name="arrow-down" size={20} color={"#fff"} />
        </View>
        <View style={styles.currencyCard}>
          <View style={styles.cardRow}>
            <TouchableOpacity style={styles.currencyDropdown}>
              <Image source={DaiIcon} style={styles.icon} />
              <Text style={styles.currencyLabel}>Dai</Text>
              <Ionicons name="chevron-down" size={20} color={"#fff"} />
            </TouchableOpacity>
            <TextInput style={styles.amount}>0.28014</TextInput>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.balance}>Balance: 0.00661 Dai</Text>
            <Text style={styles.balance}>$499.749</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.btnText}>Swap</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D0D12",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    color: "#fff",
    margin: 12,
    fontSize: 20,
    fontWeight: "500",
  },
  currencyCard: {
    backgroundColor: "#181818",
    padding: 14,
    marginVertical: 8,
    borderRadius: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balance: {
    color: "#A9AAB2",
    fontSize: 14,
  },
  currencyLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  amount: {
    color: "#fff",
    fontSize: 28,
  },
  swapArrow: {
    position: "absolute",
    top: 160,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 22,
    overflow: "hidden",
    alignSelf: "center",
    padding: 2,
    width: 30,
    height: 30,
    backgroundColor: "#000",
    borderRadius: 50,
  },
  currencyDropdown: {
    // width: 70,
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 4,
  },
  icon: {
    height: 20,
    width: 20,
    borderRadius: 50,
  },
  submitButton: {
    backgroundColor: "#14F195",
    borderRadius: 20,
    padding: 8,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
