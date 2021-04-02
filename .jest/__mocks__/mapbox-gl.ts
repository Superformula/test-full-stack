const Map = jest.fn(() => ({
  setCenter: jest.fn(),
  fitBounds: jest.fn(),
  setZoom: jest.fn()
}))

const Marker = jest.fn(() => ({
  setLngLat: jest.fn(() => ({ addTo: jest.fn() }))
}))

export default { Map, Marker }
