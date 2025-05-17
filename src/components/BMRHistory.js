import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 1.5rem;
`;

const HistoryTitle = styled.h2`
  font-size: 1.2rem;
  color: #1a73e8;
  margin-bottom: 1rem;
`;

const Entry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
`;

const DateText = styled.span`
  color: #888;
  font-size: 0.95rem;
`;

const DeleteButton = styled.button`
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  font-size: 0.95rem;
  &:hover {
    background: #b71c1c;
  }
`;

function BMRHistory({ userId, refresh }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`bmrcalculatorfinal-production.up.railway.app/api/bmr?userId=${userId}`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setHistory([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) fetchHistory();
    // eslint-disable-next-line
  }, [userId, refresh]);

  const handleDelete = async (id) => {
    await fetch(`bmrcalculatorfinal-production.up.railway.app/api/bmr/${id}`, { method: 'DELETE' });
    fetchHistory();
  };

  if (!userId) return null;

  return (
    <HistoryContainer>
      <HistoryTitle>History</HistoryTitle>
      {loading ? (
        <div>Loading...</div>
      ) : history.length === 0 ? (
        <div>No history yet.</div>
      ) : (
        history.map(entry => (
          <Entry key={entry._id}>
            <span>
              <b>Date:</b> <DateText>{new Date(entry.createdAt).toLocaleString()}</DateText> |
              <b> Username:</b> {entry.username} |
              <b> Weight:</b> {entry.weight} |
              <b> Age:</b> {entry.age} |
              <b> Height:</b> {entry.height} |
              <b> Days:</b> {entry.days} |
              <b> Gender:</b> {entry.gender} |
              <b> BMR:</b> {entry.bmr} |
              <b> Daily Calories:</b> {entry.dailyCalories}
            </span>
            <DeleteButton onClick={() => handleDelete(entry._id)}>Delete</DeleteButton>
          </Entry>
        ))
      )}
    </HistoryContainer>
  );
}

export default BMRHistory; 