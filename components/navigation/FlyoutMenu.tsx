import React from 'react';

import type { MenuItem } from './MenuBlocks';
import MenuBlocks from './MenuBlocks';

interface FlyoutProps {
  items?: MenuItem[];
  'data-testid'?: string;
}

/**
 * @description Component representing a flyout menu.
 * @param {MenuItem[]} [props.items=[]] - The list of items to be displayed in the flyout menu.
 */
export default function Flyout({ items = [], 'data-testid': testId }: FlyoutProps) {
  return (
    <div
      className='absolute z-50 -ml-4 w-screen max-w-md pt-3 md:ml-12 md:-translate-x-1/2 lg:left-1/2 lg:max-w-3xl lg:-translate-x-1/2'
      data-testid={testId ? `${testId}-Flyout` : 'Flyout'}
    >
      <div className='rounded-lg shadow-lg'>
        <div className='shadow-xs overflow-hidden rounded-lg'>
          <div className='relative z-20 grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2'>
            <MenuBlocks items={items} data-testid={testId ? `${testId}-MenuBlocks` : 'MenuBlocks'} />
          </div>
        </div>
      </div>
    </div>
  );
}
