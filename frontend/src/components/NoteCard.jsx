// import React from 'react'
// import { Link } from 'react-router'
// import { PenSquareIcon, Trash2Icon } from 'lucide-react'

// const NoteCard = ( {note} ) => {
//   return (
//     <Link className='' to={`/note/${note.id}`}>
//         <div>
//           <h2>{note.title}</h2>
//           <p>{note.content}</p>
//           <div>
//             <p>{note.createdAt}</p>
//             <div>
//               <button>
//                 <PenSquareIcon/>
//               </button>
//               <button>
//                 <Trash2Icon/>
//               </button>
//             </div>
//           </div>
//         </div>
//     </Link>
//   )
// }

// export default NoteCard

import React from "react";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { toast } from 'react-hot-toast'
import api from '../lib/axios'

const NoteCard = ({ note, setNotes }) => {

  const handleDelete = async (e, id) => {
    e.preventDefault()
    
    if(!id) {
      console.log("No id provided")
      toast.error("Note not found")
      //return
    }

    if(!window.confirm("Are you sure you want to delete this note?"))
      return

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully!")

    } catch (error) {
      console.log("Error in deleteNote controller", error)
      toast.error("Sadly baby, something went wrong deleting the note.")

    } finally {
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id))
    }

  }

  return (
    <Link
      to={`/notes/${note._id}`}
      className="block group transition-transform duration-200 hover:scale-[1.02]"
    >
      <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between min-h-[180px]">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">
          {note.title}
        </h2>

        {/* Content */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {note.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <p>{note.createdAt}</p>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link to={`/notes/${note._id}`}>
              <button
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                <PenSquareIcon size={16} />
              </button>
            </Link>
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
            >
              <Trash2Icon size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
