import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useAppStore } from "../store/useAppStore";

const ProfileScreen = () => {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => logout()
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
        style={styles.avatar}
      />

      {/* Name */}
      <Text style={styles.name}>{user?.name || "User"}</Text>
      <Text style={styles.email}>{user?.email || "user@example.com"}</Text>

      {/* Team */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Team Info</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Team:</Text>
          <Text style={styles.value}>Team4Rise</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>Team Member</Text>
        </View>
      </View>

      {/* Edit Profile */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 20,
  },
  name: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 25,
  },
  card: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginVertical: 4,
  },
  label: {
    fontWeight: "600",
    width: 70,
  },
  value: {
    color: "#555",
  },
  editButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#2E86DE",
    borderRadius: 10,
    marginBottom: 15,
  },
  editText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  logoutButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#d63031",
    borderRadius: 10,
  },
  logoutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});