import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VoteConfirmationPage = ({ transactionHash }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleReturnToElectionSelection = () => {
    navigate("/election-selection"); // Navigate to Election Selection page
  };

  const handleViewHistory = () => {
    navigate("/history"); // Navigate to Voter History page
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212', // Dark background for the body
    position: 'relative', // Position relative for absolute positioning of the glow
    overflow: 'hidden', // Prevent overflow
  };

  const cardStyle = {
    backgroundColor: '#1e1e1e', // Dark card background
    borderRadius: '10px',
    boxShadow: '0 0 100px rgba(0, 123, 255, 0.5)', // Glowing effect around the card
    padding: '30px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    color: '#fff', // White text for dark theme
    zIndex: 1, // Ensure card is above the glow
  };

  const headingStyle = {
    color: '#ffffff',
    marginBottom: '20px',
  };

  const messageStyle = {
    color: '#dcdcdc', // Light gray for message
    marginBottom: '15px',
  };

  const transactionHashStyle = {
    color: '#7f8c8d',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
    marginBottom: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s', // Added transition for box-shadow
    margin: '10px 0', // Add some margin for spacing
    width: '100%', // Make buttons full width
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.8)', // Glowing effect
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Vote Confirmation</h2>
        <p style={messageStyle}>Your vote has been successfully submitted!</p>
        <p style={transactionHashStyle}>Transaction Hash: {transactionHash}</p>
        
        <button 
          style={buttonStyle} 
          onClick={handleReturnToElectionSelection}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
            e.currentTarget.style.boxShadow = buttonHoverStyle.boxShadow; // Add glow on hover
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
            e.currentTarget.style.boxShadow = 'none'; // Remove glow
          }}
        >
          Return to Dashboard
        </button>

        <button 
          style={buttonStyle} 
          onClick={handleViewHistory}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
            e.currentTarget.style.boxShadow = buttonHoverStyle.boxShadow; // Add glow on hover
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
            e.currentTarget.style.boxShadow = 'none'; // Remove glow
          }}
        >
          View Voter History
        </button>
      </div>
    </div>
  );
};

export default VoteConfirmationPage;