import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export interface Challenge {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  icon: string;
  color: string;
  completed: boolean;
}

interface TaskCardProps {
  challenge: Challenge;
}

export const TaskCard: React.FC<TaskCardProps> = ({ challenge }) => {
  const progress = (challenge.current / challenge.target) * 100;
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={[styles.taskIconCircle, { backgroundColor: challenge.color }]}>
          <FontAwesome5 name={challenge.icon} size={18} color="#FFFFFF" />
        </View>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{challenge.title}</Text>
          <Text style={styles.taskProgress}>
            {challenge.current} / {challenge.target} {challenge.unit}
          </Text>
        </View>
        <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${percentage}%`, backgroundColor: challenge.color }]} />
      </View>

      <View style={styles.remainingContainer}>
        <Text style={styles.remainingText}>
          {challenge.target - challenge.current} {challenge.unit} remaining
        </Text>
      </View>

      {/* Completed Overlay */}
      {challenge.completed && (
        <View style={styles.completedOverlay}>
          <Text style={styles.completedText}>Completed ✔</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: "relative", // required for overlay
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  taskIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: "600", color: "#1A1A1A", marginBottom: 4 },
  taskProgress: { fontSize: 13, color: "#757575" },
  percentageText: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A" },
  progressBarContainer: { height: 8, backgroundColor: "#E0E0E0", borderRadius: 4, overflow: "hidden", marginBottom: 12 },
  progressBarFill: { height: "100%", borderRadius: 4 },
  remainingContainer: { flexDirection: "row", alignItems: "center" },
  remainingText: { fontSize: 12, color: "#9E9E9E", fontWeight: "500" },
  completedOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(67, 160, 71, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#43A047",
  },
});
