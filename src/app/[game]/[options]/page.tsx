import { Link } from 'react-router-dom';
import { useState } from 'react';
import OptionsModal from 'app/components/OptionsModal';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from 'app/components/buttons/close-button';
import { Button } from 'app/components/buttons/button';
import { useGameNavigation } from 'app/[game]/hooks/routes/use-game-navigation';

export const OptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const resourcesPath = useGameNavigation();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    navigate(resourcesPath.exitPath);
  };
  return (
    <>
      <nav className="position:relative position:absolute text-center text-2xl font-bold mt-24">
        <Link to="/options">options page</Link>
        <div>
          <Button
            onClick={() => setShowModal(true)}
            className="h-[40px] backgroundColor:#85664a color:#f2e1d0"
          >
            {showModal ? (
              <OptionsModal>
                <div>
                  <h1>Options</h1>
                  <p>Here are some options</p>
                  <div className="ul">tweeter</div>
                  <div className="ul">meta</div>
                  <div className="ul">dark/white theme</div>
                  <CloseButton onClick={handleClose}>close</CloseButton>
                </div>
              </OptionsModal>
            ) : null}
            Click me
          </Button>
        </div>
      </nav>
    </>
  );
};
