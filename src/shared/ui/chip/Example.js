//example for chip component
"use client";
import React, { useState } from 'react';
import Chip from './Chip';
import { CHIP_DATA } from './mock.data';

export default function ChipExample() {
    return (
        <div className="p-8 space-y-12 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Chip Examples
            </h1>
            <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Basic Chips
                </h2>
                <div className="flex flex-wrap gap-3">
                    {CHIP_DATA.map((item) => (
                        <Chip key={item.value} label={item.label} value={item.value} />
                    ))}
                </div>
            </div>
        </div>
    );
}