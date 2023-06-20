import React from "react";
import styles from "./DivAnnouncementbar.module.css"
function DivAnnouncementbar(props) {
    const { children } = props;

    return (
        <div className={`z-10 ${styles["div-announcementbar"]}`}>
            <div className={styles["divmarquee-announcement-bar"]}>
                <p className={styles["free-shipping-on-all-orders-over-150"]}>{children}</p>
            </div>
        </div>
    );
}

export default DivAnnouncementbar;
//pre redo for home

