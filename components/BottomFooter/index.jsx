import React from "react";
import styles from "../DivAnnouncementbar/DivAnnouncementbar.module.css"

function BottomFooter() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-grayBkg text-white text-sm
                            h-9">
            <div className="p-2">
                <span className="font-ngh tracking-wide pl-0">
                  © GRAY ERA 2023
                </span>
            </div>
        </footer>

    );
}

export default BottomFooter;

