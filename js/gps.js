/**
 * Geolocation Distance Processing Engine Node Core Framework
 * Uses the Haversine formula to validate mathematical spatial bounds.
 */

export const SpatialTelemetryEngine = {
  calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Absolute linear spatial distance offset displacement metric index gauge length interval in meters units scalar values
  },

  getCurrentLocationCoordinates() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Telemetry receiver services geolocation hardware modules infrastructure are absent or disabled."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let errorMessage = "Spatial capture tracking pipeline system failed to initialize coordinate extraction operations.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User explicitly denied infrastructure geolocation sharing handshake access permissions profiles context.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Network topology layout unable to triangulate hardware sensor tracking position vectors correctly.";
              break;
            case error.TIMEOUT:
              errorMessage = "Telemetry capture hardware framework monitoring connection timeout limit reached.";
              break;
          }
          reject(new Error(errorMessage));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  }
};