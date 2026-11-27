"use client";

import React, { useEffect } from "react";
import { EXCIPIO_HTML } from "@/lib/excipio-html";

export default function HomePage() {
  useEffect(() => {
    // 1. Accordion tabs functionality
    const tabWrappers = document.querySelectorAll<HTMLElement>(".tab-wrapper");
    tabWrappers.forEach((wrapper, index) => {
      const tabTitle = wrapper.querySelector<HTMLElement>(".tab-title");
      const contentsContainer = wrapper.querySelector<HTMLElement>(".tab-contents-container");
      const iconWrapper = wrapper.querySelector<HTMLElement>(".tab-icon-wrapper");

      // Default: First tab open, others closed
      if (index === 0) {
        wrapper.classList.add("open");
        contentsContainer?.classList.add("open");
        iconWrapper?.classList.add("open");
      } else {
        wrapper.classList.remove("open");
        contentsContainer?.classList.remove("open");
        iconWrapper?.classList.remove("open");
      }

      if (tabTitle) {
        tabTitle.style.cursor = "pointer";
        tabTitle.onclick = () => {
          const isOpen = wrapper.classList.contains("open");
          const isTabletOrBelow = window.innerWidth <= 768;

          // On mobile, close others
          if (isTabletOrBelow && !isOpen) {
            tabWrappers.forEach((other) => {
              if (other !== wrapper) {
                other.classList.remove("open");
                other.querySelector(".tab-contents-container")?.classList.remove("open");
                other.querySelector(".tab-icon-wrapper")?.classList.remove("open");
              }
            });
          }

          wrapper.classList.toggle("open");
          contentsContainer?.classList.toggle("open");
          iconWrapper?.classList.toggle("open");
        };
      }
    });

    // 2. Floating Navbar Scroll Visibility
    const floatingNav = document.querySelector<HTMLElement>(".nav.floating-dropdown-nav");
    const onScroll = () => {
      if (!floatingNav) return;
      if (window.scrollY > 250) {
        floatingNav.style.transform = "translate3d(0, 0, 0)";
        floatingNav.style.opacity = "1";
        floatingNav.style.pointerEvents = "auto";
      } else {
        floatingNav.style.transform = "translate3d(0, -300%, 0)";
        floatingNav.style.opacity = "0";
        floatingNav.style.pointerEvents = "none";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 3. Navigation Dropdowns
    const dropdownWrappers = document.querySelectorAll<HTMLElement>(".nav-dropdown-wrapper");
    dropdownWrappers.forEach((dw) => {
      const container = dw.querySelector<HTMLElement>(".nav-dropdown-container");
      const icon = dw.querySelector<HTMLElement>(".nav-icon");

      dw.onmouseenter = () => {
        if (container) {
          container.style.display = "flex";
          container.style.opacity = "1";
          container.style.transform = "translate3d(0, 0, 0)";
        }
        if (icon) {
          icon.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
        }
      };

      dw.onmouseleave = () => {
        if (container) {
          container.style.display = "none";
          container.style.opacity = "0";
          container.style.transform = "translate3d(0, -40px, 0)";
        }
        if (icon) {
          icon.style.transform = "translate3d(0, 0, 0) rotate(-180deg)";
        }
      };

      if (icon) {
        icon.style.cursor = "pointer";
        icon.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = container?.style.display === "flex";
          if (container) {
            container.style.display = isOpen ? "none" : "flex";
            container.style.opacity = isOpen ? "0" : "1";
            container.style.transform = isOpen ? "translate3d(0, -40px, 0)" : "translate3d(0, 0, 0)";
          }
          icon.style.transform = isOpen ? "translate3d(0, 0, 0) rotate(-180deg)" : "translate3d(0, 0, 0) rotate(0deg)";
        };
      }
    });

    // 4. Ensure Hero Video Plays Continuously
    const video = document.querySelector<HTMLVideoElement>("video");
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {});
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      id="excipio-page"
      className="overflow-x-hidden w-full max-w-full"
      dangerouslySetInnerHTML={{ __html: EXCIPIO_HTML }}
    />
  );
}