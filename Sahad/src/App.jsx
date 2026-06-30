import React, { useEffect, useMemo, useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Modal from './components/Modal';
import FloatingParticles from './components/FloatingParticles';

import MagicalCursor from './components/MagicalCursor';

const MODALS = {
  gallery: {
    title: 'Our Little Museum',
  },
  bouquet: {
    title: 'To My Beautiful Moon',
  },
  song: {
    title: 'Our Melody',
  },
  letter: {
    title: 'My Dearest Sedeen',
  },
};

function App() {
  const [showLanding, setShowLanding] = useState(() => {
    return localStorage.getItem('sedeenGiftOpened') !== 'true';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const activeModalData = useMemo(() => {
    if (!activeModal) return null;
    return MODALS[activeModal] || null;
  }, [activeModal]);

  const handleEnter = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      localStorage.setItem('sedeenGiftOpened', 'true');
      setShowLanding(false);
      setIsTransitioning(false);
    }, 700);
  };

  const handleOpenModal = (modalId) => {
    if (!MODALS[modalId]) return;
    setActiveModal(modalId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleResetGift = () => {
    localStorage.removeItem('sedeenGiftOpened');
    setActiveModal(null);
    setIsTransitioning(false);
    setShowLanding(true);
  };

  useEffect(() => {
    if (activeModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [activeModal]);

  return (
    <main className="app-shell">
      <MagicalCursor />
      <FloatingParticles />

      {showLanding ? (
        <LandingPage
          isVisible={!isTransitioning}
          onEnter={handleEnter}
        />
      ) : (
        <Dashboard
          isVisible={!isTransitioning}
          onOpenModal={handleOpenModal}
        />
      )}

      {!showLanding && (
        <button
          type="button"
          className="reset-gift-btn"
          onClick={handleResetGift}
          aria-label="Return to gift opening page"
        >
          <i className="fas fa-rotate-left"></i>
        </button>
      )}

      {activeModal && activeModalData && (
        <Modal
          id={activeModal}
          title={activeModalData.title}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default App;
