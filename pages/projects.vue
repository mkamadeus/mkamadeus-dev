<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })

const projects = [
  {
    icon: 'i-carbon-search',
    title: 'Geprek NIM Finder',
    description: 'Student ID finder for ITB students. Static site with no backend.',
    stacks: [
      'react',
      'vite',
      'tailwind',
      'cloudflare-pages'
    ],
    url: 'https://geprek.mkamadeus.dev'
  },
  {
    icon: 'i-carbon-bot',
    title: 'NIC Scraper',
    description: "(Legally) scrape university students' data to be fed into Geprek",
    stacks: [
      'go',
      'http-request'
    ],
    url: 'https://github.com/mkamadeus/nicscraper'
  },
  {
    icon: 'i-carbon-idea',
    title: 'Arkalogica Monopoly',
    description: 'Simple monopoly-like game based on websockets.',
    stacks: [
      'react',
      'typescript',
      'expressjs',
      'socketio'
    ],
    url: [
      'https://github.com/arkavidia-hmif/arkavidia-monopoly-frontend',
      'https://github.com/arkavidia-hmif/arkavidia-monopoly-backend'
    ]
  },
  {
    icon: 'i-carbon-network-overlay',
    title: 'mTLS Demo',
    description: 'Simple demo on Mutual TLS in multiple scenarios.',
    stacks: [
      'go',
      'openssl'
    ],
    url: 'https://github.com/mkamadeus/mtls-demo'
  },
  {
    icon: 'i-carbon-application-web',
    title: 'SIY Academic System',
    description: 'Fullstack system for managing and calculating score for use in FTMD ITB',
    stacks: [
      'typescript',
      'fastify',
      'prisma',
      'postgresql',
      'react',
      'nextjs',
      'docker'
    ],
    isPrivate: true
  },
  {
    icon: 'i-carbon-qr-code',
    title: 'Simple RSVP System',
    description: 'Makeshift QR code based RSVP system mainly relying on Google Suite',
    stacks: [
      'google-sheets',
      'app-script',
      'vue'
    ],
    isPrivate: true
  },
  {
    icon: 'i-carbon-bot',
    title: 'Automatic Presence Worker',
    description: 'University presence automated for the pandemic.',
    stacks: [
      'docker',
      'python',
      'selenium',
      'http-request'
    ],
    isPrivate: true
  },
  {
    icon: 'i-carbon-cognitive',
    title: 'Myx: ML Experiment to Service',
    description: 'Final project and been made a thesis report for graduation.',
    stacks: [
      'go',
      'python',
      'fastapi',
      'mlops'
    ],
    url: [
      'https://github.com/mkamadeus/myx',
      'https://report.mkamadeus.dev/'
    ]
  }
]
</script>

<template>
  <div flex="~ col" w-full justify-center m="lg:x-8">
    <div m="b-8 lg:b-16">
      <h1 class="header" mb="2 lg:4" font="800" animated="~ fade-in-up ease-in-out delay-500">
        {{ t('projects.title') }}
      </h1>
      <div flex space-x-1 text="#999">
        <span animated="~ fade-in-up ease-in-out delay-1000">
          {{ $t('projects.subtitle') }}
        </span>
        <a class="text-#ddd link" animated="~ fade-in-up ease-in-out delay-1500" href="/contact">{{
          $t('projects.contact_me') }}</a>
      </div>
    </div>
    <div flex="~ col" space="y-8 lg:y-10" container="~" m="x-auto">
      <template v-for="(p, i) in projects" :key="`project-${i}`">
        <ProjectCard
          animated="~ fade-in-up ease-in-out"
          :style="`animation-delay: ${1500 + 100 * i}ms`"
          :icon="p.icon"
          :description="p.description"
          :title="p.title"
          :stacks="p.stacks"
          :url="p.url"
        />
      </template>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "projects": [
      {
        "icon": "i-carbon-search",
        "title": "Geprek NIM Finder",
        "description": "Student ID finder for ITB students. Static site with no backend.",
        "stacks": [
          "react",
          "vite",
          "tailwind",
          "cloudflare-pages"
        ],
        "url": "https://geprek.mkamadeus.dev"
      },
      {
        "icon": "i-carbon-bot",
        "title": "NIC Scraper",
        "description": "(Legally) scrape university students' data to be fed into Geprek",
        "stacks": [
          "go",
          "http-request"
        ],
        "url": "https://github.com/mkamadeus/nicscraper"
      },
      {
        "icon": "i-carbon-idea",
        "title": "Arkalogica Monopoly",
        "description": "Simple monopoly-like game based on websockets.",
        "stacks": [
          "react",
          "typescript",
          "expressjs",
          "socketio"
        ],
        "url": [
          "https://github.com/arkavidia-hmif/arkavidia-monopoly-frontend",
          "https://github.com/arkavidia-hmif/arkavidia-monopoly-backend"
        ]
      },
      {
        "icon": "i-carbon-network-overlay",
        "title": "mTLS Demo",
        "description": "Simple demo on Mutual TLS in multiple scenarios.",
        "stacks": [
          "go",
          "openssl"
        ],
        "url": "https://github.com/mkamadeus/mtls-demo"
      },
      {
        "icon": "i-carbon-application-web",
        "title": "SIY Academic System",
        "description": "Fullstack system for managing and calculating score for use in FTMD ITB",
        "stacks": [
          "typescript",
          "fastify",
          "prisma",
          "postgresql",
          "react",
          "nextjs",
          "docker"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-qr-code",
        "title": "Simple RSVP System",
        "description": "Makeshift QR code based RSVP system mainly relying on Google Suite",
        "stacks": [
          "google-sheets",
          "app-script",
          "vue"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-bot",
        "title": "Automatic Presence Worker",
        "description": "University presence automated for the pandemic.",
        "stacks": [
          "docker",
          "python",
          "selenium",
          "http-request"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-cognitive",
        "title": "Myx: ML Experiment to Service",
        "description": "Final project and been made a thesis report for graduation.",
        "stacks": [
          "go",
          "python",
          "fastapi",
          "mlops"
        ],
        "url": [
          "https://github.com/mkamadeus/myx",
          "https://report.mkamadeus.dev/"
        ]
      }
    ]
  },
  "ja": {
    "projects": [
      {
        "icon": "i-carbon-search",
        "title": "ゲプレック学籍番号ファインダー",
        "description": "ITBの学生の学籍番号ファインダー。バックエンドのない静的サイト。",
        "stacks": [
          "react",
          "vite",
          "tailwind",
          "cloudflare-pages"
        ],
        "url": "https://geprek.mkamadeus.dev"
      },
      {
        "icon": "i-carbon-bot",
        "title": "NICスクレイパー",
        "description": "(合法的に)大学生のデータをスクレイピングして、ゲプレックにフィードする",
        "stacks": [
          "go",
          "http-request"
        ],
        "url": "https://github.com/mkamadeus/nicscraper"
      },
      {
        "icon": "i-carbon-idea",
        "title": "アルカロギカ モノポリー",
        "description": "Websocketsをベースにしたシンプルなモノポリー風ゲーム。",
        "stacks": [
          "react",
          "typescript",
          "expressjs",
          "socketio"
        ],
        "url": [
          "https://github.com/arkavidia-hmif/arkavidia-monopoly-frontend",
          "https://github.com/arkavidia-hmif/arkavidia-monopoly-backend"
        ]
      },
      {
        "icon": "i-carbon-network-overlay",
        "title": "mTLSデモ",
        "description": "相互TLSに関するシンプルなデモ。",
        "stacks": [
          "go",
          "openssl"
        ],
        "url": "https://github.com/mkamadeus/mtls-demo"
      },
      {
        "icon": "i-carbon-application-web",
        "title": "SIY学術システム",
        "description": "FTMD ITBでの使用のためのスコア管理システム",
        "stacks": [
          "typescript",
          "fastify",
          "prisma",
          "postgresql",
          "react",
          "nextjs",
          "docker"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-qr-code",
        "title": "シンプルなRSVPシステム",
        "description": "主にGoogle Suiteに依存した仮想のQRコードベースのRSVPシステム",
        "stacks": [
          "google-sheets",
          "app-script",
          "vue"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-bot",
        "title": "自動出席ワーカー",
        "description": "パンデミック向けの大学出席自動化。",
        "stacks": [
          "docker",
          "python",
          "selenium",
          "http-request"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-cognitive",
        "title": "Myx: ML実験からサービスへ",
        "description": "卒業のための最終プロジェクトであり、論文の報告がされました。",
        "stacks": [
          "go",
          "python",
          "fastapi",
          "mlops"
        ],
        "url": [
          "https://github.com/mkamadeus/myx",
          "https://report.mkamadeus.dev/"
        ]
      }
    ]
  },
  "id": {
    "projects": [
      {
        "icon": "i-carbon-search",
        "title": "Geprek NIM Finder",
        "description": "Pencari nomor induk mahasiswa ITB. Situs statis tanpa backend.",
        "stacks": [
          "react",
          "vite",
          "tailwind",
          "cloudflare-pages"
        ],
        "url": "https://geprek.mkamadeus.dev"
      },
      {
        "icon": "i-carbon-bot",
        "title": "NIC Scraper",
        "description": "(Dengan izin hukum) mengambil data mahasiswa universitas untuk dimasukkan ke dalam Geprek",
        "stacks": [
          "go",
          "http-request"
        ],
        "url": "https://github.com/mkamadeus/nicscraper"
      },
      {
        "icon": "i-carbon-idea",
        "title": "Arkalogica Monopoly",
        "description": "Permainan mirip monopoli sederhana berbasis websockets.",
        "stacks": [
          "react",
          "typescript",
          "expressjs",
          "socketio"
        ],
        "url": [
          "https://github.com/arkavidia-hmif/arkavidia-monopoly-frontend",
          "https://github.com/arkavidia-hmif/arkavidia-monopoly-backend"
        ]
      },
      {
        "icon": "i-carbon-network-overlay",
        "title": "mTLS Demo",
        "description": "Demo sederhana tentang Mutual TLS dalam beberapa skenario.",
        "stacks": [
          "go",
          "openssl"
        ],
        "url": "https://github.com/mkamadeus/mtls-demo"
      },
      {
        "icon": "i-carbon-application-web",
        "title": "SIY Academic System",
        "description": "Sistem lengkap untuk mengelola dan menghitung skor untuk digunakan di FTMD ITB",
        "stacks": [
          "typescript",
          "fastify",
          "prisma",
          "postgresql",
          "react",
          "nextjs",
          "docker"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-qr-code",
        "title": "Simple RSVP System",
        "description": "Sistem RSVP berbasis kode QR sederhana yang mengandalkan Google Suite",
        "stacks": [
          "google-sheets",
          "app-script",
          "vue"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-bot",
        "title": "Automatic Presence Worker",
        "description": "Otomatisasi kehadiran universitas untuk masa pandemi.",
        "stacks": [
          "docker",
          "python",
          "selenium",
          "http-request"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-cognitive",
        "title": "Myx: ML Experiment to Service",
        "description": "Proyek akhir dan laporan tesis untuk kelulusan.",
        "stacks": [
          "go",
          "python",
          "fastapi",
          "mlops"
        ],
        "url": [
          "https://github.com/mkamadeus/myx",
          "https://report.mkamadeus.dev/"
        ]
      }
    ]
  },
  "ko": {
    "projects": [
      {
        "icon": "i-carbon-search",
        "title": "게프렉 학번 검색기",
        "description": "ITB 학생들을 위한 학번 검색기. 백엔드 없는 정적 사이트입니다.",
        "stacks": [
          "react",
          "vite",
          "tailwind",
          "cloudflare-pages"
        ],
        "url": "https://geprek.mkamadeus.dev"
      },
      {
        "icon": "i-carbon-bot",
        "title": "NIC Scraper",
        "description": "(법적으로) 대학교 학생들의 데이터를 수집하여 Geprek에 제공합니다.",
        "stacks": [
          "go",
          "http-request"
        ],
        "url": "https://github.com/mkamadeus/nicscraper"
      },
      {
        "icon": "i-carbon-idea",
        "title": "Arkalogica Monopoly",
        "description": "웹소켓을 기반으로한 간단한 모노폴리 유사 게임입니다.",
        "stacks": [
          "react",
          "typescript",
          "expressjs",
          "socketio"
        ],
        "url": [
          "https://github.com/arkavidia-hmif/arkavidia-monopoly-frontend",
          "https://github.com/arkavidia-hmif/arkavidia-monopoly-backend"
        ]
      },
      {
        "icon": "i-carbon-network-overlay",
        "title": "mTLS Demo",
        "description": "다양한 시나리오에서 상호 TLS에 대한 간단한 데모입니다.",
        "stacks": [
          "go",
          "openssl"
        ],
        "url": "https://github.com/mkamadeus/mtls-demo"
      },
      {
        "icon": "i-carbon-application-web",
        "title": "SIY Academic System",
        "description": "FTMD ITB에서 사용하기 위한 스코어 관리 및 계산을 위한 풀스택 시스템입니다.",
        "stacks": [
          "typescript",
          "fastify",
          "prisma",
          "postgresql",
          "react",
          "nextjs",
          "docker"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-qr-code",
        "title": "Simple RSVP System",
        "description": "Google Suite에 의존하는 간이 QR 코드 기반 RSVP 시스템입니다.",
        "stacks": [
          "google-sheets",
          "app-script",
          "vue"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-bot",
        "title": "Automatic Presence Worker",
        "description": "대학교 출석 자동화 시스템 (팬데믹 대응)",
        "stacks": [
          "docker",
          "python",
          "selenium",
          "http-request"
        ],
        "isPrivate": true
      },
      {
        "icon": "i-carbon-cognitive",
        "title": "Myx: ML Experiment to Service",
        "description": "졸업을 위한 최종 프로젝트 및 논문 보고서입니다.",
        "stacks": [
          "go",
          "python",
          "fastapi",
          "mlops"
        ],
        "url": [
          "https://github.com/mkamadeus/myx",
          "https://report.mkamadeus.dev/"
        ]
      }
    ]
  }
}
</i18n>
