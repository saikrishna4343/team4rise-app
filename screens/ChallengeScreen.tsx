import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppStore } from "../store/useAppStore";
import { TaskCard, Challenge } from "../screens/TaskCard";

export default function ChallengeScreen({ navigation }: any) {
  const challenges: Challenge[] = useAppStore((s) => s.challenges) || [];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.appIconContainer}>
            <FontAwesome5 name="running" size={28} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.appTitle}>Team4Rise</Text>
            <Text style={styles.appSubtitle}>Your fitness journey</Text>
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard challenge={item} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 48,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: { flexDirection: "row", alignItems: "center" },
  appIconContainer: {
    backgroundColor: "#2E86DE",
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  appTitle: { fontSize: 28, fontWeight: "bold", color: "#1A1A1A" },
  appSubtitle: { fontSize: 14, color: "#757575", marginTop: 4 },
});
