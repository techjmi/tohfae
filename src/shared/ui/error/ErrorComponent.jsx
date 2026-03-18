/**
 * Error fallback component shown when ErrorBoundary catches an error
 */

import { ERROR_MSG, ERROR_CTA } from './error.constant';
import Button from '@/shared/ui/button/Button';

export default function ErrorComponent() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-125px)]">
            <h1 className="text-3xl font-bold mb-4">{ERROR_MSG.DEFAULT_ERROR_MSG}</h1>
            <p className="text-lg mb-8">{ERROR_MSG.DEFAULT_ERROR_DESCRIPTION}</p>
            <Button
                as="a"
                href={ERROR_CTA.DEFAULT_ERROR_CTA_HREF}
                variant="solid"
                color="primary"
                size="lg"
                radius="md"
            >
                {ERROR_CTA.DEFAULT_ERROR_CTA}
            </Button>
        </div>
    );
}