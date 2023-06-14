import React, { useEffect } from "react";
import "../styles/styles.module.css"

function HomeDesktop() {
    useEffect(() => {
        const showOnScroll = new ShowOnScroll();
        showOnScroll.init();

        return () => {
            showOnScroll.destroy();  // call a method on the instance that removes the event listeners
        };
    }, []);


    return (
        <div className="container-center-horizontal">
            <div className={`${styles.homeDesktop} screen`}>
                <img
                    className={styles.screenShot20230228At12041}
                    src="../public/img/screen-shot-2023-02-28-at-12-04-1-1.png"
                    alt="Screen Shot 2023-02-28 at 12.04 1"
                />
                <div className="{styles.wrapperHeader} animate-enter">
                    <div className="{styles.divContainer}">
                        <div className="div-announcementbar">
                            <div className="divmarquee-announcement-bar">
                                <p className="free-shipping-on-all-orders-over-150 valign-text-middle">
                                    FREE SHIPPING&nbsp;&nbsp;ON ALL ORDERS OVER $150
                                </p>
                            </div>
                        </div>
                        <div className="divheader-default">
                            <div className="div_-logo-branding">
                                <div className="surname valign-text-middle neuehaasgroteskdisplaypro-65-medium-black-18px">GRAY ERA</div>
                            </div>
                            <div className="div_-shop-all"></div>
                            <div className="div_-search-bar">
                                <img className="svg_-search-icon" src="../public/img/svg-searchicon@2x.png" alt="svg_SearchIcon" />
                                <div className="search valign-text-middle">SEARCH</div>
                            </div>
                            <div className="div_-cart neuehaasgroteskdisplaypro-65-medium-black-18px">
                                <div className="div_-cart-item valign-text-middle">BAG</div>
                                <div className="div_-cart-item valign-text-middle">00</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div-container-1">
                    <div className="div-footer animate-enter1" show-on-scroll="true">
                        <div className="div-footer-1">
                            <div className="overlap-group overlap neuehaasgroteskdisplaypro-65-medium-white-14px">
                                <div className="rectangle-7 rectangle"></div>
                                <div className="i-nstagram valign-text-middle">INSTAGRAM</div>
                                <div className="tiktok valign-text-middle">TIKTOK</div>
                                <p className="about-contact-ship valign-text-middle">
                                    ABOUT &amp; CONTACT<br />SHIPPING &amp; RETURNS<br />SIZING<br />PRIVACY POLICY<br />TERMS OF SERVICE
                                </p>
                            </div>
                            <div className="rectangle-8 rectangle"></div>
                        </div>
                    </div>
                    <div className="div-hero11">
                        <div className="center-pane">
                            <div className="overlap-group3 overlap">
                                <div className="grayera-container">
                                    <img className="grayera" src="../public/img/grayera-5.png" alt="GRAYERA" />
                                    <img className="grayera-1" src="../public/img/grayera-6.png" alt="GRAYERA" />
                                    <img className="grayera-2" src="../public/img/grayera-7.png" alt="GRAYERA" />
                                    <img className="grayera-3" src="../public/img/grayera-8.png" alt="GRAYERA" />
                                    <img className="grayera-4" src="../public/img/grayera-4.png" alt="GRAYERA" />
                                </div>
                                <div className="shop-all valign-text-middle">SHOP ALL</div>
                                <div className="button-container button-1">
                                    <div className="button animate-enter2"></div>
                                    <div className="button-text valign-text-middle button-1">SHOP ALL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeDesktop;

function ShowOnScroll() {
    this.toShow = [];
    this.nextEventY = undefined;
}

ShowOnScroll.prototype.show = function (element) {
    element.style.display = "";
};

ShowOnScroll.prototype.hide = function (element) {
    element.style.display = "none";
};

ShowOnScroll.prototype.getTop = function (element) {
    if (element.Top !== undefined && element.Top !== 0) {
        return element.Top;
    }

    let top = 0;
    let iterator = element;

    do {
        top += iterator.offsetTop || 0;
        iterator = iterator.offsetParent;
    } while (iterator);

    element.Top = top;
    return top;
};

ShowOnScroll.prototype.onScroll = function () {
    const screenBottom = window.pageYOffset + window.innerHeight;

    if (this.nextEventY === undefined || this.nextEventY > screenBottom) {
        return;
    }

    this.nextEventY = undefined;

    for (let i = 0; i < this.toShow.length; i++) {
        const element = this.toShow[i];
        const top = this.getTop(element);

        if (top < screenBottom) {
            this.show(element);
            this.toShow.shift();
            i--;
        } else {
            this.nextEventY = top;
            break;
        }
    }
};

ShowOnScroll.prototype.resetScrolling = function () {
    const screenBottom = window.pageYOffset + window.innerHeight;

    for (let i = 0; i < this.toShow.length; i++) {
        const element = this.toShow[i];
        this.show(element);
    }

    this.toShow = [];
    this.nextEventY === undefined;

    const itemsToShowOnScroll = Array.prototype.slice.call(document.getElementsByTagName("*"));
    const filteredItems = itemsToShowOnScroll.filter((element) => element.getAttribute("show-on-scroll") !== undefined);

    filteredItems.sort((a, b) => this.getTop(a) - this.getTop(b));

    for (let i = 0; i < filteredItems.length; i++) {
        const element = filteredItems[i];
        const top = this.getTop(element);

        if (top < screenBottom) {
            continue;
        }

        this.toShow.push(element);
        this.hide(element);
        this.nextEventY = this.nextEventY !== undefined ? this.nextEventY : top;
    }
};

ShowOnScroll.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "scroll":
            this.onScroll();
            break;
        case "resize":
            this.resetScrolling();
            break;
    }
};

ShowOnScroll.prototype.init = function () {
    this.resetScrolling();
    window.addEventListener("scroll", this);
    window.addEventListener("resize", this);
};
ShowOnScroll.prototype.destroy = function () {
    window.removeEventListener("scroll", this);
    window.removeEventListener("resize", this);
};
