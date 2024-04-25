import React, { useState } from 'react';
import './style.css';
import { Card, Carousel, Modal } from 'antd';

interface Game {
    id: number;
    title: string;
    coverImage: string;
    screenshots?: string[];
    rating: number;
    platforms: string[];
    multiplayerInfo: {
        online: boolean;
        maxPlayers: number;
    };
}

interface GameCardProps {
    game: Game;
    getScreens: (type: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, getScreens }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [screenshotsLoaded, setScreenshotsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const handleMouseEnter = async () => {
        if (!screenshotsLoaded) {
            setLoading(true);
            await getScreens(game.id)
            setLoading(false);
            setScreenshotsLoaded(true);
        }
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    const showModal = (image:string) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
     return (
         <Card className="game-card" loading={loading} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       
            <h3>{game.title}</h3>
            {isHovering && game.screenshots?.length ? (
                <>
                <Carousel autoplay>
                    {game.screenshots.map((screenshot, index) => (
                        <div key={index} onClick={() => showModal(screenshot)}>
                            <img src={screenshot} alt={`Screenshot ${index + 1}`} />
                        </div>
                    ))}
                    
                </Carousel>
                <Modal  
        open={isModalOpen} 
        onCancel={closeModal} 
        footer={null}
                         width={'80%'}
        centered
      >
        <img src={modalImage} alt="Expanded screenshot"  style={{width:'100%'}}  />
          </Modal >
                 </>
                
            ) : (
                     <img src={game.coverImage} alt={game.title} style={{ width: '100%', maxHeight: '80vh' }} />
            )}
            <p>Rating: {game.rating}</p>
            <p>Platforms: {game.platforms.join(', ')}</p>
            {game.multiplayerInfo.online && (
                <p>Online Multiplayer: Up to {game.multiplayerInfo.maxPlayers} players</p>
            )}
        
         </Card>
    );
};

export default GameCard;