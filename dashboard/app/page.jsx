'use client';

import Header from '@/components/header/Header';
import TeamRadioPlayer from '@/components/teamRadio/TeamRadio';
import { WebSocketProvider } from '@/context/WebSocketContext';
import { centerDiv } from '@/style/style';
import Menu from '@/components/menu/Menu';
import { useState } from 'react';
import { ActiveViewType } from '@/utils/activeViewType';
import Intervals from '@/components/intervals/Intervals';
import Positions from '@/components/positions/Positions';

export default function Home() {
  const [activeView, setActiveView] = useState(ActiveViewType.INTERVALS);

  const renderView = () => {
    switch (activeView) {
      case ActiveViewType.INTERVALS:
        return <Intervals />;

      case ActiveViewType.POSITIONS:
        return <Positions />;

      case ActiveViewType.TEAM_RADIO:
        return <TeamRadioPlayer />;
    }
  };

  return (
    <WebSocketProvider>
      <div className={centerDiv}>
        <Header />
        <Menu
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <div>{renderView()}</div>
      </div>
    </WebSocketProvider>
  );
}
