import React, {useEffect, useRef, useState} from 'react';
import {Button, Div} from "@vkontakte/vkui";
import {DJWS} from "./websocket";

const DjPanel: React.FunctionComponent = () => {
  const session = useRef<string>();
  const ws = useRef<DJWS>();
  const [state, setState] = useState([false, false, false, false, false, false, false, false]);
  useEffect(() => {
    session.current = (Math.random() + 1).toString(36).substring(2);
    ws.current = new DJWS();
    setTimeout(() => {
      // @ts-ignore
      ws.current?.join(session.current);
      ws.current?.sendRhythm(state);
    }, 300);
    // @ts-ignore
    new QRCode(document.getElementById("qrcode"), 'djsess:' + session.current);
  }, []);
  return (
    <div className={'container'}>
      <div className={'row'}>
        {state.map((_, idx) => <Button key={idx} onClick={() => {
          const s = [...state];
          s[idx] = !s[idx];
          setState(s);
          ws.current?.sendRhythm(s);
        }} style={{backgroundColor: state[idx] ? 'red' : 'green'}}>{idx}</Button>)}
      </div>
      <h3>QR-код для подключения</h3>
      <div id={'qrcode'} />
    </div>
  );
};

export default DjPanel;
