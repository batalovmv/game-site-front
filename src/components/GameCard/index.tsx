import React, { useState } from 'react';
import './style.css';
import { Card, Carousel, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { Game } from '../../features/games/types';



interface GameCardProps {
    game: Game;
    getScreens: () => void;
    screens:string[]
    loading:boolean
}

const GameCard: React.FC<GameCardProps> = ({ game, getScreens, screens,loading }) => {
    const [isHovering, setIsHovering] = useState(false);
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
       
             <div className="game-card-title">
                 <h3>{game.title}</h3>
             </div>
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
         <img className='modal-img' src={modalImage} alt="Expanded screenshot" style={{ width: '100%', height: 'auto' }}    />
          </Modal >
                 </>
                
            ) : (
                     <img src={game.coverImage} alt={game.title} />
            )}
             <p>Users Rating: {game.rating} {game.metacritic ? `Metacritic: ${game.metacritic}` : ''}</p>
           
            <p>Platforms: {game.platforms.join(', ')}</p>
            {game.multiplayerInfo.online && (
                <p>Online Multiplayer: Up to {game.multiplayerInfo.maxPlayers} players</p>
            )}
        
         </Card>
    );
};

export default React.memo(GameCard);