// components/CollapsibleSection/index.jsx
import React, { useState } from 'react';

export default function CollapsibleSection({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full max-w-full bg-white border-3/4 border-gray-700 mb-4 px-4">
            <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="font-nhg font-medium text-sm sm:text-sm">{title}</h2>
                <span>
                    {isOpen ? '-' : '+'}
                </span>
            </div>
            {isOpen && (
                <div className="px-2 py-4 text-black text-xxs sm:text-sm font-medium font-nhg">
                    {content}
                </div>
            )}
        </div>
    );
}
