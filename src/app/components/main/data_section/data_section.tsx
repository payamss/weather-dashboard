// components/DataSection.tsx
import React, { useState, useEffect } from 'react';

const DataSection: React.FC = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/data')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <h2>Data Section</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </section>
    );
};

export default DataSection;
