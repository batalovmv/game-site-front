import React, { useState } from 'react';
import './style.css';
import { Card, Carousel, Modal, Spin } from 'antd';
import { Game } from '../../features/games/types';



interface GameCardProps {
    game: Game;
    getScreens: () => void;
    screens:string[]
    loading:boolean
}

const GameCard: React.FC<GameCardProps> = ({ game, getScreens, screens,loading }) => {
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    
    const handleMouseEnter = () => {
        getScreens();
        setIsHoveringImage(true);
    };

    const handleMouseLeave = () => {
        setIsHoveringImage(false);
        setIsHoveringCard(false);
    };
    const handleAddInfo = () => {
        setIsHoveringCard(true);

    };
    const showModal = (image:string) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <Card
            className="game-card"
            loading={loading}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleAddInfo}
            cover={
                loading ? (
                    <div className="game-card-loading">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                            {isHoveringImage && screens?.length ? (
                            <Carousel autoplay>
                                {screens.map((screen, index) => (
                                    <div key={index} onClick={() => showModal(screen)}>
                                        <img src={screen} alt={`Screenshot ${index + 1}`} />
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <img
                                src={game.coverImage}
                                alt={game.title}
                                onMouseEnter={handleMouseEnter}
                            />
                        )}
                    </>
                )
            }
        >
            <Modal
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                width={'80%'}
                centered
            >
                <img className="modal-img" src={modalImage} alt="Expanded screenshot" style={{ width: '100%', height: 'auto' }} />
            </Modal>
            <div className="game-card-title">
                <h3>{game.title}</h3>
            </div>
            <p>Users Rating: {game.rating} {game.metacritic ? `Metacritic: ${game.metacritic}` : ''}</p>
            <p>Platforms: {game.platforms.join(', ')}</p>
            {/*isHoveringCard && <p>Genres: {game.genres.join(', ')}</p>*/} 
        </Card>
    );
};
export default React.memo(GameCard);