import React, { useEffect, useState } from 'react';
import { Carousel, Image, Spin} from 'antd';
import { Game } from '../../features/games/types';
interface ImageCarouselProps {
    screens: [{full:string,thumb:string}]
    game:Game
    isHoveringImage:boolean
}
const ImageCarousel = ({ screens, game, isHoveringImage  }: ImageCarouselProps) => {
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [currentIndex, setСurrentIndex] = useState(0)
    const handleImageLoad = () => {
        setLoadedImagesCount(prevCount => prevCount + 1);
        console.log(`screens`, screens);
    };
    console.log(`screens`, screens);
    if (isHoveringImage && screens.length > 0) {
        return <>
            <Spin spinning={loadedImagesCount < screens.length}>
                <Image.PreviewGroup preview={{ 
                     current: currentIndex,
                     onChange: (current: number) => { setСurrentIndex(current) },
                       }} items={screens.map(e=>e.full)}>
                    <Carousel  dots={true} beforeChange={(_, next) => setСurrentIndex(next)} style={{ display: loadedImagesCount >= screens.length ? 'block' : 'none' }}>
                        {screens.map((screen, index) => (
                            <Image
                                key={screen.full}
                                src={screen.thumb}
                                width={'100%'}
                                alt={`Screenshot ${index + 1}`}
                                onLoad={handleImageLoad}
                             
                            />
                        ))}
                  
                    </Carousel>
                </Image.PreviewGroup>
            </Spin>
            <Image src={game.coverImage} style={{ display: 'none' }} />
        </>
    } else if (isHoveringImage) {
         return <Spin  >
             <Image  src={game.coverImage}
                 placeholder={
                     <Image
                         preview={false}
                         src={game.thumb}
                         width={200}
                     />
                 } />


         </Spin>
    }else{
         return <Image src={game.coverImage}
             placeholder={
                 <Image
                     preview={false}
                     src={game.thumb}
                     width={200}
                 />
             } />
    }
   
};

export default ImageCarousel;