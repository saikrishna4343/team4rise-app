import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// Mock leaderboard data
const LEADERBOARD = [
  {
    id: "1",
    name: "Sarah Johnson",
    steps: 45200,
    calories: 2100,
    minutes: 320,
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
  {
    id: "2",
    name: "Mike Smith",
    steps: 42800,
    calories: 1980,
    minutes: 295,
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
  },
  {
    id: "3",
    name: "Emma Davis",
    steps: 41500,
    calories: 1850,
    minutes: 280,
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png",
  },
  {
    id: "4",
    name: "John Doe",
    steps: 38900,
    calories: 1720,
    minutes: 265,
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    steps: 36200,
    calories: 1650,
    minutes: 245,
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
  },
];

const TEAM_MEMBERS = [
  { id: "1", name: "Sarah Johnson", role: "Captain", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" },
  { id: "2", name: "Mike Smith", role: "Member", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png" },
  { id: "3", name: "Emma Davis", role: "Member", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png" },
  { id: "4", name: "John Doe", role: "Member", avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png" },
  { id: "5", name: "Lisa Anderson", role: "Member", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png" },
  { id: "6", name: "Tom Wilson", role: "Member", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140055.png" },
  { id: "7", name: "Amy Brown", role: "Member", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140060.png" },
  { id: "8", name: "Chris Lee", role: "Member", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140046.png" },
];

const getMedalColor = (rank: number) => {
  if (rank === 1) return "#FFD700"; // Gold
  if (rank === 2) return "#C0C0C0"; // Silver
  if (rank === 3) return "#CD7F32"; // Bronze
  return "#9E9E9E";
};

const LeaderboardItem = ({ member, rank }: { member: typeof LEADERBOARD[0]; rank: number }) => {
  return (
    <View style={[styles.leaderboardItem, rank <= 3 && styles.topThree]}>
      <View style={styles.rankContainer}>
        {rank <= 3 ? (
          <FontAwesome5 name="medal" size={24} color={getMedalColor(rank)} />
        ) : (
          <Text style={styles.rankNumber}>{rank}</Text>
        )}
      </View>

      <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />

      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBadge}>
            <FontAwesome5 name="shoe-prints" size={10} color="#8E24AA" />
            <Text style={styles.statBadgeText}>{member.steps.toLocaleString()}</Text>
          </View>
          <View style={styles.statBadge}>
            <FontAwesome5 name="fire" size={10} color="#E53935" />
            <Text style={styles.statBadgeText}>{member.calories}</Text>
          </View>
          <View style={styles.statBadge}>
            <FontAwesome5 name="clock" size={10} color="#1E88E5" />
            <Text style={styles.statBadgeText}>{member.minutes}m</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const AddMemberModal = ({ visible, onClose, onAdd }: { visible: boolean; onClose: () => void; onAdd: (email: string) => void }) => {
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (email.trim()) {
      onAdd(email);
      setEmail("");
      onClose();
    } else {
      Alert.alert("Error", "Please enter a valid email");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.addModalOverlay}>
        <View style={styles.addModalContent}>
          <Text style={styles.addModalTitle}>Add Team Member</Text>
          <Text style={styles.addModalSubtitle}>Enter the email address of the person you want to invite</Text>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" size={16} color="#9E9E9E" style={{ marginRight: 12 }} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#9E9E9E"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.addModalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Send Invite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const MembersModal = ({
  visible,
  onClose,
  onAddMember,
  onRemoveMember
}: {
  visible: boolean;
  onClose: () => void;
  onAddMember: () => void;
  onRemoveMember: (memberId: string, memberName: string) => void;
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Team Members ({TEAM_MEMBERS.length})</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome5 name="times" size={20} color="#757575" />
            </TouchableOpacity>
          </View>

          {/* Add Member Button */}
          <TouchableOpacity style={styles.addMemberButton} onPress={onAddMember}>
            <FontAwesome5 name="user-plus" size={18} color="#FFFFFF" />
            <Text style={styles.addMemberButtonText}>Add New Member</Text>
          </TouchableOpacity>

          <ScrollView style={styles.membersList} showsVerticalScrollIndicator={false}>
            {TEAM_MEMBERS.map((member) => (
              <View key={member.id} style={styles.memberItem}>
                <Image source={{ uri: member.avatar }} style={styles.memberModalAvatar} />
                <View style={styles.memberModalInfo}>
                  <View style={styles.memberNameRow}>
                    <Text style={styles.memberModalName}>{member.name}</Text>
                    {member.role === "Captain" && (
                      <FontAwesome5 name="crown" size={14} color="#FFD700" style={{ marginLeft: 8 }} />
                    )}
                  </View>
                  <Text style={styles.memberModalRole}>{member.role}</Text>
                </View>
                {member.role !== "Captain" && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => onRemoveMember(member.id, member.name)}
                  >
                    <FontAwesome5 name="times" size={16} color="#E53935" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function TeamDetailScreen({ navigation, route }: any) {
  const [showMembers, setShowMembers] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const { teamId } = route.params || {};

  const handleAddMember = (email: string) => {
    // TODO: Add your API call here to invite member
    Alert.alert("Invite Sent!", `An invitation has been sent to ${email}`);
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    Alert.alert(
      "Remove Member",
      `Are you sure you want to remove ${memberName} from the team?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            // TODO: Add your API call here to remove member
            Alert.alert("Success", `${memberName} has been removed from the team`);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/4436/4436481.png" }}
            style={styles.teamLogo}
          />
          <Text style={styles.headerTitle}>Team4Rise Warriors</Text>
        </View>
        <TouchableOpacity onPress={() => setShowMembers(true)} style={styles.membersButton}>
          <FontAwesome5 name="users" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Month Selector */}
      <View style={styles.monthContainer}>
        <TouchableOpacity style={styles.monthArrow}>
          <FontAwesome5 name="chevron-left" size={16} color="#757575" />
        </TouchableOpacity>
        <Text style={styles.monthText}>November 2024</Text>
        <TouchableOpacity style={styles.monthArrow}>
          <FontAwesome5 name="chevron-right" size={16} color="#757575" />
        </TouchableOpacity>
      </View>

      {/* Leaderboard */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>🏆 Monthly Leaderboard</Text>
        {LEADERBOARD.map((member, index) => (
          <LeaderboardItem key={member.id} member={member} rank={index + 1} />
        ))}
      </ScrollView>

      {/* Members Modal */}
      <MembersModal
        visible={showMembers}
        onClose={() => setShowMembers(false)}
        onAddMember={() => {
          setShowMembers(false);
          setShowAddMember(true);
        }}
        onRemoveMember={handleRemoveMember}
      />

      {/* Add Member Modal */}
      <AddMemberModal
        visible={showAddMember}
        onClose={() => setShowAddMember(false)}
        onAdd={handleAddMember}
      />
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
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  teamLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  membersButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#2E86DE",
    alignItems: "center",
    justifyContent: "center",
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 12,
    gap: 16,
  },
  monthArrow: {
    padding: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  topThree: {
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  rankContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9E9E9E",
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 6,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#757575",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "80%",
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  addMemberButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E86DE",
    marginHorizontal: 24,
    marginVertical: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#2E86DE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addMemberButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  membersList: {
    flex: 1,
    paddingBottom: 20,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  memberModalAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  memberModalInfo: {
    flex: 1,
  },
  memberNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberModalName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  memberModalRole: {
    fontSize: 13,
    color: "#757575",
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFEBEE",
    alignItems: "center",
    justifyContent: "center",
  },
  addModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  addModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  addModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  addModalSubtitle: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
  },
  addModalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#757575",
  },
  addButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#2E86DE",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});