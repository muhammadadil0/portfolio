import { FaDiscord, FaGithub, FaMapPin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail, HiBriefcase } from "react-icons/hi";

export const config = {
    developer: {
        name: "Muhammad Adil",
    },
    social: {
        github: "muhammadadil0",
        discord: "#"
    },
    NAV_ITEMS: [
        { href: '/', label: 'Home' },
        { href: '/#about', label: 'About' },
        { href: '/#skills', label: 'Skills' },
        { href: '/projects', label: 'Projects' },
        { href: '/#experience', label: 'Experience' },
        { href: '/#education', label: 'Education' },
        { href: '/contact', label: 'Contact' }
    ],
    recentTracks: true, // Enable/disable Spotify recent tracks
    projects: [
        {
            id: 1,
            title: "Purescope — AI-Powered Food & Product Analysis",
            description: "AI-powered mobile app that scans food products and provides instant health analysis. Features OCR extraction, LLM-based ingredient analysis, personalized recommendations, and allergen detection. Built with Flutter frontend and Django REST backend.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
            technologies: ["Flutter", "Django", "Python", "OCR", "LLM", "REST API"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 2,
            title: "Plant Disease Prediction App",
            description: "Mobile application for diagnosing plant diseases through leaf image analysis. Integrates TensorFlow Lite model for real-time image classification with instant predictions. Features clean UI, camera integration, and disease treatment recommendations.",
            image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
            technologies: ["Flutter", "TensorFlow Lite", "Python", "Machine Learning", "Image Processing"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 3,
            title: "Chat Application",
            description: "Real-time messaging application with end-to-end encryption, group chats, media sharing, and online status indicators. Features include message reactions, typing indicators, and push notifications for seamless communication.",
            image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
            technologies: ["Flutter", "Firebase", "Socket.io", "Node.js", "MongoDB"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 4,
            title: "Auto Job Finder App",
            description: "Intelligent job search platform that automatically matches users with relevant job opportunities based on skills and preferences. Features AI-powered job recommendations, application tracking, and automated resume parsing.",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
            technologies: ["Flutter", "Django", "Python", "Machine Learning", "REST API"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 5,
            title: "Event Finder App",
            description: "Comprehensive event discovery platform with location-based search, category filtering, and booking integration. Features event recommendations, calendar sync, ticket purchasing, and social sharing capabilities.",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
            technologies: ["Flutter", "Django", "Google Maps API", "Firebase", "Payment Gateway"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 6,
            title: "SpyGuard App",
            description: "Advanced security and monitoring application for device protection. Features include app usage tracking, location monitoring, call logs, SMS tracking, and real-time alerts for suspicious activities.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            technologies: ["Flutter", "Firebase", "Android Native", "Encryption", "Background Services"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 7,
            title: "Blood Management System",
            description: "Cross-platform system for managing blood donors and availability. Web admin panel built with Django and mobile app with Flutter. Features donor registration, blood request management, and emergency notifications.",
            image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
            technologies: ["Django", "Flutter", "Python", "MySQL", "REST API"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 8,
            title: "Global Win — Dynamic Business Website",
            description: "Full-featured business website with user and admin content management. Built using Django MVC architecture with responsive design, SEO optimization, and dynamic content delivery.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            technologies: ["Django", "HTML", "CSS", "Bootstrap", "JavaScript", "MySQL"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 9,
            title: "Event Booking System",
            description: "Comprehensive event booking platform with messaging and seat reservation via WhatsApp/Email. Features real-time availability, payment integration, and automated confirmation notifications.",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 10,
            title: "Music Player App",
            description: "Feature-rich music streaming application with playlist management, playback controls, and offline mode. Includes shuffle, repeat, favorites, and seamless audio streaming capabilities.",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            technologies: ["Flutter", "Dart", "Audio Player", "Local Storage"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        }
    ],
    skills: [
        {
            title: "Programming Languages",
            icon: <HiCode />,
            description: "Core programming expertise",
            bgClass: "bg-blue-500/10",
            iconClass: "text-blue-500",
            skills: [
                { name: "Python", level: "Advanced", hot: true },
                { name: "JavaScript", level: "Advanced" },
                { name: "Dart", level: "Advanced", hot: true },
                { name: "C/C++", level: "Advanced" },
                { name: "SQL", level: "Advanced" }
            ]
        },
        {
            title: "Web Development",
            icon: <HiCode />,
            description: "Full-stack web technologies",
            bgClass: "bg-emerald-500/10",
            iconClass: "text-emerald-500",
            skills: [
                { name: "Django", level: "Advanced", hot: true },
                { name: "Flask", level: "Advanced" },
                { name: "HTML/CSS", level: "Expert" },
                { name: "PHP", level: "Intermediate" },
                { name: "FastAPI", level: "Advanced", hot: true }
            ]
        },
        {
            title: "Mobile Development",
            icon: <HiCube />,
            description: "Cross-platform mobile apps",
            bgClass: "bg-purple-500/10",
            iconClass: "text-purple-500",
            skills: [
                { name: "Flutter", level: "Expert", hot: true },
                { name: "Android Studio", level: "Advanced" },
                { name: "Firebase", level: "Advanced" }
            ]
        },
        {
            title: "Data Science & ML",
            icon: <HiDatabase />,
            description: "Machine Learning & Analytics",
            bgClass: "bg-orange-500/10",
            iconClass: "text-orange-500",
            skills: [
                { name: "TensorFlow", level: "Advanced", hot: true },
                { name: "Scikit-learn", level: "Advanced" },
                { name: "Pandas", level: "Advanced" },
                { name: "NumPy", level: "Advanced" },
                { name: "Matplotlib", level: "Intermediate" }
            ]
        },
        {
            title: "Databases",
            icon: <HiDatabase />,
            description: "Data storage solutions",
            bgClass: "bg-cyan-500/10",
            iconClass: "text-cyan-500",
            skills: [
                { name: "MySQL", level: "Advanced", hot: true },
                { name: "MongoDB", level: "Advanced" },
                { name: "Firebase", level: "Advanced" }
            ]
        },
        {
            title: "Tools & Others",
            icon: <HiCube />,
            description: "Development tools",
            bgClass: "bg-pink-500/10",
            iconClass: "text-pink-500",
            skills: [
                { name: "Git", level: "Advanced", hot: true },
                { name: "Figma", level: "Intermediate" },
                { name: "MS Office", level: "Advanced" },
                { name: "Android Studio", level: "Advanced" }
            ]
        }
    ],
    experiences: [
        {
            position: "Teacher Assistant",
            company: "FAST NUCES Peshawar",
            period: "Jan 2024 - May 2024",
            location: "Peshawar, Pakistan",
            description: "Assisted in lab sessions, grading, and resolving student queries for core Computer Science courses. Mentored students in programming fundamentals and software development practices.",
            responsibilities: [
                "Conducted lab sessions for core CS courses including Data Structures and Algorithms",
                "Graded assignments and provided detailed feedback to students",
                "Resolved student queries and provided one-on-one mentoring",
                "Assisted professors in course material preparation and exam supervision"
            ],
            technologies: ["C++", "Python", "Data Structures", "Algorithms", "Teaching"]
        },
        {
            position: "Web Development Intern",
            company: "Headstarter",
            period: "Jul 2023 - Sep 2023",
            location: "Remote",
            description: "Worked on UI enhancements and API integrations for web projects. Collaborated with development team to implement new features and improve user experience.",
            responsibilities: [
                "Developed and enhanced UI components for web applications",
                "Integrated RESTful APIs and third-party services",
                "Implemented responsive designs and cross-browser compatibility",
                "Participated in code reviews and agile development processes"
            ],
            technologies: ["HTML", "CSS", "JavaScript", "REST API", "Git"]
        },
        {
            position: "Freelance Web Developer",
            company: "UK-based Client",
            period: "Dec 2023 - Feb 2024",
            location: "Remote",
            description: "Developed and deployed a custom Django-based website for a business client. Managed full project lifecycle from requirements gathering to deployment and maintenance.",
            responsibilities: [
                "Built custom Django web application from scratch",
                "Implemented user authentication and authorization systems",
                "Designed and developed responsive frontend with Bootstrap",
                "Deployed application on cloud hosting and provided ongoing support"
            ],
            technologies: ["Django", "Python", "HTML", "CSS", "Bootstrap", "MySQL"]
        }
    ],
    contactInfo: [
        {
            icon: <FaGithub className="w-5 h-5" />,
            label: "GitHub",
            value: "@muhammadadil0",
            link: `https://github.com/muhammadadil0`
        },
        {
            icon: <HiMail className="w-5 h-5" />,
            label: "Email",
            value: "adilraxiq64@gmail.com",
            link: "mailto:adilraxiq64@gmail.com"
        },
        {
            icon: <FaMapPin className="w-5 h-5" />,
            label: "Location",
            value: "Peshawar, Pakistan",
            link: null
        },
        {
            icon: <FaDiscord className="w-5 h-5" />,
            label: "LinkedIn",
            value: "muhammad-adil-42677b307",
            link: "https://www.linkedin.com/in/muhammad-adil-42677b307"
        }
    ],
    education: [
        {
            degree: "Bachelor of Software Engineering",
            institution: "FAST NUCES University",
            period: "Aug 2022 - Jun 2026",
            location: "Peshawar, Pakistan",
            description: "Pursuing Bachelor's degree in Software Engineering with focus on full-stack development, mobile applications, and machine learning."
        },
        {
            degree: "FSc Pre-Engineering",
            institution: "University College For Boys (UCB)",
            period: "2020 - 2022",
            location: "Peshawar, Pakistan",
            description: "Completed intermediate education with focus on Mathematics, Physics, and Computer Science."
        },
        {
            degree: "Matriculation (FA)",
            institution: "Al Muslim Public School (APS)",
            period: "2019 - 2020",
            location: "Shergarh, Mardan, Pakistan",
            description: "Completed secondary education with strong foundation in science and mathematics."
        }
    ],
    certificates: [
        "TA-ship Certificate – FAST NUCES",
        "IEEE Xtreme 17.0 Programming Competition",
        "FPSC Programming Competition",
        "NUTEC '24 – Code Conqueror",
        "ICPC Programming Certificate"
    ]
}