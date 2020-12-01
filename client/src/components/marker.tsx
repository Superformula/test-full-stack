import React from 'react';
import styles from './marker.module.css';

interface Props {
  lat: number,
  lng: number,
}

function Marker(props: Props) {
  return (
    <>
      <div className={styles.pin}></div>
      <div className={styles.pulse}></div>
    </>
  );
}

export default Marker;
