import React, { useState } from 'react';
import styles from '../../styles/FeatureCarousel.module.css';
import SlideSwitch from './FeatureCarousel/SlideSwitch';

interface Feature {
  image: string;
  title: string;
  description: string;
  alt: string;
}

const features: Feature[] = [
  {
    image:
      'https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg',
    title: 'Get a link that you can share',
    description:
      'Click New meeting to get a link that you can send to people that you want to meet with',
    alt: 'Get a link that you can share',
  },
  {
    image:
      'https://www.gstatic.com/meet/user_edu_brady_bunch_light_81fa864771e5c1dd6c75abe020c61345.svg',
    title: 'See everyone together',
    description:
      'To see more people at the same time, go to Change layout in the More options menu',
    alt: 'See everyone together',
  },
  {
    image:
      'https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg',
    title: 'Your meeting is safe',
    description:
      'No one outside your organisation can join a meeting unless invited or admitted by the host',
    alt: 'Your meeting is safe',
  },
];

export default function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? features.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === features.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slides} >
        <div className={styles.navigationButton} style={{ marginLeft: '220px',  paddingBottom: '140px'  }}>
          <button className={styles.navButton} style={{backgroundColor: 'transparent'}} onClick={goToPrevious} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
            </svg>
          </button>
        </div>
        <div
          className={styles.slide}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {features.map((feature, index) => (
            <div key={index} className={styles.slideContent} aria-live="polite">
              <div className={styles.imageContainer}>
                <img
                  src={feature.image}
                  alt={feature.alt}
                  className={styles.featureImage}
                  loading="lazy"
                  role="img"
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.title}>{feature.title}</h2>
                <div className={styles.description}>{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.navigationButton} style={{ marginRight: '220px', paddingBottom: '140px' }}>
          <button className={styles.navButton} style={{backgroundColor: 'transparent'}} onClick={goToNext} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {features.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
