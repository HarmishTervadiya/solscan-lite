import {
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConnectButton } from "@/components/ConnectButton";
import { useWallet } from "@/hooks/useWallet";
import { short, timeAgo } from "@/utils/format";
import { FavoriteButton } from "@/components/FavouriteButton";
import { router } from "expo-router";
import { getTxns } from "@/services/solana";

export default function WalletScreen() {
  const wallet = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [txns, setTxns] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTxns = async () => {
    if (!wallet.publicKey) return;
    const txns = await getTxns(wallet.publicKey.toBase58())
    console.log(txns)
    setTxns(txns);
  }

  const fetchBalance = async () => {
    setBalance(await wallet.getBalance());
  };

  useEffect(() => {
    fetchBalance();
    fetchTxns();
  }, [wallet.connection, wallet.publicKey]);

  const handleRefresh = () => {
    fetchBalance();
    fetchTxns();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scroll}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={"#000"}
              colors={["#14F195"]}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />}>

          <View style={styles.header}>
            <Text style={styles.title}>◎ SolScan</Text>
            <ConnectButton
              connected={wallet.connected}
              connecting={wallet.connecting}
              publicKey={wallet.publicKey?.toBase58() ?? null}
              onConnect={wallet.connect}
              onDisconnect={wallet.disconnect}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>SOL Balance</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balance}>{balance?.toFixed(4)}</Text>
              <Text style={styles.sol}>SOL</Text>
            </View>
            <Text style={styles.addr}>
              {short(wallet.publicKey?.toString() || "", 6)}
            </Text>
          </View>

          {wallet.connected && (
            <View style={{ marginTop: 12 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => router.push("/send")}
              >
                <Text style={styles.btnText}>Send SOL</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.section}>Recent Transactions</Text>
          <FlatList
            data={txns}
            keyExtractor={(t) => t.sig}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(`https://solscan.io/tx/${item.sig}`)
                }
              >
                <View>
                  <Text style={styles.mint}>{short(item.sig, 8)}</Text>
                  <Text style={styles.time}>
                    {item.time ? timeAgo(item.time) : "pending"}
                  </Text>
                </View>
                <Text
                  style={{
                    color: item.ok ? "#14F195" : "#EF4444",
                    fontSize: 18,
                  }}
                >
                  {item.ok ? "+" : "-"}
                </Text>
              </TouchableOpacity>
            )}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D0D12",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 15,
  },
  networkToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16161D",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2A2A35",
    gap: 6,
  },
  networkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#14F195",
  },
  networkDotDevnet: {
    backgroundColor: "#F59E0B",
  },
  networkText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
  },
  historySection: {
    marginTop: 24,
  },
  historyTitle: {
    color: "#6B7280",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16161D",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#2A2A35",
    gap: 12,
  },
  historyAddress: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
  },
  inputContainer: {
    backgroundColor: "#16161D",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A35",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 15,
    paddingVertical: 14,
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  btn: {
    flex: 1,
    backgroundColor: "#14F195",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#0D0D12",
    fontWeight: "600",
    fontSize: 16,
  },
  btnGhost: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#16161D",
    borderWidth: 1,
    borderColor: "#2A2A35",
  },
  btnGhostText: {
    color: "#9CA3AF",
    fontSize: 15,
  },
  card: {
    backgroundColor: "#16161D",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    marginTop: 28,
    borderWidth: 1,
    borderColor: "#2A2A35",
    position: "relative",
  },
  favoriteWrapper: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  label: {
    color: "#6B7280",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 8,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "700",
  },
  sol: {
    color: "#14F195",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  addr: {
    color: "#9945FF",
    fontSize: 13,
    fontFamily: "monospace",
    marginTop: 16,
    backgroundColor: "#1E1E28",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  section: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 32,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#16161D",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2A2A35",
  },
  mint: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
  },
  amount: {
    color: "#14F195",
    fontSize: 15,
    fontWeight: "600",
  },
  tokenRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  time: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  },
});
