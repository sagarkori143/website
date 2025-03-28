import React from 'react';

import { buckets } from '../data/buckets';
import FlyoutMenu from './FlyoutMenu';

interface LearningPanelProps {
  'data-testid'?:string;
}

/**
 * @description Component representing the learning panel.
 */
export default function LearningPanel({ 'data-testid': testId }: LearningPanelProps) {
  return <FlyoutMenu items={buckets} data-testid={testId ? `${testId}-FlyoutMenu` : 'FlyoutMenu'} />;
}
