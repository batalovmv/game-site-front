import  {  useState } from 'react';
import { Carousel, Image, Spin} from 'antd';
import { Game } from '../../features/games/types';
interface ImageCarouselProps {
    game:Game
    isHoveringImage:boolean
}
const ImageCarousel = ({ game, isHoveringImage  }: ImageCarouselProps) => {
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [currentIndex, setСurrentIndex] = useState(0)
    const handleImageLoad = () => {
        setLoadedImagesCount(prevCount => prevCount + 1);

    };
    console.log(`render ImageCarousel`);
    if (isHoveringImage && game.screens.length > 0) {
        return <>
            <Spin spinning={loadedImagesCount < game.screens.length}>
                <Image.PreviewGroup preview={{ 
                     current: currentIndex,
                     onChange:  setСurrentIndex,
               
                    
                }} items={game.screens.map(e => e.full)} >
                    <Carousel dots={true} beforeChange={(_, next) => setСurrentIndex(next)} >
                        {game.screens.map((screen, index) => (
                            <Image
                                key={screen.full}
                                src={screen.thumb}
                                width={'100%'}
                                alt={`Screenshot ${index + 1}`}
                                onLoad={handleImageLoad}
                                onClick={() => { setСurrentIndex(index)}}
                                
                             
                            />
                        ))}
                  
                    </Carousel>
                </Image.PreviewGroup>
            </Spin>
           
        </>
    
    }else{
        return <Image src={game.thumb}
            
              />
    }
   
};

export default ImageCarousel;