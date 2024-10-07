'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import CallSheet from '@/domains/agent/CallSheets/CallSheet';

const CallSheetPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <CallSheet agentId={id.toString()} />
    </div>
  );
};

export default CallSheetPage;
