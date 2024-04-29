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

    const handleImageLoad = () => {
        setLoadedImagesCount(prevCount => prevCount + 1);
    };
    const getFullImages =()=>{
        const fulls = screens.map(screen => screen.full)
        console.log(`fulls`, fulls);
        return fulls
    }
    console.log(`screens`, screens);
     if (isHoveringImage && screens.length>0) {
        return <>
            <Image.PreviewGroup items={getFullImages()}>
                <Carousel autoplay draggable dots={true} style={{ display: loadedImagesCount >= screens.length ? 'block' : 'none' }}>
                    {screens.map((screen, index) => (
                        <Image
                            key={index}
                            src={screen.thumb}
                            width={'100%'}
                            alt={`Screenshot ${index + 1}`}
                            onLoad={() => handleImageLoad()}

                        />
                    ))}
                </Carousel>
                <Spin style={{ display: loadedImagesCount < screens.length ? 'block' : 'none' }} >
                    <Image style={{ display: loadedImagesCount < screens.length ? 'block' : 'none' }} src={game.coverImage} />


                </Spin>
                
            </Image.PreviewGroup>
        </>
     } else if (isHoveringImage){
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