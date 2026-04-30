import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Fix for Leaflet default icon issues in React
import markerIcon from '../assets/map/marker-icon.png';
import markerShadow from '../assets/map/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle map view updates
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export function MapBlock({ data }) {
    const hotels = data?.hotels || [
        { name: 'Crystal Family Resort', lat: 36.8436, lng: 31.0664, desc: 'Белек — Идеально для малышей' },
        { name: 'AKKA Hotels Antedon', lat: 36.6974, lng: 30.5593, desc: 'Кемер — Лучшие детские клубы' },
        { name: 'Gloria Serenity Resort', lat: 36.8407, lng: 31.1147, desc: 'Белек — Премиальный отдых' }
    ];

    const center = [36.8, 30.8]; // General Antalya region
    const zoom = 9;

    return (
        <section className="py-14 sm:py-20 md:py-24 bg-[var(--color-bg)] transition-colors duration-500 overflow-hidden relative">
            <div className="container mx-auto">
                <div className="text-center mb-8 sm:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--color-text)] mb-6"
                    >
                        Наши рекомендации на <span className="text-teal-500">карте Турции</span>
                    </motion.h2>
                    <p className="text-base sm:text-lg md:text-xl text-[var(--color-text)] opacity-60 max-w-2xl mx-auto font-medium">
                        Мы выбрали лучшие локации, где ваша семья будет чувствовать себя в безопасности и комфорте.
                    </p>
                </div>

                <div className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-[2rem] sm:rounded-[3rem] border border-[var(--color-card-border)] overflow-hidden shadow-2xl h-[260px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] relative z-0">
                    <MapContainer
                        center={center}
                        zoom={zoom}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                        className="z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <ChangeView center={center} zoom={zoom} />
                        {hotels.map((hotel, idx) => (
                            <Marker
                                key={idx}
                                position={[hotel.lat, hotel.lng]}
                                icon={customIcon}
                            >
                                <Popup>
                                    <div className="p-3">
                                        <h4 className="font-extrabold text-slate-900 text-sm mb-1 uppercase tracking-tight">{hotel.name}</h4>
                                        <p className="text-xs text-slate-600 font-bold leading-relaxed">{hotel.desc}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {hotels.map((hotel, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[var(--color-card-border)] flex items-center space-x-4 group hover:border-teal-500/30 transition-all cursor-pointer shadow-lg hover:shadow-teal-500/5"
                        >
                            <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 font-black group-hover:bg-teal-500 group-hover:text-white group-hover:rotate-12 transition-all shrink-0">
                                {idx + 1}
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-black text-[var(--color-text)] text-base mb-1 truncate">{hotel.name}</h4>
                                <p className="text-xs sm:text-sm text-[var(--color-text)] opacity-50 font-bold truncate">{hotel.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
