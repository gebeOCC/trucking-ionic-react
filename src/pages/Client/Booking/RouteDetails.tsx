import { IonContent, IonPage } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";

import React, { useState, useEffect, useRef, step } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL CSS

mapboxgl.accessToken = 'pk.eyJ1IjoiMWJhcnJ5MTIzIiwiYSI6ImNsdmdpa2IzcjA2YzYya255dDZtb3FueHMifQ.9TtR0xoQt9Mi8B9-Gpb0MA';

import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const RouteDetails = ({ form, setForm, mapStyle, setMapStyle, selectedPrice, invalidFields, step }) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(122.9545); // Center longitude for Philippines
    const [lat, setLat] = useState(12.8797); // Center latitude for Philippines
    const [zoom, setZoom] = useState(4); // Zoom level for Philippines
    const [pickup, setPickup] = useState([form.pickup_location_lng, form.pickup_location_lat]);
    const [dropoff, setDropoff] = useState([form.dropoff_location_lng, form.dropoff_location_lat]);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState('');

    const calculatedPrice = 0.10 * selectedPrice * distance + selectedPrice;

    const setPrice = () => {
        for (let i = 0; i < 20; i++) {
            if (distance !== 0) {
                const timer = setTimeout(() => {
                    setForm({
                        ...form,
                        price: calculatedPrice
                    });
                },500);
                return () => clearTimeout(timer)
            }
        }
    }

    useEffect(() => {
        setPrice()
    }, [distance, duration]);

    useEffect(() => {
        setPrice()
    }, []);

    useEffect(() => {
        // Initialize map when component mounts
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: [lng, lat],
            zoom: zoom,
            maxBounds: [
                [116.95, 4.6],
                [127.3, 21.7]
            ]
        });
        map.current.addControl(new mapboxgl.NavigationControl());

        // Update map coordinates on move
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(zoom));
        });
        addMarkers();
        getRoute(); // Call getRoute after addMarkers

        // Clean up map instance when component unmounts
        return () => {
            if (map.current) {
                map.current.remove(); // Remove map instance
            }
        };
    }, [mapStyle]);

    useEffect(() => {
        getRoute();
    }, [pickup, dropoff]);

    useEffect(() => {
        getRoute();
    }, []);

    const getRoute = () => {
        console.log('Getting route...');
        console.log('Pickup:', pickup);
        console.log('Dropoff:', dropoff);

        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
            controls: {
                instructions: false,
                inputs: false,
                distance: false, // Add this line to include the distance
            },
            interactive: false,
        });

        console.log('Adding directions control...');
        map.current.addControl(directions, 'top-right');

        // Set origin and destination
        directions.setOrigin(pickup);
        directions.setDestination(dropoff);

        directions.on('route', (event) => {
            const route = event.route[0]; // Assuming you only have one route
            const distanceMeters = route.distance;
            const durationSeconds = route.duration;

            const distanceKilometers = metersToKilometers(distanceMeters);
            const durationMinutes = secondsToMinutes(durationSeconds);

            console.log('Distance:', distanceKilometers + ' km');
            console.log('Duration:', durationMinutes + ' min');

            setForm({
                ...form,
                distance: distanceKilometers,
                duration: durationMinutes
            })

            setDistance(distanceKilometers);
            setDuration(durationMinutes);
        });
    };

    // Function to convert meters to kilometers
    function metersToKilometers(meters) {
        return Math.ceil(meters / 1000).toFixed(1);
    }

    // Function to convert seconds to minutes
    function secondsToMinutes(seconds) {
        return Math.round(seconds / 60); // Round to nearest minute
    }

    const addMarkers = () => {
        // Create Marker instances and add them to the map
        const pickupMarker = new mapboxgl.Marker({ draggable: true, color: 'cyan' })
            .setLngLat(pickup)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3 style="color: blue;">From</h3>`))
            .addTo(map.current);

        const dropoffMarker = new mapboxgl.Marker({ draggable: true, color: 'orange' })
            .setLngLat(dropoff)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3 style="color: blue;">To</h3>`))
            .addTo(map.current);

        // Add dragend event listeners to update marker positions
        pickupMarker.on('dragend', () => {
            const lngLat = pickupMarker.getLngLat();
            setForm({
                ...form,
                pickup_location_lng: lngLat.lng,
                pickup_location_lat: lngLat.lat,
            })
            setPickup([lngLat.lng, lngLat.lat]); // Update pickup state
            updateMapBounds(); // Update map bounds whenever pickup marker is dragged
        });

        dropoffMarker.on('dragend', () => {
            const lngLat = dropoffMarker.getLngLat();
            setForm({
                ...form,
                dropoff_location_lng: lngLat.lng,
                dropoff_location_lat: lngLat.lat,
            })
            setDropoff([lngLat.lng, lngLat.lat]); // Update dropoff state
            updateMapBounds(); // Update map bounds whenever dropoff marker is dragged
        });

        // Function to update map bounds based on current pickup and dropoff locations
        const updateMapBounds = () => {
            const bounds = new mapboxgl.LngLatBounds();
            bounds.extend(pickup);
            bounds.extend(dropoff);

            // Fit map to the bounding box containing both pickup and dropoff locations
            map.current.fitBounds(bounds, {
                padding: { top: 50, bottom: 50, left: 50, right: 50 }, // Adjust padding as needed
                maxZoom: 11, // Adjust max zoom level as desired
                essential: true // This ensures smooth animation
            });
        };

        // Initially center and fit map to both pickup and dropoff locations
        updateMapBounds();
        // getRoute();
    };


    const handleMapStyleChange = (style) => {
        setMapStyle(style);
    };

    return (
        <div style={{ height: '93%', width: '100%', position: 'absolute' }}>
            <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
            <div
                style={{
                    position: 'fixed', top: '8%', left: '2%', backgroundColor: 'rgba(29, 78, 216, 0.2)',
                    color: 'white',
                    padding: '12px',
                    fontFamily: 'monospace',
                    borderRadius: '8px',
                }}>

                <button style={{
                    backgroundColor: `${mapStyle === 'mapbox://styles/1barry123/clvi2k5vd00an01ob3n2e2qmu' ? 'rgba(59, 130, 246)' : 'rgba(59, 130, 246, 0.2)'}`,
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    marginRight: '8px',
                    border: '1px solid rgba(59, 130, 246, 0.9)'
                }} onClick={() => handleMapStyleChange('mapbox://styles/1barry123/clvi2k5vd00an01ob3n2e2qmu')}>
                    Street
                </button>
                <button style={{
                    backgroundColor: `${mapStyle === 'mapbox://styles/1barry123/clvi1sfb2013x01q1bgcx7zy7' ? 'rgba(59, 130, 246)' : 'rgba(59, 130, 246, 0.2)'}`,
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    marginRight: '8px',
                    border: '1px solid rgba(59, 130, 246, 0.9)'
                }} onClick={() => handleMapStyleChange('mapbox://styles/1barry123/clvi1sfb2013x01q1bgcx7zy7')}>
                    Satellite
                </button>
                <div>
                    <p>Distance: {distance} km</p>
                    <p>Duration: {duration} min</p>
                    <p>Price: ₱{calculatedPrice}</p>
                </div>
            </div>
            <h1
                style={{
                    position: 'fixed',
                    top: '7%',
                    right: '12%',
                    fontFamily: 'monospace',
                    margin: '0',
                }}>
                {step}/6
            </h1>
        </div>
    );
}

export default RouteDetails;