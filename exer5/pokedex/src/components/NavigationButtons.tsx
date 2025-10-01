import React from 'react';
import './NavigationButtons.css';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

function NavigationButtons({ onPrevious, onNext, canGoPrevious, canGoNext }: NavigationButtonsProps) {
  return (
    <div className="navigation-container">
      <button 
        className="nav-button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        &#8249;
      </button>
      <button 
        className="nav-button"
        onClick={onNext}
        disabled={!canGoNext}
      >
        &#8250;
      </button>
    </div>
  );
}

export default NavigationButtons;