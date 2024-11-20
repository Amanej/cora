'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import CreateCallsheet from "@/domains/callsheets/pages/CreateCallsheet";

const CallSheetPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <CreateCallsheet agentId={id.toString()} />
    </div>
  );
};

export default CallSheetPage;
