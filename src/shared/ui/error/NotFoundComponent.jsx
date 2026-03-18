/**
 * 404 Not Found Component
 * User-friendly 404 page with navigation suggestions
 */

import { NOT_FOUND_MSG, NOT_FOUND_CTA, NOT_FOUND_SUGGESTIONS } from './error.constant';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';

export default function NotFoundComponent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-125px)] px-4 py-12">
            <div className="mb-6">
                <Icon name="search" size={80} className="text-gray-300" />
            </div>

            <h1 className="text-8xl font-bold text-gray-200 mb-2">
                {NOT_FOUND_MSG.TITLE}
            </h1>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {NOT_FOUND_MSG.HEADING}
            </h2>

            <p className="text-lg text-gray-600 text-center max-w-md mb-8">
                {NOT_FOUND_MSG.DESCRIPTION}
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
                <Button
                    as="a"
                    href={NOT_FOUND_CTA.PRIMARY_HREF}
                    variant="solid"
                    color="primary"
                    size="lg"
                    radius="md"
                >
                    {NOT_FOUND_CTA.PRIMARY}
                </Button>
                <Button
                    as="a"
                    href={NOT_FOUND_CTA.SECONDARY_HREF}
                    variant="outline"
                    color="primary"
                    size="lg"
                    radius="md"
                >
                    {NOT_FOUND_CTA.SECONDARY}
                </Button>
            </div>

            <div className="w-full max-w-2xl">
                <h3 className="text-sm font-semibold text-gray-700 text-center mb-4">
                    Or try one of these helpful links:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {NOT_FOUND_SUGGESTIONS.map((suggestion, index) => (
                        <a
                            key={index}
                            href={suggestion.href}
                            className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                        >
                            <Icon
                                name={suggestion.icon}
                                size={24}
                                className="text-gray-400 group-hover:text-primary-600 transition-colors mb-2"
                            />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                                {suggestion.label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

