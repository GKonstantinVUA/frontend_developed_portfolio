(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    var cursor = document.querySelector(".cursor-big");
    var cursorinner = document.querySelector(".cursor-small");
    var a = document.querySelectorAll("a");
    document.addEventListener("mousemove", (function(e) {
        e.clientX;
        e.clientY;
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    }));
    document.addEventListener("mousemove", (function(e) {
        var x = e.clientX;
        var y = e.clientY;
        cursorinner.style.left = x + "px";
        cursorinner.style.top = y + "px";
    }));
    document.addEventListener("mousedown", (function() {
        cursor.classList.add("click");
        cursorinner.classList.add("cursorinnerhover");
    }));
    document.addEventListener("mouseup", (function() {
        cursor.classList.remove("click");
        cursorinner.classList.remove("cursorinnerhover");
    }));
    a.forEach((item => {
        item.addEventListener("mouseover", (() => {
            cursor.classList.add("hover");
        }));
        item.addEventListener("mouseleave", (() => {
            cursor.classList.remove("hover");
        }));
    }));
    const btnUp = {
        el: document.querySelector(".scroll-up"),
        show() {
            this.el.classList.remove("scroll-up--hide");
        },
        hide() {
            this.el.classList.add("scroll-up--hide");
        },
        addEventListener() {
            window.addEventListener("scroll", (() => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                scrollY < 400 ? this.show() : this.hide();
            }));
            document.querySelector(".scroll-up").onclick = () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                });
            };
        }
    };
    btnUp.addEventListener();
    document.querySelectorAll("section");
    let navLinks = document.querySelectorAll(".menu-block__link");
    window.onscroll = () => {
        let header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 100);
    };
    navLinks.forEach((link => {
        link.addEventListener("click", (function(event) {
            event.preventDefault();
            let targetId = this.getAttribute("href");
            let targetSection = document.querySelector(targetId);
            let headerHeight = document.querySelector(".header").offsetHeight;
            let offset = targetSection.offsetTop - headerHeight;
            window.scrollTo({
                top: offset
            });
            let animateItems = targetSection.querySelectorAll(".animate-item");
            animateItems.forEach((item => {
                item.style.animation = "none";
                void item.offsetWidth;
                item.style.animation = null;
            }));
        }));
    }));
    window["FLS"] = true;
    menuInit();
})();