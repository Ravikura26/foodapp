import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';  
import MapViewDirections from 'react-native-maps-directions';

const MapComponent = () => {
    const [state, setState] = useState({
        pickupCords:{
            latitude:30.7046,
            longitude:76.7179
        },
        dropCords:{
            latitude:28.6139,
            longitude:77.2090
        }
    });


    const {pickupCords,dropCords} = state; 
  return (
    <View style={styles.container}> 
      <MapView
        style={styles.map}
        initialRegion={pickupCords}
        
      >
        <MapViewDirections
    origin={pickupCords}
    destination={dropCords}  />
    </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  map: {
    width: Dimensions.get('window').width * 0.9, // 90% of the screen width
    height: 300, // Fixed height for the map
    borderRadius: 10, // Rounded corners for the map
    borderColor: '#ddd', // Light gray border
    borderWidth: 1, // Border width
  },
});

export default MapComponent;
