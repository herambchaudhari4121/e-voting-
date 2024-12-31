import React, { useState } from 'react';
import Navbar from './Sidebar';

const ProfilePage = () => {
    // Sample user data (this would typically come from your backend)
    const [user, setUser ] = useState({
        name: 'Bhautik Rathod',
        dateOfBirth: '2024-12-01',
        mobileNumber: '9999999999',
        email: 'bhautik@example.com',
        votingId: '123123123',
        aadhaarId: '*****3123',
        registrationDate: '2023-01-15',
        hasVoted: false,
        votingHistory: [
            { election: 'General Elections 2024', date: '2024-12-15' },
            { election: 'State Elections 2023', date: '2023-11-10' }
        ],
        notifications: [
            'Upcoming election on 15th Dec 2024',
            'Deadline for voter registration updates is 1st Dec 2024'
        ],
    });

    // State for profile update form
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser , setUpdatedUser ] = useState({ ...user });

    // Styles in JSON format for dark theme
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center", // Center the form
            alignItems: "center",
            height: "100vh", // Full viewport height
            backgroundColor: "#121212",
            color: "#fff",
        },
        formCard: {
            padding: "20px",
            backgroundColor: "#1e1e1e",
            borderRadius: "12px",
            boxShadow: "0 0 50px rgba(0, 123, 255, 0.5)",
            maxWidth: "600px",
            width: "100%",
        },
        title: {
            textAlign: "center",
            marginBottom: "15px",
        },
        section: {
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#2c2c2c', // Slightly lighter dark background for sections
            borderRadius: '5px',
            boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
        },
        input: {
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            borderRadius: "4px",
            border: "1px solid #444", // Darker border
            backgroundColor: "#333", // Dark input background
            color: "#fff", // White text in input
        },
        button: {
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            margin: "5px",
        },
        updateButton: {
            backgroundColor: "#4CAF50",
            color: "white",
        },
        cancelButton: {
            backgroundColor: "#f44336",
            color: "white",
        },
        editButton: {
            backgroundColor: "#2196F3",
            color: "white",
        },
        logoutButton: {
            backgroundColor: "#ff4d4d",
            color: "white",
        },
        list: {
            listStyleType: 'none',
            padding: '0',
        },
        listItem: {
            padding: '5px 0',
        },
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.formCard}>
                <h2 style={styles.title}>Profile</h2>
                <div style={styles.section}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Voting ID:</strong> {user.votingId}</p>
                    <p><strong>Aadhaar ID:</strong> {user.aadhaarId}</p>
                    <p><strong>Registration Date:</strong> {new Date(user.registrationDate).toLocaleDateString()}</p>
                </div>

                <h3>Voting History</h3>
                <ul style={styles.list}>
                    {user.votingHistory.map((vote, index) => (
                        <li key={index} style={styles.listItem}>Election: {vote.election} - Voted on {new Date(vote.date).toLocaleDateString()}</li>
                    ))}
                </ul>

                <h3>Notifications</h3>
                <ul style={styles.list}>
                    {user.notifications.map((notification, index) => (
                        <li key={index} style={styles.listItem}>{notification}</li>
                    ))}
                </ul>

                <h3>Security Features</h3>
                <p>Two-Factor Authentication: <button style={styles.button}>Enable/Disable</button></p>
            </div>
        </div>
    );
};

export default ProfilePage;