import React, { useState } from 'react';
import './style.css';
import { Card, Carousel, Spin } from 'antd';
import { Game } from '../../features/games/types';
import { Image } from 'antd';


interface GameCardProps {
    game: Game;
    getScreens: () => void;
    screens:string[]
    loading:boolean
}
//todo - реализовать спинер во время подгрузки скринов, сейчас это просто основная фотка, при долгой подрузке выглядит как все фотки в карусели - обычные. Нужно найти решение
const GameCard: React.FC<GameCardProps> = ({ game, getScreens, screens,loading }) => {
    const [isHoveringImage, setIsHoveringImage] = useState(false);
  
    const [loaded, setLoaded] = useState(false);

    
    const handleMouseEnter = () => {
       
        console.log(`screens`, screens);
       
        setIsHoveringImage(true);
    };

    const handleMouseLeave = () => {
        setIsHoveringImage(false);

    };
    const handleAddInfo = () => {
        if (screens.length === 0) {
            getScreens();
        }
     

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
                                <Image.PreviewGroup
                                    items={screens}
                                >
                                <Carousel autoplay draggable dots={true}>
                                {screens.map((screen, index) => (
                                   
                                        <Image key={index} src={loaded ? screen : game.coverImage} alt={`Screenshot ${index + 1}`} onLoad={() => setLoaded(true)} 
                                            
                                        />
                                    
                                ))}
                            </Carousel>
                                </Image.PreviewGroup>
                        ) : (
                                <Image
                                src={game.coverImage}
                                alt={game.title}
                                onMouseEnter={handleMouseEnter}
                            />
                        )}
                    </>
                )
            }
        >
          
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