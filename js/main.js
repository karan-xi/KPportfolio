/* ==========================================================================
   Karan Patel portfolio: main.js
   Small progressive enhancements. Every page still works with JS turned off.
   1 Footer year · 2 Mobile navigation · 3 Project filter
   4 Case study contents · 5 Copy email
   ========================================================================== */
(function () {
  "use strict";

  /* 1. Footer year ------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* 2. Mobile navigation ------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var label = toggle.querySelector(".nav-toggle-label");
    var desktop = window.matchMedia("(min-width: 860px)");

    var setNav = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
      document.body.classList.toggle("nav-open", open);
      if (label) {
        label.textContent = open ? "Close" : "Menu";
      }
    };

    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link (needed for the in-page #contact link).
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setNav(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        setNav(false);
        toggle.focus();
      }
    });

    // If the window grows to desktop width while the menu is open, reset it.
    var onBreakpoint = function (event) {
      if (event.matches) {
        setNav(false);
      }
    };
    if (desktop.addEventListener) {
      desktop.addEventListener("change", onBreakpoint);
    } else if (desktop.addListener) {
      desktop.addListener(onBreakpoint);
    }
  }

  /* 3. Project filter ---------------------------------------------------- */
  var filters = document.querySelector("[data-filters]");

  if (filters) {
    var projects = document.querySelectorAll("[data-categories]");
    var statusEl = document.getElementById("filter-status");
    filters.hidden = false;
    filters.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-filter]");
      if (!button) {
        return;
      }
      var chosen = button.getAttribute("data-filter");
      var shown = 0;

      filters.querySelectorAll("button[data-filter]").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === button));
      });

      projects.forEach(function (project) {
        var categories = project.getAttribute("data-categories").split(" ");
        var match = chosen === "all" || categories.indexOf(chosen) !== -1;
        project.hidden = !match;
        if (match) {
          shown += 1;
        }
      });

      if (statusEl) {
        statusEl.textContent =
          "Showing " + shown + " of " + projects.length + " projects";
      }
    });
  }

  /* 4. Case study contents ---------------------------------------------- */
  var toc = document.querySelector("[data-toc]");

  if (toc) {
    var links = Array.prototype.slice.call(
      toc.querySelectorAll('a[href^="#"]'),
    );
    var wide = window.matchMedia("(min-width: 1000px)");

    // Always open on wide screens, collapsed by default on phones.
    var syncToc = function () {
      toc.open = wide.matches;
    };
    syncToc();
    if (wide.addEventListener) {
      wide.addEventListener("change", syncToc);
    } else if (wide.addListener) {
      wide.addListener(syncToc);
    }

    // Keep it open on wide screens even if a keyboard user toggles the summary.
    toc.addEventListener("toggle", function () {
      if (wide.matches && !toc.open) {
        toc.open = true;
      }
    });

    // On phones, collapse the list after a link is chosen.
    toc.addEventListener("click", function (event) {
      if (!wide.matches && event.target.closest("a")) {
        toc.open = false;
      }
    });

    // Highlight the section currently being read.
    if ("IntersectionObserver" in window) {
      var setCurrent = function (id) {
        links.forEach(function (link) {
          if (link.getAttribute("href") === "#" + id) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      };

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setCurrent(entry.target.id);
            }
          });
        },
        { rootMargin: "-15% 0px -75% 0px" },
      );

      links.forEach(function (link) {
        var target = document.getElementById(
          link.getAttribute("href").slice(1),
        );
        if (target) {
          observer.observe(target);
        }
      });
    }
  }

  /* 5. Copy email -------------------------------------------------------- */
  var copyButtons = document.querySelectorAll("[data-copy]");
  var copyStatus = document.querySelector("[data-copy-status]");

  copyButtons.forEach(function (button) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return; // stays hidden
    }
    button.hidden = false;

    button.addEventListener("click", function () {
      navigator.clipboard.writeText(button.getAttribute("data-copy")).then(
        function () {
          if (copyStatus) {
            copyStatus.textContent = "Email address copied.";
          }
        },
        function () {
          if (copyStatus) {
            copyStatus.textContent =
              "Could not copy the address. Use the Email me button instead.";
          }
        },
      );
    });
  });
})();
