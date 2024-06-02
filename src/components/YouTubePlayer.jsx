import ReactPlayer from 'react-player'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { YOUTUBE_ENDPOINT } from '../constants'
import '../styles/movies.scss'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    border: 'none',
  },
};

const closeModalBtnStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  color: '#fff',
  fontSize: '2rem',
  cursor: 'pointer',
  zIndex: 1000,
  backgroundColor: 'black',
  border: 'none',
}

const YouTubePlayer = ({ videoKey }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(!!videoKey);
  }, [videoKey]);

  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        fade={false}
        style={customStyles}
        overlayClassName="overlay"
      >
        <ReactPlayer 
          className="video-player"
          url={`${YOUTUBE_ENDPOINT}${videoKey}`} 
          controls={true}
          playing={true}
          data-testid="youtube-player"
        />
        <button style={closeModalBtnStyles} onClick={() => setIsOpen(false)}>X</button>
      </Modal>
    </div>
    
  )
};

export default YouTubePlayer;
