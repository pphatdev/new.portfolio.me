'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Suspense } from 'react';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Suspense fallback={null}>
                <ProgressBar
                    height="4px"
                    color="#fffd00"
                    options={{ showSpinner: false }}
                    shallowRouting
                />
            </Suspense>
        </>
    );
};

export default ProgressBarProvider;