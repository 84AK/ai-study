'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Use lazy loading for Spline to avoid blocking the client-side render
// and specify the standard import which is robust for Client Components
const Spline = lazy(() => import('@splinetool/react-spline'));

export default function HeroSpline() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
                width: '100%',
                height: '650px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        >
            <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
                <Spline
                    scene="https://prod.spline.design/TZeviTtLQup0aD9c/scene.splinecode"
                />
            </Suspense>
        </motion.div>
    );
}
