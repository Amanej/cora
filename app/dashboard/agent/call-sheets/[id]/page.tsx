'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Callsheets from '@/domains/callsheets/pages/Callsheets';

const CallSheetsPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <Callsheets agentId={id.toString()} />
    </div>
  );
};

export default CallSheetsPage;
