// import { PlusIcon } from "@heroicons/react/24/outline";
import { X, Plus } from "lucide-react";
interface ButtonProps {
    label: string; // Button text
    onClick: () => void; // Click handler function
    
  }

export default function Button({label, onClick}:ButtonProps) {
    return (
        <>
            <button
                type="button"
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                onClick={onClick}
            >
                <Plus className="w-5 h-5" /> {label}
            </button>
        </>
    )
};