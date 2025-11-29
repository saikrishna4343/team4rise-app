import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// Mock teams data - replace with your store data
const TEAMS = [
  {
    id: "1",
    name: "Team4Rise Warriors",
    members: 12,
    totalSteps: 245000,
    rank: 1,
    color: "#2E86DE",
    avatar: "https://cdn-icons-png.flaticon.com/512/4436/4436481.png",
  },
  {
    id: "2",
    name: "Fitness Champions",
    members: 8,
    totalSteps: 198000,
    rank: 3,
    color: "#43A047",
    avatar: "https://cdn-icons-png.flaticon.com/512/4436/4436477.png",
  },
  {
    id: "3",
    name: "Health Heroes",
    members: 15,
    totalSteps: 312000,
    rank: 2,
    color: "#E53935",
    avatar: "https://cdn-icons-png.flaticon.com/512/4436/4436490.png",
  },
];

interface TeamCardProps {
  team: typeof TEAMS[0];
  onPress: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onPress }) => {
  return (
    <TouchableOpacity style={styles.teamCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.teamBanner, { backgroundColor: team.color }]}>
        <View style={styles.rankBadge}>
          <FontAwesome5 name="trophy" size={14} color="#FFD700" />
          <Text style={styles.rankText}>#{team.rank}</Text>
        </View>
      </View>

      <View style={styles.teamContent}>
        <Image source={{ uri: team.avatar }} style={styles.teamAvatar} />

        <Text style={styles.teamName}>{team.name}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <FontAwesome5 name="users" size={16} color="#757575" />
            <Text style={styles.statText}>{team.members} members</Text>
          </View>
          <View style={styles.statItem}>
            <FontAwesome5 name="shoe-prints" size={16} color="#757575" />
            <Text style={styles.statText}>{team.totalSteps.toLocaleString()} steps</Text>
          </View>
        </View>

        <View style={[styles.viewButton, { backgroundColor: team.color }]}>
          <Text style={styles.viewButtonText}>View Team</Text>
          <FontAwesome5 name="arrow-right" size={14} color="#FFFFFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function TeamsScreen({ navigation }: any) {
  const handleTeamPress = (teamId: string) => {
    navigation.navigate("TeamDetail", { teamId });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="users" size={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>My Teams</Text>
            <Text style={styles.headerSubtitle}>You're part of {TEAMS.length} teams</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <FontAwesome5 name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Teams List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {TEAMS.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onPress={() => handleTeamPress(team.id)}
          />
        ))}
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
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2E86DE",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2E86DE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2E86DE",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2E86DE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  teamCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  teamBanner: {
    height: 80,
    justifyContent: "flex-end",
    padding: 16,
  },
  rankBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  rankText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  teamContent: {
    padding: 20,
    alignItems: "center",
  },
  teamAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: -50,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  teamName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: "#757575",
    fontWeight: "500",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  viewButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});