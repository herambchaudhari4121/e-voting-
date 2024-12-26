import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./Sidebar"; // Import Navbar component

const ElectionSelectionPage = ({ onVoteNow }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const elections = [
    { 
      id: 1, 
      name: "Presidential Election", 
      description: "Vote for the next president.", 
      endTime: "2024-12-31", 
      ongoing: true,
      image: "https://static.vecteezy.com/system/resources/thumbnails/038/516/357/small_2x/ai-generated-eagle-logo-design-in-black-style-on-transparant-background-png.png" // Image URL
    },
    { 
      id: 2, 
      name: "City Council Election", 
      description: "Vote for your city council representative.", 
      endTime: "2024-12-25", 
      ongoing: true,
      image: "https://static.vecteezy.com/system/resources/thumbnails/038/516/357/small_2x/ai-generated-eagle-logo-design-in-black-style-on-transparant-background-png.png" // Image URL
    },
  ];

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
    backgroundColor: "#121212", // Dark background for the body
    padding: "0", // Ensure no padding
    margin: "0", // Ensure no margin
    color: "#fff", // Default text color for dark theme
    overflow: "hidden", // Prevent scrollbars
  };

  const cardStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    width: "100%", // Make it responsive
    backgroundColor: "#1e1e1e", // Dark card background
    borderRadius: "10px",
    boxShadow: "0 0px 100px rgba(43, 144, 252, 0.64)", // Glowing effect around the card
  };

  const electionStyle = {
    border: "1px solid #333", // Darker border for election items
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    transition: "transform 0.2s, box-shadow 0.2s",
    backgroundColor: "#2a2a2a", // Darker background for election items
    display: "flex", // Use flexbox to align items
    alignItems: "center", // Center items vertically
  };

  const buttonStyle = {
    padding: "12px 30px", // Smaller padding for a smaller button
    backgroundColor: "#007bff", // Button color
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s, box-shadow 0.3s", // Added box-shadow transition
    marginTop: "10px", // Space above the button
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#555", // Darker disabled button
    cursor: "not-allowed",
  };

  const handleVote = (electionId) => {
    onVoteNow(electionId); // Call the parent function to set the current election
    navigate("/voting"); // Navigate to the VotingPage
  };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", margin: "0", padding: "0", overflow: "hidden" }}> {/* Main div with dark theme */}
      <Navbar /> {/* Navbar added here */}
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Available Elections</h2>
          {elections.map((election) => (
            <div 
              key={election.id} 
              style={electionStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 123, 255, 0.8)"; // Glowing effect
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none"; // Remove glow
              }}
            >
              <img 
                src={election.image} 
                alt={election.name} 
                style={{ width : "80px", height: "80px", marginRight: "15px", borderRadius: "5px" }} // Increased image size
              />
              <div style={{ flex: 1 }}> {/* Flex to allow text to take remaining space */}
                <h3 style={{ marginBottom: "5px" }}>{election.name}</h3>
                <p style={{ marginBottom: "5px" }}>{election.description}</p>
                <p style={{ marginBottom: "10px" }}>Ends: {election.endTime}</p>
              </div>
              {election.ongoing ? (
                <button 
                  style={buttonStyle} 
                  onClick={() => handleVote(election.id)} // Use handleVote to navigate
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#0056b3";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 123, 255, 0.8)"; // Glowing effect on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#007bff";
                    e.currentTarget.style.boxShadow = "none"; // Remove glow
                  }}
                >
                  Vote
                </button>
              ) : (
                <button style={buttonDisabledStyle} disabled>
                  Closed
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectionSelectionPage;