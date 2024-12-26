import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import ElectionSelectionPage from "./components/ElectionSelectionPage";
import VotingPage from "./components/VotingPage";
import VoteConfirmationPage from "./components/VoteConfirmationPage";
import VoterHistoryPage from "./components/VoterHistoryPage";
import SignUp from "./components/signUp"; // Import the SignUp component
import Login from "./components/login"; // Import the Login component

function App() {
  const [currentElection, setCurrentElection] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);

  const handleVoteNow = (electionId) => {
    setCurrentElection(electionId); // Set the current election
  };

  const handleSubmitVote = (candidateId) => {
    const mockTransactionHash = `0x${Math.random().toString(16).slice(2, 10)}`;
    setTransactionHash(mockTransactionHash);
  };

  const handleReturnToDashboard = () => {
    setCurrentElection(null);
    setTransactionHash(null);
  };

  const handleSignUpComplete = () => {
    // Logic after sign-up can be added here
  };

  return (
    <Router>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#121212",
          minHeight: "100vh",
          margin: "0",
          padding: "0",
          boxSizing: "border-box",
          color: "#fff",
        }}
      >
        <Routes>
          <Route path="/signup" element={<SignUp onSignUpComplete={handleSignUpComplete} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/election-selection" element={<ElectionSelectionPage onVoteNow={handleVoteNow} />} />
          <Route path="/voting" element={<VotingPage electionId={currentElection} onSubmitVote={handleSubmitVote} />} />
          <Route path="/confirmation" element={
            <VoteConfirmationPage
              transactionHash={transactionHash || "N/A"}
              onReturnToDashboard={handleReturnToDashboard}
            />
          } />
          <Route path="/history" element={<VoterHistoryPage onReturnToDashboard={handleReturnToDashboard} />} />
          <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect to sign-up */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;