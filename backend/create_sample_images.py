import os

images_dir = os.path.join('static', 'images')
os.makedirs(images_dir, exist_ok=True)

svgs = {
    "airpods.jpg": """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <linearGradient id="pod" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg)"/>
      <circle cx="300" cy="200" r="120" fill="#38bdf8" opacity="0.1"/>
      <rect x="220" y="120" width="160" height="150" rx="40" fill="url(#pod)" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.5))"/>
      <path d="M 220 180 Q 300 200 380 180" stroke="#cbd5e1" stroke-width="3" fill="none"/>
      <circle cx="300" cy="230" r="8" fill="#22c55e"/>
      <text x="300" y="340" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="22" font-weight="600" text-anchor="middle">Airpods Wireless Pro</text>
    </svg>""",

    "phone.jpg": """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#312e81"/>
        </linearGradient>
        <linearGradient id="screen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899"/>
          <stop offset="50%" stop-color="#8b5cf6"/>
          <stop offset="100%" stop-color="#3b82f6"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg)"/>
      <rect x="230" y="70" width="140" height="260" rx="28" fill="#090d16" stroke="#475569" stroke-width="4" filter="drop-shadow(0 25px 35px rgba(0,0,0,0.6))"/>
      <rect x="240" y="80" width="120" height="240" rx="20" fill="url(#screen)"/>
      <rect x="270" y="85" width="60" height="14" rx="7" fill="#090d16"/>
      <text x="300" y="365" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="22" font-weight="600" text-anchor="middle">iPhone 13 Pro</text>
    </svg>""",

    "camera.jpg": """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#022c22"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg)"/>
      <rect x="180" y="130" width="240" height="150" rx="20" fill="#18181b" stroke="#3f3f46" stroke-width="4" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.5))"/>
      <rect x="220" y="100" width="80" height="30" rx="8" fill="#27272a"/>
      <circle cx="300" cy="205" r="55" fill="#09090b" stroke="#a1a1aa" stroke-width="6"/>
      <circle cx="300" cy="205" r="35" fill="#0284c7" opacity="0.7"/>
      <text x="300" y="340" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="22" font-weight="600" text-anchor="middle">Canon EOS 80D Camera</text>
    </svg>""",

    "playstation.jpg": """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#030712"/>
          <stop offset="100%" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg)"/>
      <path d="M 230 70 L 260 310 Q 300 330 340 310 L 370 70 Q 300 90 230 70 Z" fill="#ffffff" filter="drop-shadow(0 25px 35px rgba(0,0,0,0.7))"/>
      <path d="M 260 80 L 275 300 Q 300 315 325 300 L 340 80 Q 300 95 260 80 Z" fill="#090d16"/>
      <line x1="300" y1="95" x2="300" y2="305" stroke="#3b82f6" stroke-width="4" filter="drop-shadow(0 0 10px #3b82f6)"/>
      <text x="300" y="360" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="22" font-weight="600" text-anchor="middle">Sony PlayStation 5</text>
    </svg>""",

    "mouse.jpg": """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181b"/>
          <stop offset="100%" stop-color="#27272a"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg)"/>
      <ellipse cx="300" cy="200" rx="70" ry="110" fill="#09090b" stroke="#06b6d4" stroke-width="3" filter="drop-shadow(0 20px 30px rgba(6,182,212,0.3))"/>
      <line x1="300" y1="90" x2="300" y2="170" stroke="#27272a" stroke-width="3"/>
      <rect x="294" y="110" width="12" height="24" rx="6" fill="#06b6d4"/>
      <text x="300" y="350" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="22" font-weight="600" text-anchor="middle">Logitech Gaming Mouse</text>
    </svg>""",

    "alexa.jpg": """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2e1065"/>
          <stop offset="100%" stop-color="#3b0764"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg)"/>
      <circle cx="300" cy="190" r="90" fill="#334155" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.6))"/>
      <ellipse cx="300" cy="265" rx="75" ry="15" fill="none" stroke="#38bdf8" stroke-width="6" filter="drop-shadow(0 0 15px #38bdf8)"/>
      <text x="300" y="350" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="22" font-weight="600" text-anchor="middle">Amazon Echo Dot 4th Gen</text>
    </svg>""",

    "placeholder.jpg": """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#1e293b"/>
      <text x="300" y="200" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="24" text-anchor="middle">Product Image</text>
    </svg>"""
}

for name, svg in svgs.items():
    with open(os.path.join(images_dir, name), 'w', encoding='utf-8') as f:
        f.write(svg)

print("Sample images created successfully.")
