        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            cyan: '#00f2fe',
                            purple: '#9d4edd',
                            emerald: '#10b981',
                            blue: '#3b82f6',
                            dark: '#07090e',
                            card: 'rgba(15, 23, 42, 0.65)',
                            border: 'rgba(255, 255, 255, 0.08)'
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace']
                    },
                    animation: {
                        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
                        'float': 'float 6s ease-in-out infinite',
                        'matrix-glow': 'matrixGlow 4s infinite alternate'
                    },
                    keyframes: {
                        pulseGlow: {
                            '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0,242,254,0.4))' },
                            '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(157,78,221,0.7))' }
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' }
                        }
                    }
                }
            }
        }
