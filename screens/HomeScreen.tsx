import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppStore } from "../store/useAppStore";

// Modern Card component
interface CardProps {
  icon: string;
  label: string;
  value: string | number;
  backgroundColor: string;
  iconColor: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = React.memo(
  ({ icon, label, value, backgroundColor, iconColor, onPress }) => {
    const CardContent = (
      <View style={[styles.card, { backgroundColor }]}>
        <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
          <FontAwesome5 name={icon} size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>

        {onPress && (
          <View style={styles.chevronContainer}>
            <FontAwesome5 name="chevron-right" size={14} color={iconColor} />
          </View>
        )}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ width: "48%" }}>
          {CardContent}
        </TouchableOpacity>
      );
    }

    return <View style={{ width: "48%" }}>{CardContent}</View>;
  }
);

export default function HomeScreen({ navigation }: any) {
  const challenges = useAppStore((s) => s.challenges) || [];
  const completed = challenges.filter((c) => c.completed).length;
  const pending = challenges.length - completed;

  const totalMinutes = useAppStore((s) => s.totalMinutes) || 0;
  const totalCalories = useAppStore((s) => s.totalCalories) || 0;
  const stepsTaken = useAppStore((s) => s.stepsTaken) || 0;

  const cardData = [
    {
      icon: "hourglass-half",
      label: "Pending Tasks",
      value: pending,
      backgroundColor: "#FFF3E0",
      iconColor: "#FB8C00",
      onPress: () => navigation.navigate("PendingTasks"),
    },
    {
      icon: "check-circle",
      label: "Completed",
      value: completed,
      backgroundColor: "#E8F5E9",
      iconColor: "#43A047",
      onPress: () => navigation.navigate("CompletedTasks"),
    },
    {
      icon: "stopwatch",
      label: "Active Minutes",
      value: totalMinutes,
      backgroundColor: "#E3F2FD",
      iconColor: "#1E88E5",
    },
    {
      icon: "fire",
      label: "Calories Burned",
      value: totalCalories,
      backgroundColor: "#FFEBEE",
      iconColor: "#E53935",
    },
    {
      icon: "walking",
      label: "Steps Taken",
      value: stepsTaken.toLocaleString(),
      backgroundColor: "#F3E5F5",
      iconColor: "#8E24AA",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCentered}>
          <View style={styles.appIconContainer}>
            <FontAwesome5 name="running" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.appTitle}>Team4Rise</Text>
          <Text style={styles.appSubtitle}>Your fitness journey</Text>
        </View>
      </View>

      {/* Dashboard Cards */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>

        <View style={styles.cardsContainer}>
          {cardData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  headerCentered: {
    alignItems: "center",
    justifyContent: "center",
  },

  appIconContainer: {
    backgroundColor: "#2E86DE",
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  appSubtitle: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: "relative",
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#616161",
    marginBottom: 4,
  },

  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  chevronContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
