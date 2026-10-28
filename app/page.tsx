'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, Heart, LockKeyhole, RotateCcw, Sparkles, Star, X } from 'lucide-react';

type Scene = 'intro' | 'adventure' | 'final';

const messages = [
  {
    title: 'A little thing I love',
    tag: 'STAR 01 · THE LITTLE THINGS',
    body: 'Tumhari chhoti-chhoti baatein bhi mere face par smile le aati hain. Kabhi kabhi normal si conversation bhi din ka best part ban jaati hai. 🌷',
    bunny: 'Hehe… tumhari smile kaafi dangerous hai. Seedha dil tak jaati hai!'
  },
  {
    title: 'A tiny confession',
    tag: 'STAR 02 · JUST BETWEEN US',
    body: 'Tum mere liye special ho — ye toh tum jaanti hi ho. Bas kabhi-kabhi dil karta hai ki tumhe yaad dilata rahun, apne chhote se tareeke se. 💌',
    bunny: 'Main toh bas messenger hoon… par ye baat dil se aayi hai, okay? 🥹'
  },
  {
    title: 'One little wish',
    tag: 'STAR 03 · A WISH FOR US',
    body: 'Meri wish simple si hai: aur baatein, aur hasi, aur memories… aur aise hi ek dusre ki life mein thodi si extra khushi add karte rehna. ✨',
    bunny: 'Last star ke baad ek chhota sa surprise hai. Ready?'
  }
];

const ease = [0.22, 1, 0.36, 1] as const;

function MoonBunny({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? 'bunny-svg bunny-small' : 'bunny-svg'} viewBox="0 0 160 176" role="img" aria-label="A tiny cartoon bunny">
      <ellipse cx="58" cy="37" rx="17" ry="34" fill="#fff5f4" stroke="#dca9b8" strokeWidth="2.2" transform="rotate(-12 58 37)" />
      <ellipse cx="102" cy="37" rx="17" ry="34" fill="#fff5f4" stroke="#dca9b8" strokeWidth="2.2" transform="rotate(12 102 37)" />
      <ellipse cx="58" cy="37" rx="8" ry="23" fill="#f2b2c5" transform="rotate(-12 58 37)" />
      <ellipse cx="102" cy="37" rx="8" ry="23" fill="#f2b2c5" transform="rotate(12 102 37)" />
      <ellipse cx="80" cy="133" rx="39" ry="35" fill="#fff8f6" stroke="#dca9b8" strokeWidth="2.2" />
      <ellipse cx="80" cy="84" rx="45" ry="40" fill="#fff8f6" stroke="#dca9b8" strokeWidth="2.2" />
      <ellipse cx="62" cy="82" rx="4.2" ry="6" fill="#493442" />
      <ellipse cx="98" cy="82" rx="4.2" ry="6" fill="#493442" />
      <ellipse cx="48" cy="96" rx="10" ry="6" fill="#f3a9bf" opacity=".78" />
      <ellipse cx="112" cy="96" rx="10" ry="6" fill="#f3a9bf" opacity=".78" />
      <path d="M75 91 Q80 86 85 91 Q80 98 75 91" fill="#d9809c" />
      <path d="M80 97 Q73 105 68 98 M80 97 Q87 105 92 98" fill="none" stroke="#493442" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 128 C68 118 60 113 67 108 C73 104 78 110 80 113 C84 106 92 106 96 112 C100 119 89 125 80 132Z" fill="#e88ca8" />
      <circle cx="44" cy="132" r="8" fill="#fff8f6" stroke="#dca9b8" strokeWidth="2" />
      <circle cx="116" cy="132" r="8" fill="#fff8f6" stroke="#dca9b8" strokeWidth="2" />
    </svg>
  );
}

function StarField() {
  return <div className="star-field" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} className={`sky-star sky-star-${i % 6}`} style={{ left: `${(i * 29 + 7) % 97}%`, top: `${(i * 41 + 11) % 93}%`, animationDelay: `${(i % 7) * -0.45}s` }} />)}</div>;
}

export default function Home() {
  const reduced = useReducedMotion();
  const [scene, setScene] = useState<Scene>('intro');
  const [unlocked, setUnlocked] = useState(0);
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const [heartOpened, setHeartOpened] = useState(false);
  const [loveVisible, setLoveVisible] = useState(false);
  const [photo, setPhoto] = useState('/anshuuu.jpeg');
  const [photoError, setPhotoError] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scene !== 'final' || !heartOpened) return;
    const timer = window.setTimeout(() => setLoveVisible(true), reduced ? 100 : 2200);
    return () => window.clearTimeout(timer);
  }, [scene, heartOpened, reduced]);

  function selectPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result);
        setPhotoError(false);
      }
    };
    reader.readAsDataURL(file);
  }

  function openMessage(index: number) {
    if (index > unlocked) return;
    setActiveMessage(index);
  }

  function continueMessage() {
    if (activeMessage === null) return;
    setUnlocked((current) => Math.max(current, activeMessage + 1));
    setActiveMessage(null);
  }

  function startOver() {
    setScene('intro');
    setUnlocked(0);
    setActiveMessage(null);
    setHeartOpened(false);
    setLoveVisible(false);
    setSecretOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="adventure-shell">
      <StarField />
      <div className="moon-halo" aria-hidden="true" />
      <div className="ambient-glow glow-a" aria-hidden="true" />
      <div className="ambient-glow glow-b" aria-hidden="true" />

      <header className="topbar">
        <button className="brand-mark" onClick={startOver} aria-label="Restart adventure"><span className="brand-moon">☾</span> a little moonlight <span className="brand-heart">♡</span></button>
        <span className="top-status">{scene === 'intro' ? 'A TINY ADVENTURE' : scene === 'adventure' ? `${unlocked} OF 3 STARS FOUND` : 'THE LAST LITTLE SURPRISE'}</span>
      </header>

      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <motion.section key="intro" className="scene intro-scene" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97, y: -12 }} transition={{ duration: .65, ease }}>
            <div className="intro-copy">
              <span className="eyebrow"><Sparkles size={13} /> A LITTLE SOMETHING FOR YOU</span>
              <h1>Wanna go on a<br /><em>tiny adventure?</em></h1>
              <p className="intro-description">Raat, kuch stars, ek chhota sa dost…<br />aur tumhare liye kuch baatein. 🌙</p>
              <motion.div className="intro-mascot" animate={reduced ? {} : { y: [0, -8, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="mascot-spark spark-one">✦</span><MoonBunny /><span className="mascot-spark spark-two">♡</span>
              </motion.div>
              <div className="speech-bubble intro-bubble">Pssst… tumhare liye kuch chhupaya hai! 🐰</div>
              <button className="primary-button" onClick={() => setScene('adventure')}>Chalo, dekhte hain <ArrowRight size={16} /></button>
              <p className="micro-note">no rush · just tap and explore</p>
            </div>
          </motion.section>
        )}

        {scene === 'adventure' && (
          <motion.section key="adventure" className="scene adventure-scene" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .6, ease }}>
            <div className="adventure-heading">
              <span className="eyebrow">YOUR LITTLE NIGHT WALK</span>
              <h2>Follow the <em>little stars.</em></h2>
              <p>Har star mein ek chhoti si baat hai. Tap karke dekho. ✨</p>
            </div>

            <div className={`night-map progress-${unlocked}`}>
              <svg className="star-path" viewBox="0 0 340 360" preserveAspectRatio="none" aria-hidden="true"><path d="M80 62 C265 65 270 115 170 160 S45 220 95 270 S245 320 270 310" fill="none" stroke="rgba(245,190,211,.28)" strokeWidth="2" strokeDasharray="4 8" /></svg>
              <motion.div className={`traveller traveller-${unlocked}`} animate={reduced ? {} : { y: [0, -5, 0] }} transition={{ duration: 2.8, repeat: Infinity }}><MoonBunny small /><span className="traveller-label">that's me!</span></motion.div>
              {messages.map((message, index) => {
                const isUnlocked = index < unlocked;
                const isNext = index === unlocked;
                const positions = ['star-position-one', 'star-position-two', 'star-position-three'];
                return <motion.button key={message.tag} className={`map-star ${positions[index]} ${isUnlocked ? 'is-unlocked' : ''} ${isNext ? 'is-next' : 'is-locked'}`} onClick={() => openMessage(index)} disabled={index > unlocked} aria-label={`${isUnlocked ? 'Reopen' : 'Discover'} message ${index + 1}`} whileHover={index <= unlocked ? { scale: 1.1 } : {}} whileTap={index <= unlocked ? { scale: .92 } : {}}>
                  <span className="star-icon-wrap">{isUnlocked ? <Check size={18} /> : index > unlocked ? <LockKeyhole size={16} /> : <Star size={24} fill="currentColor" />}</span>
                  <span className="star-number">{isUnlocked ? 'FOUND' : `STAR 0${index + 1}`}</span>
                  {isNext && <motion.i className="star-ping" animate={reduced ? {} : { scale: [1, 1.55, 1], opacity: [.55, 0, .55] }} transition={{ duration: 1.8, repeat: Infinity }} />}
                </motion.button>;
              })}
            </div>

            <div className="adventure-footer">
              <div className="progress-dots" aria-label={`${unlocked} of 3 stars discovered`}>{messages.map((m, i) => <span key={m.tag} className={i < unlocked ? 'dot done' : ''} />)}</div>
              {unlocked < 3 ? <p>{unlocked === 0 ? 'Pehla star tumhara wait kar raha hai…' : `Yay! ${unlocked} star${unlocked > 1 ? 's' : ''} mil gaya. Keep going!`}</p> : <motion.button className="primary-button finish-adventure" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} onClick={() => setScene('final')}>Last surprise, promise <Heart size={15} fill="currentColor" /></motion.button>}
            </div>
          </motion.section>
        )}

        {scene === 'final' && (
          <motion.section key="final" className="scene final-scene" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7, ease }}>
            <span className="eyebrow"><Sparkles size={13} /> THE LAST LITTLE SURPRISE</span>
            {!heartOpened ? <>
              <h2>Okay, one last thing…<br /><em>from my heart.</em></h2>
              <p className="final-intro">Tap the heart. I kept the best part for last. 💗</p>
              <motion.button className="big-heart-button" onClick={() => setHeartOpened(true)} aria-label="Open the heart" whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }} animate={reduced ? {} : { y: [0, -6, 0] }} transition={{ duration: 2.7, repeat: Infinity }}>
                <span className="heart-aura" /><Heart size={118} fill="currentColor" strokeWidth={.8} /><span className="heart-button-caption">tap to open ♡</span>
              </motion.button>
              <div className="speech-bubble final-bubble">Abhi-abhi thoda sa blush karna allowed hai. 🤭</div>
            </> : <>
              <div className="photo-reveal-stage">
                <motion.div className="photo-frame" initial={{ opacity: 0, scale: .55, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} transition={{ duration: .9, delay: .25, ease }}>
                  <img src={photo} alt="A favourite photo" onError={() => setPhotoError(true)} />
                  {photoError && <span className="photo-fallback">Your favourite photo goes here ♡</span>}
                  <span className="photo-caption">my favourite person ♡</span>
                </motion.div>
                <motion.div className="heart-petal petal-left" initial={{ x: 0, rotate: 0, opacity: 1 }} animate={{ x: '-145%', rotate: -28, opacity: 0 }} transition={{ duration: 1.35, ease }}><Heart fill="currentColor" /></motion.div>
                <motion.div className="heart-petal petal-right" initial={{ x: 0, rotate: 0, opacity: 1 }} animate={{ x: '145%', rotate: 28, opacity: 0 }} transition={{ duration: 1.35, ease }}><Heart fill="currentColor" /></motion.div>
              </div>
              <input ref={photoInput} className="visually-hidden" type="file" accept="image/*" onChange={selectPhoto} />
              <AnimatePresence>{loveVisible && <motion.div className="love-reveal" initial={{ opacity: 0, y: 22, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .9, ease }}><span className="eyebrow">AND I MEAN EVERY WORD</span><h1>I Love You <em>♡</em></h1><p>Tum mere liye bahut special ho.<br />Aur tumhare saath aur bhi khoobsurat memories banana chahta hoon. ✨</p><button className="secret-link" onClick={() => setSecretOpen(true)}><LockKeyhole size={13} /> ek tiny secret?</button></motion.div>}</AnimatePresence>
              {!loveVisible && <p className="waiting-note">a little magic is finding its way… ✨</p>}
            </>}
            <button className="back-link" onClick={startOver}><RotateCcw size={13} /> Start our little adventure again</button>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="site-footer"><span>made with a little extra care <span>♡</span></span><span>one tiny universe, just for you</span></footer>

      <AnimatePresence>
        {activeMessage !== null && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveMessage(null)}>
          <motion.div className="message-modal" role="dialog" aria-modal="true" aria-label={messages[activeMessage].title} initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .35, ease }} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveMessage(null)} aria-label="Close message"><X size={17} /></button>
            <motion.div className="modal-mascot" animate={reduced ? {} : { y: [0, -4, 0] }} transition={{ duration: 2.4, repeat: Infinity }}><MoonBunny small /></motion.div>
            <span className="eyebrow">{messages[activeMessage].tag}</span>
            <h3>{messages[activeMessage].title}</h3>
            <p className="message-body">{messages[activeMessage].body}</p>
            <div className="speech-bubble modal-bubble">{messages[activeMessage].bunny}</div>
            <button className="primary-button modal-continue" onClick={continueMessage}>{activeMessage === 2 ? 'Keep this wish ♡' : 'Aww, next star!' } <ArrowRight size={15} /></button>
            <p className="modal-count">A LITTLE MESSAGE · 0{activeMessage + 1} / 03</p>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {secretOpen && <motion.div className="modal-backdrop secret-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSecretOpen(false)}>
          <motion.div className="message-modal secret-modal" role="dialog" aria-modal="true" aria-label="A tiny secret" initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSecretOpen(false)} aria-label="Close secret"><X size={17} /></button>
            <div className="secret-big-heart"><Heart fill="currentColor" /></div>
            <span className="eyebrow">JUST BETWEEN US</span>
            <h3>Ek chhoti si baat…</h3>
            <p className="message-body">Agar main ye moment dobara bana sakta, toh har baar tumhare liye hi banata. Thank you for being you. ❤️</p>
            <button className="secondary-button" onClick={() => setSecretOpen(false)}>Awww, okay ♡</button>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
