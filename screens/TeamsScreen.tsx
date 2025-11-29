import React,  { useState }  from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

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

    // Modal State
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState<string | null>(null);

  // Pick Image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setTeamImage(result.assets[0].uri);
    }
  };

  const handleCreateTeam = () => {
    console.log("Team Name:", teamName);
    console.log("Image:", teamImage);

    // (Later: send to backend)
    setShowModal(false);
    setTeamName("");
    setTeamImage(null);
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
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
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
       {/* ⭐ Add Team Modal */}
            <Modal visible={showModal} transparent animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                  <Text style={styles.modalTitle}>Create New Team</Text>

                  {/* Team Name */}
                  <TextInput
                    placeholder="Team Name"
                    style={styles.input}
                    value={teamName}
                    onChangeText={setTeamName}
                  />

                  {/* Image Picker */}
                  <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    {teamImage ? (
                      <Image source={{ uri: teamImage }} style={styles.previewImage} />
                    ) : (
                      <>
                        <FontAwesome5 name="camera" size={20} color="#777" />
                        <Text style={styles.imagePickerText}>Upload Team Image</Text>
                      </>
                    )}
                  </TouchableOpacity>

                  {/* Buttons */}
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowModal(false)}>
                      <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.createBtn} onPress={handleCreateTeam}>
                      <Text style={styles.btnTextWhite}>Create</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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


  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  imagePicker: {
    height: 120,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  imagePickerText: { marginTop: 6, color: "#777" },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  cancelBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#DDD",
    borderRadius: 10,
    marginRight: 10,
  },

  createBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#2E86DE",
    borderRadius: 10,
    marginLeft: 10,
  },

  btnText: { textAlign: "center", fontWeight: "600" },

  btnTextWhite: { textAlign: "center", fontWeight: "600", color: "#FFF" },

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