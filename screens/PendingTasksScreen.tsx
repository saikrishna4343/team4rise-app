import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppStore } from "../store/useAppStore";

interface Challenge {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  icon: string;
  color: string;
  completed: boolean;
}

const ProgressBar = ({ progress, color }: { progress: number; color: string }) => {
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
    </View>
  );
};

const TaskCard = ({ challenge }: { challenge: Challenge }) => {
  const progress = (challenge.current / challenge.target) * 100;

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

      <ProgressBar progress={progress} color={challenge.color} />

      <View style={styles.remainingContainer}>
        <Text style={styles.remainingText}>
          {challenge.target - challenge.current} {challenge.unit} remaining
        </Text>
      </View>
    </View>
  );
};

export default function PendingTasksScreen({ navigation }: any) {
  const challenges = useAppStore((s) => s.challenges) || [];
  const pendingChallenges = challenges.filter((c) => !c.completed);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pending Tasks</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {pendingChallenges.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <FontAwesome5 name="check-circle" size={48} color="#43A047" />
            </View>
            <Text style={styles.emptyTitle}>All Done!</Text>
            <Text style={styles.emptySubtitle}>
              You've completed all your challenges. Great work! 🎉
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>
                You have <Text style={styles.summaryNumber}>{pendingChallenges.length}</Text> pending {pendingChallenges.length === 1 ? 'task' : 'tasks'}
              </Text>
            </View>

            {pendingChallenges.map((challenge) => (
              <TaskCard key={challenge.id} challenge={challenge} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  summaryCard: {
    backgroundColor: "#E3F2FD",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 15,
    color: "#1565C0",
    textAlign: "center",
  },
  summaryNumber: {
    fontWeight: "bold",
    fontSize: 16,
  },
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
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  taskProgress: {
    fontSize: 13,
    color: "#757575",
  },
  percentageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  remainingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  remainingText: {
    fontSize: 12,
    color: "#9E9E9E",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#757575",
    textAlign: "center",
    lineHeight: 22,
  },
});