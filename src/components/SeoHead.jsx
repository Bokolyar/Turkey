import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SeoHead({ data }) {
    const title = data?.title || 'Turkey Journey 2026 — Идеальный семейный отдых в Турции';
    const description = data?.description || 'Проектируем отдых для вашей семьи. Только проверенные отели Белека, Сиде и Кемера. Честные цены и экспертная поддержка 24/7.';
    const keywords = data?.keywords || 'отдых в турции, семейные отели турции, подбор тура, белек, сиде, кемер, отдых с детьми';
    const image = data?.ogImage || 'https://turkey-journey.ae/og-image.jpg'; // Path to a default OG image

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Canonical Link */}
            <link rel="canonical" href="https://turkey-journey.ae/" />
        </Helmet>
    );
}
