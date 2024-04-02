import React, { useState, useEffect } from 'react';
import './archives.css';

export const ArchivesPage = () => {
    const [archives, setArchives] = useState([]);

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/archives');
                const data = await response.json();
                setArchives(data);
            } catch (error) {
                console.error('Error fetching archives:', error);
            }
        };

        fetchArchives();
    }, []);

    return (
        <div>
            <h1>Archives</h1>
            <div className="archives-grid">
                {archives.map((archive) => (
                    <div key={archive.archive_id} className="archive-card">
                        <p>Archive ID: {archive.archive_id}</p>
                        <p>Booking Number: {archive.booking_number}</p>
                        <p>Renting ID: {archive.renting_id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchivesPage;
