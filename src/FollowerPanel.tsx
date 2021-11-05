import React, {useEffect, useState} from 'react';
import bridge from "@vkontakte/vk-bridge";
import {FollowerWS} from "./websocket";

const FollowerPanel: React.FunctionComponent = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    bridge.send('VKWebAppOpenCodeReader').then(value => {
      if (!value.code_data.startsWith('djsess:')) {
        setError('Неверный QR код!');
      } else {
        const room = value.code_data.substring(7);
        const ws = new FollowerWS();
        setTimeout(() => {
          ws.join(room);
          ws.onPulse = pulse => bridge.send("VKWebAppFlashSetLevel", {"level": pulse ? 1 : 0});
        }, 300);
      }
    });
    return () => {
      bridge.send("VKWebAppFlashSetLevel", {"level": 0});
    }
  }, []);
  return (
    <div className={'container'}>
      {error ? <h3>{error}</h3> : <h3>Following!</h3>}
    </div>
  );
};

export default FollowerPanel;
