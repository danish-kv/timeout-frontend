import React, { useState } from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/ProfileHeader";
import NavigationTabs from "../components/NavigationTabs";
import PersonalOverview from "../components/PersonalOverview";
import LeaveHistory from "../components/LeaveHistory";
import LeaveRequestModal from "../modal/LeaveRequestModal";
import useProfile from "../hooks/useProfile";
import api from "../../../services/api";
import { showToast } from "../../../utils/showToast";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [leaveRequestModal, setLeaveRequestModal] = useState(false);
  const [leaveRequestData, setLeaveRequestData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    attachment: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { profile, getProfile, loading } = useProfile();
  console.log(profile);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleRequestLeave = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("leave_type", leaveRequestData.leave_type);
    formData.append("start_date", formatDate(leaveRequestData.start_date));
    formData.append("end_date", formatDate(leaveRequestData.end_date));
    formData.append("reason", leaveRequestData.reason);
    if (leaveRequestData.attachment) {
      formData.append("attachment", leaveRequestData.attachment);
    }

    try {
      const res = await api.post("api/leave-request/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      showToast(200, "Submitted");
      getProfile();
      setLeaveRequestModal(false);
    } catch (error) {
      console.error("Error submitting leave request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile || profile.length === 0) {
    return <p>No profile data found.</p>;
  }

  console.log("parent ===", profile);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader employeeData={profile[0]} />
        <NavigationTabs
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {activeSection === "overview" && (
          <PersonalOverview employeeData={profile[0]} />
        )}

        {activeSection === "leave-history" && (
          <LeaveHistory onNewRequest={() => setLeaveRequestModal(true)} />
        )}

        {leaveRequestModal && (
          <LeaveRequestModal
            leaveRequestData={leaveRequestData}
            onClose={() => setLeaveRequestModal(false)}
            setLeaveRequestData={setLeaveRequestData}
            onSubmit={handleRequestLeave}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
