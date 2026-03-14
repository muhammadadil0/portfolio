'use client';

import LoadingScreen from './ui/loading-screen';

export default function LoadingWrapper({ children }) {
    return (
        <>
            <LoadingScreen />
            {children}
        </>
    );
}

