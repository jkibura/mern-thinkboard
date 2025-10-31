import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import RateLimitedUI from "../components/RateLimitedUI";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("Error in fetching notes, frontend:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error(error.response?.data?.message || "Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {isRateLimited && <RateLimitedUI />}

        {loading && !isRateLimited && (
          <p className="text-gray-500 text-center mt-10">Loading notes...</p>
        )}

        {/* Notes grid */}
        {!loading && !isRateLimited && notes.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}

        {/* No notes */}
        {!loading && !isRateLimited && notes.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No notes yet. Create your first one!
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
