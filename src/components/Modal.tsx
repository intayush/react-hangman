import { memo } from "react";
import styled from "styled-components";
interface ModalProps {
  isVisible: boolean;
  winner: boolean;
  closeHandler: () => void;
}

const Modal = ({ isVisible, winner, closeHandler }: ModalProps) => {
  const message = winner ? "You have won :)" : "You have lost :(";
  return (
    <>
      {isVisible && (
        <ModalWrapper>
          <ModalDialog onClick={(e) => e.stopPropagation()}>
            <ModalBody>
              <ModalContent>
                <h2>{message}</h2>
                <PlayAgainButton onClick={closeHandler}>
                  Play Again
                </PlayAgainButton>
              </ModalContent>
            </ModalBody>
          </ModalDialog>
        </ModalWrapper>
      )}
    </>
  );
};

export default memo(Modal);

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  animation-name: appear;
  animation-duration: 300ms;
`;

const ModalDialog = styled.div`
  border-radius: 10px;
  width: 100%;
  max-width: 350px;
  background: white;
  position: relative;
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: slide-in;
  animation-duration: 0.5s;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateY(-150px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalBody = styled.div`
  overflow: auto;
`;

const ModalContent = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PlayAgainButton = styled.button`
  padding: 1em 2em;
  background: #004134;
  color: #fff;
  font-size: 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
