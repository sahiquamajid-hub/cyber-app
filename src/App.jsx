import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Shield, Unlock, BookOpen, Database, Key, CheckCircle, XCircle, AlertTriangle, Play, RotateCcw, Terminal, Cpu, Zap, Eye, ChevronRight } from 'lucide-react';

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  body {
    background-color: #020617; /* slate-950 */
    color: #f8fafc;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  /* 3D Spinning Animation for Padlock */
  @keyframes spinY {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }

  .spin-y {
    animation: spinY 12s linear infinite;
    transform-style: preserve-3d;
  }

  /* Premium Glassmorphism Cards */
  .glass-card {
    background: rgba(15, 23, 42, 0.4); /* slate-900 with opacity */
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(148, 163, 184, 0.1); /* slate-400 */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  }
  
  .glass-card:hover {
    border-color: rgba(99, 102, 241, 0.3); /* indigo-500 */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.1);
    transform: translateY(-4px);
  }

  /* Premium Inputs & Buttons */
  .glass-input {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.2);
    color: #e2e8f0;
    transition: all 0.2s ease;
  }
  .glass-input:focus {
    outline: none;
    border-color: #818cf8; /* indigo-400 */
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  .glass-btn {
    transition: all 0.2s ease;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .glass-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BruteForceSim = () => {
  const [password, setPassword] = useState('neo');
  const [isCracking, setIsCracking] = useState(false);
  const [crackedIndex, setCrackedIndex] = useState(-1);
  const [currentGuess, setCurrentGuess] = useState(['-', '-', '-']);
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$';

  useEffect(() => {
    let interval;
    if (isCracking) {
      interval = setInterval(() => {
        setCurrentGuess(prev => {
          const newGuess = [...prev];
          for (let i = crackedIndex + 1; i < password.length; i++) {
            newGuess[i] = characters[Math.floor(Math.random() * characters.length)];
          }
          return newGuess;
        });

        if (Math.random() > 0.85 && crackedIndex < password.length - 1) {
          setCrackedIndex(prev => prev + 1);
        } else if (crackedIndex >= password.length - 1) {
          setIsCracking(false);
          setCurrentGuess(password.split(''));
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isCracking, crackedIndex, password]);

  const handleStart = () => {
    if (!password) return;
    setCrackedIndex(-1);
    setCurrentGuess(Array(password.length).fill('-'));
    setIsCracking(true);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value.toLowerCase().replace(/\s/g, '').slice(0, 6);
    setPassword(val);
    setCurrentGuess(Array(val.length).fill('-'));
    setCrackedIndex(-1);
    setIsCracking(false);
  };

  return (
    <div className="glass-card rounded-2xl p-8 mb-10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
          <Unlock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Brute Force Attack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-slate-300 mb-6 leading-relaxed text-sm md:text-base border-l-4 border-indigo-500 pl-4 bg-indigo-500/5 py-3 rounded-r-lg">
            <strong>The Analogy:</strong> A thief trying every single combination on a padlock.
            000, 001, 002... until it clicks. Computers can guess <em>billions</em> of times per second. Short passwords are cracked instantly.
          </p>

          <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4" /> Target Password (Max 6 chars)
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={password}
              onChange={handlePasswordChange}
              disabled={isCracking}
              className="glass-input w-full px-4 py-3 rounded-xl text-lg font-mono"
            />
            <button
              onClick={handleStart}
              disabled={isCracking || !password}
              className="glass-btn bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-900/20"
            >
              {isCracking ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              Start
            </button>
          </div>
        </div>

        <div className="bg-slate-950/80 p-6 rounded-xl border border-slate-800 relative overflow-hidden h-full flex flex-col justify-center">
          <p className="text-center text-slate-500 text-xs mb-6 uppercase tracking-widest font-semibold">Cracker Engine Active</p>

          <div className="flex justify-center gap-2 flex-wrap">
            {currentGuess.map((char, i) => (
              <div
                key={i}
                className={`w-12 h-16 md:w-14 md:h-20 flex items-center justify-center text-3xl md:text-4xl font-mono font-bold rounded-lg transition-all duration-75
                  ${i <= crackedIndex
                    ? 'bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-110 z-10'
                    : isCracking
                      ? 'bg-slate-800 border border-slate-700 text-indigo-300'
                      : 'bg-slate-900 border border-slate-800 text-slate-600'}
                `}
              >
                {char.toUpperCase()}
              </div>
            ))}
          </div>

          <div className="mt-8 h-8 flex justify-center items-center">
            {crackedIndex >= password.length - 1 && password.length > 0 && !isCracking && (
              <div className="text-emerald-400 font-semibold text-sm md:text-base flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-5 h-5" /> MATCH FOUND
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DictionarySim = () => {
  const [password, setPassword] = useState('');
  const [isAttacking, setIsAttacking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [result, setResult] = useState(null);

  const commonPasswords = [
    "123456", "password", "12345678", "qwerty", "12345",
    "123456789", "football", "admin", "admin123", "iloveyou",
    "dragon", "matrix", "letmein", "sunshine", "trustno1", "cyber", "hacker"
  ];

  useEffect(() => {
    let interval;
    if (isAttacking) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= commonPasswords.length) {
            setIsAttacking(false);
            setResult('fail');
            return prev;
          }
          if (commonPasswords[next].toLowerCase() === password.toLowerCase()) {
            setIsAttacking(false);
            setResult('success');
          }
          return next;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isAttacking, password]);

  const handleStart = () => {
    if (!password) return;
    setCurrentIndex(-1);
    setResult(null);
    setIsAttacking(true);
  };

  return (
    <div className="glass-card rounded-2xl p-8 mb-10 relative overflow-hidden">
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
        <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Dictionary Attack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-slate-300 mb-6 leading-relaxed text-sm md:text-base border-l-4 border-sky-500 pl-4 bg-sky-500/5 py-3 rounded-r-lg">
            <strong>The Analogy:</strong> Hackers know humans are lazy. Instead of random letters, they load a "book" of millions of common or leaked passwords. If your password is a real word, it's found instantly.
          </p>

          <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Check Password Strength
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setResult(null); setCurrentIndex(-1); }}
            placeholder="e.g., matrix, dragon, admin..."
            disabled={isAttacking}
            className="glass-input w-full px-4 py-3 rounded-xl text-lg mb-4 font-mono"
          />
          <button
            onClick={handleStart}
            disabled={isAttacking || !password}
            className="glass-btn w-full bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-sky-900/20"
          >
            {isAttacking ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            Scan Dictionary
          </button>

          <div className="mt-6 h-24">
            {result === 'success' && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-4">
                <AlertTriangle className="text-rose-400 w-6 h-6 mt-1" />
                <div>
                  <p className="text-rose-400 font-bold">VULNERABLE</p>
                  <p className="text-sm text-slate-300">Found in common password list.</p>
                </div>
              </div>
            )}
            {result === 'fail' && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-4">
                <CheckCircle className="text-emerald-400 w-6 h-6 mt-1" />
                <div>
                  <p className="text-emerald-400 font-bold">SECURE</p>
                  <p className="text-sm text-slate-300">Not found in standard dictionary list.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 relative overflow-hidden h-72 shadow-inner">
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>

          <div className="h-full w-full rounded-lg p-4 font-mono overflow-hidden relative bg-slate-900/50">
            <div className="text-slate-500 text-xs mb-2 pb-2 border-b border-slate-800 flex justify-between font-semibold">
              <span>list: rockyou.txt</span>
              <span>entries: {commonPasswords.length}</span>
            </div>

            <div
              className="absolute w-full transition-all duration-150 ease-linear left-4 right-4"
              style={{ top: currentIndex > 4 ? `-${(currentIndex - 4) * 32}px` : '40px' }}
            >
              {commonPasswords.map((word, idx) => {
                let statusClass = "text-slate-600";
                if (idx === currentIndex) statusClass = "text-sky-400 bg-sky-500/10 font-bold rounded px-2";
                if (result === 'success' && idx === currentIndex) statusClass = "text-rose-400 bg-rose-500/10 font-bold rounded px-2 border border-rose-500/30";
                if (idx < currentIndex && result !== 'success') statusClass = "text-slate-700 line-through";

                return (
                  <div key={idx} className={`py-1 transition-all flex justify-between items-center h-8 my-1 pr-8 ${statusClass}`}>
                    <span>{word}</span>
                    {idx === currentIndex && isAttacking && <span className="text-xs text-sky-400">scanning...</span>}
                    {idx === currentIndex && result === 'success' && <span className="text-xs text-rose-400">MATCH</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SQLiSim = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');

  const handleLogin = (e) => {
    e.preventDefault();
    setStatus('checking');

    setTimeout(() => {
      if (username === "' OR '1'='1" || password === "' OR '1'='1") {
        setStatus('granted');
      } else {
        setStatus('denied');
      }
    }, 1200);
  };

  const autoFillHack = () => {
    setUsername("' OR '1'='1");
    setPassword("anything");
    setStatus('idle');
  };

  return (
    <div className="glass-card rounded-2xl p-8 mb-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
          <Database className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          SQL Injection (SQLi)
        </h2>
      </div>

      <p className="text-slate-300 mb-8 leading-relaxed text-sm md:text-base border-l-4 border-emerald-500 pl-4 bg-emerald-500/5 py-3 rounded-r-lg">
        <strong>The Analogy:</strong> A bouncer checking IDs. Instead of a fake ID, you hand him a note: <em>"Let me in, OR if 1 equals 1, let me in."</em> Since 1 always equals 1, the logic breaks, and he opens the door. You trick the brain!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

        {/* The Form */}
        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-inner">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center">
              <Eye className="w-4 h-4 mr-2" /> User Interface
            </h3>
            <button
              onClick={autoFillHack}
              className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <Zap className="w-3 h-3" /> Auto-Inject Exploit
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setStatus('idle'); }}
                className="glass-input font-mono w-full px-4 py-2.5 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">PASSWORD</label>
              <input
                type="text"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setStatus('idle'); }}
                className="glass-input font-mono w-full px-4 py-2.5 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'checking'}
              className="glass-btn w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl mt-4 shadow-lg shadow-emerald-900/20"
            >
              {status === 'checking' ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 h-14">
            {status === 'denied' && (
              <div className="bg-rose-500/10 text-rose-400 p-3 rounded-lg flex items-center justify-center gap-2 border border-rose-500/20 font-semibold text-sm">
                <XCircle className="w-5 h-5" /> Authentication Failed
              </div>
            )}
            {status === 'granted' && (
              <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-lg flex items-center justify-center gap-2 border border-emerald-500/20 font-semibold text-sm">
                <Unlock className="w-5 h-5" /> Access Granted
              </div>
            )}
          </div>
        </div>

        {/* The Database Brain */}
        <div className={`bg-slate-950 p-6 rounded-xl border transition-all duration-500 flex flex-col
          ${(username === "' OR '1'='1" || password === "' OR '1'='1") ? 'border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.1)]' : 'border-slate-800'}
        `}>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Server Logic Core
          </h3>
          <p className="text-slate-500 text-xs mb-4">Live SQL Query Interpretation:</p>

          <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-800 font-mono text-sm leading-loose relative overflow-hidden flex-grow flex flex-col justify-center shadow-inner">

            {(username === "' OR '1'='1" || password === "' OR '1'='1") && (
              <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none"></div>
            )}

            <div>
              <span className="text-purple-400 font-bold">SELECT</span> <span className="text-slate-400">*</span> <span className="text-purple-400 font-bold">FROM</span> <span className="text-sky-300">users</span>
            </div>
            <div>
              <span className="text-purple-400 font-bold">WHERE</span> <span className="text-slate-300">username = </span>
              <span className={`px-1 rounded transition-colors ${username === "' OR '1'='1" ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-amber-300'}`}>
                '{username || <span className="opacity-30 text-slate-500">empty</span>}'
              </span>
            </div>
            <div>
              <span className="text-purple-400 font-bold">AND</span> <span className="text-slate-300">password = </span>
              <span className={`px-1 rounded transition-colors ${password === "' OR '1'='1" ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-amber-300'}`}>
                '{password || <span className="opacity-30 text-slate-500">empty</span>}'
              </span>
              <span className="text-slate-400">;</span>
            </div>
          </div>

          <div className="mt-4 min-h-[60px]">
            {(username === "' OR '1'='1" || password === "' OR '1'='1") ? (
              <div className="text-xs text-rose-300 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-400" />
                <span className="leading-relaxed"><strong>Logic Bypass!</strong> The query evaluates to TRUE because '1'='1'. The server ignores the actual credentials and grants access.</span>
              </div>
            ) : (
              <div className="text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex gap-3 items-start">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-500" />
                <span className="leading-relaxed">Awaiting exact credential match to evaluate TRUE and grant access.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 1200); // Density of sparkles
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.1,
          vx: Math.floor(Math.random() * 50) - 25,
          vy: Math.floor(Math.random() * 50) - 25,
          alpha: Math.random(),
          alphaChange: (Math.random() * 0.015) + 0.005, // Twinkle speed
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle effect
        s.alpha += s.alphaChange;
        if (s.alpha <= 0.1 || s.alpha >= 0.8) {
          s.alphaChange = -s.alphaChange;
        }

        // Very slow drift
        s.x += s.vx / 150;
        s.y += s.vy / 150;

        // Wrap around screen
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${s.alpha})`; // indigo-300 tinted sparkles
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -15 }} />;
};

export default function App() {
  return (
    <>
      <style>{globalCss}</style>

      {/* Premium Gradient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-slate-950 -z-20"></div>

      {/* Shining Starfield Background */}
      <Starfield />

      {/* Subtle ambient lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="min-h-screen relative z-10 pb-20">

        {/* Header Section */}
        <header className="pt-28 pb-20 text-center px-4 relative flex flex-col items-center justify-center">

          {/* Animated 3D Padlock Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-20 pointer-events-none" style={{ perspective: '800px' }}>
            <svg
              width="240"
              height="240"
              viewBox="0 0 100 100"
              className="spin-y drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              <defs>
                <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="shackleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>
              {/* Shackle */}
              <path
                d="M 30 45 V 30 A 20 20 0 0 1 70 30 V 45"
                fill="none"
                stroke="url(#shackleGrad)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Lock Body */}
              <rect x="20" y="40" width="60" height="45" rx="8" fill="url(#lockGrad)" />
              {/* Keyhole */}
              <circle cx="50" cy="58" r="4" fill="#0f172a" />
              <path d="M 47 60 L 45 70 h 10 L 53 60 Z" fill="#0f172a" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-sm">
            <Shield className="w-4 h-4" /> Educational Module
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-xl">
            How Passwords Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Compromised</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            Forget complex code. Experience exactly how systems are breached through interactive visual simulations.
            Scroll down to explore the vulnerabilities.
          </p>
        </header>

        {/* Main Content Modules */}
        <main className="max-w-4xl mx-auto px-4 md:px-8 relative z-20">
          <BruteForceSim />
          <DictionarySim />
          <SQLiSim />
        </main>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto px-4 text-center mt-12 mb-8">
          <div className="inline-block border-t border-slate-800 py-6 px-12">
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">
              End of Simulation • Built for Educational Purposes
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}