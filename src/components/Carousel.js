"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';

const Carousel = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;

    const animate = () => {
      container.scrollLeft += 1;

      if (container.scrollLeft + container.clientWidth === container.scrollWidth) {
        container.scrollLeft -= container.clientWidth;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.imageContainer}>
               <Image src="/carousel/foto1.jpg" alt="Unha 1" width={300} height={300} />
        
                  <Image src="/carousel/foto2.jpg" alt="Unha 2" width={300} height={300} />
        
                  <Image src="/carousel/foto3.jpg" alt="Unha 3" width={300} height={300} />
        
                  <Image src="/carousel/foto4.jpg" alt="Unha 4" width={300} height={300} />
        
                  <Image src="/carousel/foto5.jpg" alt="Unha 5" width={300} height={300} />
        
                  <Image src="/carousel/foto6.jpg" alt="Unha 6" width={300} height={300} />
        
                  <Image src="/carousel/foto7.jpg" alt="Unha 7" width={300} height={300} />
        
                  <Image src="/carousel/foto8.jpg" alt="Unha 8" width={300} height={300} />
        
    </div>
  );
};

export default Carousel;