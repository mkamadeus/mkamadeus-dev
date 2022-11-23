---
projects:
  - icon: "i-carbon-search"
    title: "Geprek NIM Finder"
    description: "Student ID finder for ITB students. Static site with no backend."
    stacks: ["react", "vite", "tailwind", "cloudflare-pages"]
    url: "https://geprek.mkamadeus.dev"
  - icon: "i-carbon-idea"
    title: "Arkalogica Monopoly"
    description: "Simple monopoly-like game based on websockets."
    stacks: ["react", "typescript", "expressjs", "socketio"]
    url:
      [
        "https://github.com/arkavidia-hmif/arkavidia-monopoly-frontend",
        "https://github.com/arkavidia-hmif/arkavidia-monopoly-backend",
      ]
  - icon: "i-carbon-network-overlay"
    title: "mTLS Demo"
    description: "Simple demo on Mutual TLS in multiple scenarios."
    stacks: ["go", "openssl"]
    url: "https://github.com/mkamadeus/mtls-demo"
  - icon: "i-carbon-application-web"
    title: "SIY Academic System"
    description: "Fullstack system for managing and calculating score for use in FTMD ITB"
    stacks:
      [
        "typescript",
        "fastify",
        "prisma",
        "postgresql",
        "react",
        "nextjs",
        "docker",
      ]
    url: "https://github.com/mkamadeus/mtls-demo"
    isPrivate: false
  - icon: "i-carbon-qr-code"
    title: "Simple RSVP System"
    description: "Makeshift QR code based RSVP system mainly relying on Google Suite"
    stacks: ["google-sheets", "app-script", "vue"]
    isPrivate: true
  - icon: "i-carbon-bot"
    title: "Automatic Presence Worker"
    description: "University presence automated for the pandemic."
    stacks: ["docker", "python", "selenium", "http-request"]
    isPrivate: true
---

<ProjectPage :projects="projects" />
