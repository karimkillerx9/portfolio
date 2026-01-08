
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
const resources = {
    en: {
        translation: {
            nav: {
                home: "Home",
                about: "About",
                skills: "Skills",
                experience: "Experience",
                projects: "Projects",
                contact: "Contact"
            },
            hero: {
                name: "Karim Challouf",
                title1: "Product Designer",
                title2: "& UX/UI Creative",
                desc1: "Product Designer with a focus on user-centered design and UI/UX principles.",
                desc2: "Experienced in bridging the gap between aesthetic branding and functional user experience.",
                ctaWork: "Let's Work Together",
                ctaContact: "Contact"
            },
            about: {
                title: "About",
                titleMe: "Me",
                p1: "I'm Karim Challouf, a Product Designer based in Tunisia. I create modern, functional, and engaging digital experiences that connect with users and elevate brands.",
                p2: "My work blends design thinking, storytelling, and problem-solving. I approach every project with intention, curiosity, and a passion for impactful design.",
                profileSummaryTitle: "Profile Summary",
                profileSummaryDesc: "Product Designer with a focus on user-centered design and UI/UX principles. Experienced in bridging the gap between aesthetic branding and functional user experience. Skilled in rapid prototyping, user research, and cross-functional team leadership.",
                educationTitle: "Education",
                essted: "Higher School of Design Sciences and Technologies (ESSTED)",
                esstedDegree: "Licence in Product Design",
                highschool: "Dar Fadhal High School",
                highschoolDegree: "Baccalauréat",
                designApproachTitle: "Design Approach",
                designApproachDesc: "\"Think. Shape. Test. Improve. Deliver. Every project begins by understanding the user and the business. Then I design with clarity, iterate with feedback, and finalize with intention.\""
            },
            skills: {
                title: "Skills &",
                subtitle: "Expertise",
                categories: [
                    {
                        title: "UX/UI & Digital Design",
                        skills: ["User Research & Personas", "Wireframing & Prototyping (Figma)", "Information Architecture"]
                    },
                    {
                        title: "Product & Industrial Design",
                        skills: ["3D Modeling & Ergonomics", "Eco-design & Materials", "Service Design & Retail"]
                    },
                    {
                        title: "Software & Creation",
                        skills: ["Figma", "Adobe XD", "Illustrator", "Video Art Direction", "Design System & Branding"],
                        logos: [
                            { name: "Adobe Illustrator", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
                            { name: "Adobe Photoshop", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
                            { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                            { name: "Canva", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" }
                        ]
                    },
                    {
                        title: "Leadership & Strategy",
                        skills: ["Project Management (Agile)", "Creative Team Management", "Effective Communication"]
                    },
                    {
                        title: "Languages",
                        skills: ["English (C1)", "French (B2)", "Arabic (Native)"]
                    }
                ]
            },
            experience: {
                title: "Experience",
                items: [
                    {
                        year: "2025",
                        role: "Product Designer (Internship)",
                        company: "USERCAMP",
                        achievements: [
                            "Toolkit Design: Creation of 'Shapes Before Words', a creative thinking tool, from ideation to final prototype.",
                            "Research & UX: Conducted user research, testing, and iterations to improve usability and impact.",
                            "Video Production: Designed a presentation video highlighting usage and value proposition.",
                            "Systems Design: Contributed to 'Ville de l'Idée', a systemic thinking toolkit for collaborative analysis."
                        ]
                    },
                    {
                        year: "2024",
                        role: "Product & Brand Designer",
                        company: "SIGAHEAD",
                        achievements: [
                            "User Research: Analyzed customer behaviors to modernize the brand image of a retail chain.",
                            "Space Design & UX: Redesigned visual identity and store aesthetics to optimize customer journey and engagement."
                        ]
                    },
                    {
                        year: "2022–2023",
                        role: "Team Lead Design / Art Direction",
                        company: "ARTISHOW PROD",
                        achievements: [
                            "Art Direction: Supervised visual direction of video projects, ensuring aesthetic consistency.",
                            "Production Management: Optimized workflows to improve efficiency and on-time delivery.",
                            "Process Design: Implemented sustainable production practices, reducing resource waste by 30%.",
                            "Team Leadership: Managed and trained a creative team to boost productivity and quality."
                        ]
                    }
                ]
            },
            projects: {
                title: "Featured",
                subtitle: "Projects",
                desc: "Research, methodologies, and design thinking frameworks",
                myApproach: "My Approach",
                myApproachDesc: "\"I design with purpose. Whether researching user needs, developing innovative methodologies, or creating accessible experiences, I focus on understanding real problems and crafting thoughtful solutions.\"",
                viewPdf: "View Full PDF",
                items: [
                    {
                        number: "01",
                        title: "Ville de l'Idée",
                        category: "Innovation Toolkit",
                        description: "A collaborative experimentation methodology and systemic thinking toolkit for solving complex challenges.",
                        longDescription: "Ville de l'Idée is a comprehensive toolkit designed to help teams transform abstract ideas into concrete projects. It integrates collaborative experimentation with systemic thinking.",
                        pdfPath: "/ville de l'idée.pdf",
                        year: 2024,
                        color: "#A855F7"
                    },
                    {
                        number: "02",
                        title: "Shape Before Words",
                        category: "Creative Methodology",
                        description: "An innovative toolkit that inviting thinking with shapes before using words.",
                        longDescription: "Shape Before Words liberates creative thinking by bypassing verbal constraints. This toolkit enables participants to express ideas intuitively through tangible forms.",
                        pdfPath: "/presentation de test .pdf",
                        year: 2024,
                        color: "#FF4C9E"
                    },
                    {
                        number: "03",
                        title: "Dyslexia Accessibility",
                        category: "User Research & Insights",
                        description: "In-depth interview study with 10 dyslexic individuals exploring their challenges with public transportation.",
                        longDescription: "This research project directly engaged 10 individuals with dyslexia to understand their real-world challenges with public transportation systems, uncovering critical accessibility gaps.",
                        pdfPath: "/nous avons interrogé 10 personnes souffrant de dyslexie.pdf",
                        year: 2024,
                        color: "#4CFFDF"
                    },
                    {
                        number: "04",
                        title: "Camping Experience",
                        category: "User Personas & Journey",
                        description: "Comprehensive user research with detailed personas and stress-level mapping.",
                        longDescription: "This project developed comprehensive personas representing different camping skill levels. Through detailed journey mapping, we identified critical touchpoints and pain points.",
                        pdfPath: "/Anna.pdf",
                        year: 2024,
                        color: "#00D9FF"
                    }
                ]
            },
            contact: {
                title: "Let's Work",
                subtitle: "Together",
                desc: "Interested in any of my projects or have a new idea? Get in touch and let's collaborate.",
                infoTitle: "Contact Information",
                form: {
                    name: "Name",
                    namePlaceholder: "Your name",
                    email: "Email",
                    emailPlaceholder: "your@email.com",
                    project: "Interested Project (Optional)",
                    projectPlaceholder: "Select a project...",
                    message: "Message",
                    messagePlaceholder: "Tell me about your project or idea...",
                    send: "Send Message",
                    sending: "Sending...",
                    success: "Thank You!",
                    successDesc: "Your message has been received. I'll get back to you soon."
                },
                footer: "© 2025 Karim Challouf. Designed with passion and cosmic energy."
            }
        }
    },
    fr: {
        translation: {
            nav: {
                home: "Accueil",
                about: "À propos",
                skills: "Compétences",
                experience: "Expérience",
                projects: "Projets",
                contact: "Contact"
            },
            hero: {
                name: "Karim Challouf",
                title1: "Product Designer",
                title2: "& UX/UI Créatif",
                desc1: "Product Designer axé sur la conception centrée sur l'utilisateur et les principes UI/UX.",
                desc2: "Expérimenté dans le rapprochement entre l'image de marque esthétique et l'expérience utilisateur fonctionnelle.",
                ctaWork: "Travaillons Ensemble",
                ctaContact: "Contactez-moi"
            },
            about: {
                title: "À propos de",
                titleMe: "Moi",
                p1: "Je suis Karim Challouf, un Product Designer multidisciplinaire basé en Tunisie. Je crée des expériences numériques modernes, fonctionnelles et engageantes.",
                p2: "Mon travail allie design thinking, storytelling et résolution de problèmes. J'aborde chaque projet avec intention, curiosité et passion.",
                profileSummaryTitle: "Résumé du Profil",
                profileSummaryDesc: "Product Designer axé sur la conception centrée sur l'utilisateur et les principes UI/UX. Expérimenté dans le rapprochement entre l'image de marque esthétique et l'expérience utilisateur fonctionnelle. Compétent en prototypage rapide, recherche utilisateur et leadership d'équipe interfonctionnelle.",
                educationTitle: "Formation",
                essted: "École Supérieure des Sciences et Technologies du Design (ESSTED)",
                esstedDegree: "Licence en Design de Produit",
                highschool: "Lycée Dar Fadhal",
                highschoolDegree: "Baccalauréat",
                designApproachTitle: "Approche Design",
                designApproachDesc: "\"Penser. Former. Tester. Améliorer. Livrer. Chaque projet commence par comprendre l'utilisateur et l'entreprise. Ensuite, je conçois avec clarté, itère et finalise avec intention.\""
            },
            skills: {
                title: "Compétences &",
                subtitle: "Expertise",
                categories: [
                    {
                        title: "Design UX/UI & Digital",
                        skills: ["Recherche Utilisateur & Personas", "Wireframing & Prototypage (Figma)", "Architecture de l'Information"]
                    },
                    {
                        title: "Design de Produit & Industriel",
                        skills: ["Modélisation 3D & Ergonomie", "Éco-conception & Matériaux", "Design de services & Retail"]
                    },
                    {
                        title: "Logiciels & Création",
                        skills: ["Figma", "Adobe XD", "Illustrator", "Direction Artistique Vidéo", "Design System & Branding"],
                        logos: [
                            { name: "Adobe Illustrator", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
                            { name: "Adobe Photoshop", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
                            { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                            { name: "Canva", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" }
                        ]
                    },
                    {
                        title: "Leadership & Stratégie",
                        skills: ["Gestion de projet (Agile)", "Management d'équipe créative", "Communication efficace"]
                    },
                    {
                        title: "Langues",
                        skills: ["Anglais (C1)", "Français (B2)", "Arabe (Maternel)"]
                    }
                ]
            },
            experience: {
                title: "Expériences Professionnelles",
                items: [
                    {
                        year: "2025",
                        role: "Product Designer (Stage)",
                        company: "USERCAMP",
                        achievements: [
                            "Conception de Toolkit : Création de 'Shapes Before Words', un outil de pensée créative, de l'idéation au prototype final.",
                            "Recherche & UX : Réalisation de recherches utilisateurs, tests et itérations pour améliorer l'utilisabilité et l'impact.",
                            "Production Vidéo : Conception d'une vidéo de présentation mettant en valeur l'usage et la proposition de valeur.",
                            "Design de Systèmes : Contribution à 'Ville de l'Idée', un toolkit de pensée systémique pour l'analyse collaborative."
                        ]
                    },
                    {
                        year: "2024",
                        role: "Product & Brand Designer",
                        company: "SIGAHEAD",
                        achievements: [
                            "Recherche Utilisateur : Analyse des comportements clients pour moderniser l'image de marque d'une chaîne de points de vente.",
                            "Design d'Espace & UX : Refonte de l'identité visuelle et de l'esthétique des magasins pour optimiser le parcours client."
                        ]
                    },
                    {
                        year: "2022–2023",
                        role: "Chef d'équipe Design / Direction Artistique",
                        company: "ARTISHOW PROD",
                        achievements: [
                            "Direction Artistique : Supervision de la direction visuelle de projets vidéo, garantissant une cohérence esthétique.",
                            "Gestion de Production : Optimisation des flux de travail (workflows) pour améliorer l'efficacité de la production.",
                            "Design de Processus : Mise en œuvre de pratiques de production durables, réduisant les déchets de ressources de 30 %.",
                            "Leadership d'Équipe : Gestion et formation d'une équipe créative pour renforcer la productivité et la qualité visuelle."
                        ]
                    }
                ]
            },
            projects: {
                title: "Projets",
                subtitle: "Sélectionnés",
                desc: "Recherche, méthodologies et cadres de design thinking",
                myApproach: "Mon Approche",
                myApproachDesc: "\"Je conçois avec un but. Que ce soit pour rechercher les besoins des utilisateurs, développer des méthodologies innovantes ou créer des expériences accessibles, je me concentre sur la compréhension des vrais problèmes et la création de solutions réfléchies.\"",
                viewPdf: "Voir le PDF",
                items: [
                    {
                        number: "01",
                        title: "Ville de l'Idée",
                        category: "Toolkit d'Innovation",
                        description: "Une méthodologie d'expérimentation collaborative et un toolkit de pensée systémique pour résoudre des défis complexes.",
                        longDescription: "Ville de l'Idée est un toolkit complet conçu pour aider les équipes à transformer des idées abstraites en projets concrets. Il intègre l'expérimentation collaborative avec la pensée systémique.",
                        pdfPath: "/ville de l'idée.pdf",
                        year: 2024,
                        color: "#A855F7"
                    },
                    {
                        number: "02",
                        title: "Shape Before Words",
                        category: "Méthodologie Créative",
                        description: "Un toolkit innovant invitant à penser avec des formes avant d'utiliser des mots.",
                        longDescription: "Shape Before Words libère la pensée créative en contournant les contraintes verbales. Ce toolkit permet aux participants d'exprimer des idées intuitivement à travers des formes tangibles.",
                        pdfPath: "/presentation de test .pdf",
                        year: 2024,
                        color: "#FF4C9E"
                    },
                    {
                        number: "03",
                        title: "Accessibilité Dyslexie",
                        category: "Recherche Utilisateur & Insights",
                        description: "Étude d'entretien approfondi avec 10 personnes dyslexiques explorant leurs défis avec les transports publics.",
                        longDescription: "Ce projet de recherche a directement engagé 10 personnes dyslexiques pour comprendre leurs défis réels avec les systèmes de transport public, révélant des lacunes critiques en matière d'accessibilité.",
                        pdfPath: "/nous avons interrogé 10 personnes souffrant de dyslexie.pdf",
                        year: 2024,
                        color: "#4CFFDF"
                    },
                    {
                        number: "04",
                        title: "Expérience Camping",
                        category: "Personas Utilisateurs & Parcours",
                        description: "Recherche utilisateur complète avec personas détaillés et cartographie des niveaux de stress.",
                        longDescription: "Ce projet a développé des personas complets représentant différents niveaux de compétences en camping. Grâce à une cartographie détaillée du parcours, nous avons identifié les points de contact critiques et les points de douleur.",
                        pdfPath: "/Anna.pdf",
                        year: 2024,
                        color: "#00D9FF"
                    }
                ]
            },
            contact: {
                title: "Travaillons",
                subtitle: "Ensemble",
                desc: "Intéressé par l'un de mes projets ou vous avez une nouvelle idée ? Contactez-moi et collaborons.",
                infoTitle: "Informations de Contact",
                form: {
                    name: "Nom",
                    namePlaceholder: "Votre nom",
                    email: "Email",
                    emailPlaceholder: "votre@email.com",
                    project: "Projet Intéressé (Optionnel)",
                    projectPlaceholder: "Sélectionnez un projet...",
                    message: "Message",
                    messagePlaceholder: "Parlez-moi de votre projet ou idée...",
                    send: "Envoyer le Message",
                    sending: "Envoi...",
                    success: "Merci !",
                    successDesc: "Votre message a été reçu. Je vous répondrai bientôt."
                },
                footer: "© 2025 Karim Challouf. Conçu avec passion et énergie cosmique."
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
