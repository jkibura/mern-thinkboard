import React from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import Navbar from "../components/navbar.jsx";
import { useNavigate, useParams, } from 'react-router'
import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteDetailPage = () => {

  const {id} = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)


  const navigate = useNavigate("/")

  console.log({id}) 

  useEffect(() => {
    const fetchNote = async () => {
       setLoading(true)
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        console.log(res.data) 
       

      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch the note")

      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  console.log({ note })

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this note?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      console.log("Note deleted successfully", note.title);
    } catch (error) {
      console.log("Error in deleting note", note.title, error);
      toast.error("Sadly baby, something went wrong deleting the note.");
    }
    navigate("/");
  }

  const handleEdit = async() => {
    setSaving(true)

    if(!note.title || !note.content) {
      toast.error("Please fill all the fields") 
      return
    }
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully!")
      console.log("Note updated successfully, budaa!", note.title)
      navigate("/")

    } catch (error) {
      console.log("Error in updating note", note.title, error)
      toast.error("Sadly baby, something went wrong updating the note.")

    } finally {
      setSaving(false)
    }

  }

  if(loading || !note) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
        <Navbar />
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Loading...
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <label
              // htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Title
            </label>
            <input
              // id="title"
              type="text"
              placeholder="Enter note title..."
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={note.title}
              onChange={(e) => setNote({...note, title: e.target.value})}
            />
          </div>

          <div className="flex gap-2">
            <button
            onClick={handleEdit} 
            disabled={saving} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
              <PenSquareIcon size={18} />
              
            </button>
            <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
             onClick={handleDelete}>
              <Trash2Icon size={18} />
            </button>
          </div>
        </div>

        {/* Metadata */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Created on October 29, 2025
        </p>

        {/* Content */}
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          <label
              // htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Content
            </label>
            <textarea
              // id="content"
              rows="8"
              placeholder="Write your note here..."
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={note.content}
              onChange={(e) => setNote({...note, content: e.target.value})}
            ></textarea>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
// perspiciatis unde omnis iste natus error sit voluptatem accusantium
// doloremque laudantium, totam rem aperiam.