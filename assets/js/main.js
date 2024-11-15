const Courses = [
  {
    id: 1,
    tag: "web design",
    name: "Introduction to Web Design",
    instructor_name: "Alice Johnson",
    price: 49.99,
    image: "./assets/images/course-01.jpg",
  },
  {
    id: 2,
    tag: "development",
    name: "Full-Stack Development Bootcamp",
    instructor_name: "Michael Smith",
    price: 99.99,
    image: "./assets/images/course-02.jpg",
  },
  {
    id: 3,
    tag: "wordpress",
    name: "WordPress for Beginners",
    instructor_name: "Sarah Lee",
    price: 29.99,
    image: "./assets/images/course-03.jpg",
  },
  {
    id: 4,
    tag: "web design",
    name: "Advanced CSS Techniques",
    instructor_name: "Chris Anderson",
    price: 39.99,
    image: "./assets/images/course-04.jpg",
  },
  {
    id: 5,
    tag: "development",
    name: "JavaScript Essentials",
    instructor_name: "Emily Davis",
    price: 59.99,
    image: "./assets/images/course-05.jpg",
  },
  {
    id: 6,
    tag: "wordpress",
    name: "Building WordPress Themes",
    instructor_name: "John Brown",
    price: 69.99,
    image: "./assets/images/course-06.jpg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // slider intlize
  const Slider = new Splide(".splide", {
    perPage: 1,
    gap: "20px",
    pagination: false,
    lazyLoad: true,
    arrows: false,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  }).mount();

  const nextBtn = document.querySelector(".next__slide-btn");
  const prevBtn = document.querySelector(".prev__slide-btn");

  nextBtn.addEventListener("click", () => {
    Slider.go(">");
  });

  prevBtn.addEventListener("click", () => {
    Slider.go("<");
  });

  const nav = document.querySelector(".nav");
  const topBtn = document.querySelector(".go__top");
  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 300) {
      nav.classList.add("nav__scroll");
      topBtn.classList.remove("btn__hide");
    } else {
      nav.classList.remove("nav__scroll");
      topBtn.classList.add("btn__hide");
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  });

  // render courses
  let courses = document.querySelector(".courses__cards");
  Courses.forEach((course) => {
    let courseDiv = document.createElement("div");
    courseDiv.classList.add(`course__card`);
    let courseData = `
              <h3 class="course__price"><sub>$</sub>${course.price}</h3>
              <a href="#" class="course__image" style="background-image: url(${course.image})">
                <p class="course__tag">${course.tag}</p>
              </a>
              <div class="course__details">
                <p class="course__inst">${course.instructor_name}</p>
                <h2 class="course__name">${course.name}</h2>
              </div>
      `;
    courseDiv.innerHTML = courseData;
    courses.appendChild(courseDiv);
  });

  function filterCourses(tag) {
    let Courses = document.querySelectorAll(".course__card");
    Courses.forEach((course) => {
      if (course.querySelector(".course__tag").textContent !== tag) {
        course.classList.add("hide__card");
      } else {
        course.classList.remove("hide__card");
        course.style.display = "grid";
      }
    });
  }

  document.querySelectorAll(".course__card").forEach((course) => {
    course.addEventListener("transitionend", (e) => {
      if (
        e.propertyName === "opacity" &&
        course.classList.contains("hide__card")
      ) {
        course.style.display = "none";
      }
    });
  });

  let filter__btns = document.querySelectorAll(".filter__btn");
  filter__btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filter__btns.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");
      if (e.target.value.toLowerCase() !== "all") {
        filterCourses(e.target.value.toLowerCase());
      } else {
        document.querySelectorAll(".course__card").forEach((course) => {
          course.classList.remove("hide__card");
          course.style.display = "grid";
        });
      }
    });
  });

  // menu btn
  const menuBtn = document.querySelector(".menu__icon");
  const menu = document.querySelector(".nav__menu");
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("hide__menu");
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.classList.remove("hide__menu");
    } else {
      menu.classList.add("hide__menu");
    }
  });
  // handle click outside
  window.addEventListener("click", (e) => {
    if (e.target !== menuBtn && e.target !== menu && window.innerWidth < 768) {
      menu.classList.add("hide__menu");
    }
  });

  const faqsQuestion = document.querySelectorAll(".faq__card");
  faqsQuestion.forEach((question) => {
    question.addEventListener("click", () => {
      faqsQuestion.forEach((question) => {
        question.classList.remove("active_faq");
      });
      question.classList.toggle("active_faq");
    });
  });

  // intersection observer api test
  const Links = document.querySelectorAll(".nav__link");
  const sections = [
    document.querySelector(".landing"),
    document.getElementById("services"),
    document.getElementById("courses"),
    document.getElementById("register"),
    document.getElementById("team"),
    document.getElementById("faqs"),
    document.getElementById("events"),
  ];

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  };

  function createObserver(element) {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          let sectionLink = null;
          Links.forEach((link) => {
            if (link.href.split("#")[1] === entry.target.id) {
              sectionLink = link;
            }
          });
          if (entry.isIntersecting) {
            sectionLink?.classList.add("active__link");
          } else {
            sectionLink?.classList.remove("active__link");
          }
        });
      },
      {
        ...options,
        threshold: element.id === "events" ? 0.3 : options.threshold,
      }
    );
    observer.observe(element);
  }

  sections.forEach((section) => {
    createObserver(section);
  });

  // remove loading
  const loading = document.querySelector(".loading");
  loading.classList.add("hide__loader");
});
