import React from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios"
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CreateNotePage = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title || !content) {
      toast.error("Please fill all the fields")
      return
    }
    setLoading(true)

    try {
      await api.post("/notes", {
        title,
        content
      })
    setLoading(false)
    navigate('/')
    toast.success("Note created successfully!")

    } catch (error) {
      console.log('Error creating a note', error)
      toast.error('Failed to create note. Please try again later!')
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Create a New Note
        </h1>

        <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5">
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-2 transition-colors"
            disabled={loading}
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNotePage;
