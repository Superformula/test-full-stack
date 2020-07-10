const initializeGoogleMap = () => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
};

export default initializeGoogleMap;
