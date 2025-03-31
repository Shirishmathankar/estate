import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState(""); // State for message

    useEffect(() => {
        const fetchLandlord = async () => {
            if (!listing?.userRef) return; // Prevent unnecessary API calls

            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                if (!res.ok) throw new Error("Failed to fetch landlord data");

                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.error("Error fetching landlord:", error);
            }
        };

        fetchLandlord();
    }, [listing?.userRef]); // Ensure `listing.userRef` is valid before calling API

    // Handle message input change
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p>
                        Contact <span className="font-semibold">{landlord.username}</span> for{' '}
                        <span className="font-semibold">{listing.name}</span>
                    </p>
                    <textarea
                        name="message"
                        id="message"
                        rows="2"
                        value={message}
                        onChange={onChange}
                        placeholder="Enter your message here"
                        className="w-full border p-3 rounded-lg"
                    ></textarea>
                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${encodeURIComponent(message)}`}
                        className="bg-slate-700 text-center text-white p-3 uppercase rounded-lg hover:opacity-95"
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    );
}

export default Contact
