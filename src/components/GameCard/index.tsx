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
    getScreens: () => void;
    screens:string[]
}

const GameCard: React.FC<GameCardProps> = ({ game, getScreens, screens }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const handleMouseEnter = () => {
        getScreens();
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
    console.log(`renderCarad`);
     return (
         <Card className="game-card" loading={loading} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       
            <h3>{game.title}</h3>
             {isHovering && screens?.length ? (
                <>
                <Carousel autoplay>
                         {screens.map((screens, index) => (
                             <div key={index} onClick={() => showModal(screens)}>
                                 <img src={screens} alt={`Screenshot ${index + 1}`} />
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
        <img src={modalImage} alt="Expanded screenshot"    />
          </Modal >
                 </>
                
            ) : (
                     <img src={game.coverImage} alt={game.title}  />
            )}
            <p>Rating: {game.rating}</p>
            <p>Platforms: {game.platforms.join(', ')}</p>
            {game.multiplayerInfo.online && (
                <p>Online Multiplayer: Up to {game.multiplayerInfo.maxPlayers} players</p>
            )}
        
         </Card>
    );
};

export default React.memo(GameCard);