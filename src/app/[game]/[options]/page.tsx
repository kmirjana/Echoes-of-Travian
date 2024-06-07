import { Link } from 'react-router-dom';
import { useState } from 'react';
import { OptionsModal } from 'app/components/OptionsModal';

import { CloseButton } from 'app/components/buttons/close-button';
import { Button } from 'app/components/buttons/button';
import { useGameNavigation } from 'app/[game]/hooks/routes/use-game-navigation';
import ReactModal from 'react-modal';

export const OptionsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  return (
    <>
      <nav className="position:relative position:absolute text-center text-2xl font-bold mt-24">
        <Link to="/options">options page</Link>
        <div>
          <Button onClick={handleOpen}>
            {showModal ? (
              <OptionsModal
                isOpen={showModal}
                onClose={!showModal}
              >
                <div className="grid grid-cols-2">
                  <h2 className="text-lg font-medium text-gray-900">Preferences</h2>
                  <CloseButton onClick={handleClose} />
                </div>
                <div className="mt-2 text-sm text-gray-500 grid grid-cols-3 grid-rows-1">
                  <div className="ul">tweeter</div>
                  <div className="ul">meta</div>
                  <div className="ul">dark/white theme</div>
                </div>
              </OptionsModal>
            ) : null}
            Open modal
          </Button>
        </div>
      </nav>
    </>
  );
};
