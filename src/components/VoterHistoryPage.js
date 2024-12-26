import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VoteHistoryPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchTerm, setSearchTerm] = useState('');
  const [electionType, setElectionType] = useState('');
  const [candidate, setCandidate] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  // Sample vote records (replace with actual data)
  const voteRecords = [
    {
      electionName: "Presidential Election 2024",
      voterId: "Anonymized",
      timestamp: "2024-01-15 14:30",
      candidate: "Alice",
      transactionHash: "0x1234567890abcdef",
      status: "Success",
    },
    {
      electionName: "City Council Election 2024",
      voterId: "Anonymized",
      timestamp: "2024-01-20 10:15",
      candidate: "Bob",
      transactionHash: "0xabcdef1234567890",
      status: "Success",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecords = voteRecords.filter(record => {
    return (
      (record.electionName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      record.candidate.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (electionType ? record.electionName.includes(electionType) : true) &&
      (candidate ? record.candidate.includes(candidate) : true)
    );
  });

  const handleNavigateToElectionSelection = () => {
    navigate("/election-selection"); // Navigate to Election Selection page
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Vote History</h2>
        <p style={styles.description}>Below is the history of all votes recorded on the blockchain.</p>
      </div>

      <div style={styles.filters}>
        <input 
          type="text" 
          placeholder="Search by Transaction Hash or Election Name" 
          value={searchTerm} 
          onChange={handleSearch} 
          style={styles.searchBar}
        />
        <select 
          value={electionType} 
          onChange={(e) => setElectionType(e.target.value)} 
          style={styles.select}
        >
          <option value="">All Election Types</option>
          <option value="Presidential">Presidential</option>
          <option value="Parliamentary">Parliamentary</option>
        </select>
        <select 
          value={candidate} 
          onChange={(e) => setCandidate(e.target.value)} 
          style={styles.select}
        >
          <option value="">All Candidates</option>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Election Name</th>
            <th>Voter ID</th>
            <th>Timestamp</th>
            <th>Candidate/Party</th>
            <th>Transaction Hash</th>
            <th>Status</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.electionName}</td>
              <td>{record.voterId}</td>
              <td>{record.timestamp}</td>
              <td>{record.candidate}</td>
              <td>
                <a href={`https://blockchainexplorer.com/tx/${record.transactionHash}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  {record.transactionHash}
                </a>
              </td>
              <td>{record.status}</td>
              <td style={{ textAlign: 'center' }}> {/* Center the Verify button */}
                <button 
                  onClick={() => window.open(`https://blockchainexplorer.com/tx/${record.transactionHash}`, '_blank')} 
                  style={styles.verifyButton} 
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#0056b3";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 123, 255, 0.8)"; // Glowing effect on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#007bff";
                    e.currentTarget.style.boxShadow = "none"; // Remove glow
                  }}
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to navigate back to Election Selection */}
      <button 
        style={{
          ...styles.navigateButton,
          boxShadow: isHovered ? "0px 0px 30px #28a745" : "0px 0px 20px #28a745",
          backgroundColor: isHovered ? "#218838" : "#28a745"
        }} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        onClick={handleNavigateToElectionSelection}
      >
        Back to Home Page
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212', // Dark background
    color: '#ffffff',
  },
  headerContainer: {
    backgroundColor: '#1e1e1e', // Darker background for header
    padding: '20px',
    borderRadius: '8px',
    boxShadow: "0 0 50px rgba(0, 123, 255, 0.5)",
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    textAlign: 'center', // Center text
  },
  header: {
    color: '#ffffff',
    fontSize: '24px',
    margin: '0',
    textShadow: '0 0 15px  rgba(0, 123, 255, 0.5)', // Glowing effect
  },
  description: {
    color: '#ecf0f1',
    fontSize: '16px',
    textShadow: '0 0 15px  rgba(0, 123, 255, 0.5)',
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  searchBar: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  select: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  verifyButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  navigateButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '9px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
};

export default VoteHistoryPage;