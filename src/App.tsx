import {Root, View, Panel, Group, CellButton} from "@vkontakte/vkui";
import {useState} from "react";
import DjPanel from "./DjPanel";
import FollowerPanel from "./FollowerPanel";

function App() {
  const [view, setView] = useState('main');
  return <Root activeView={view}>
    <View activePanel={'main'} id={'main'}>
      <Panel id={'main'}>
        <Group>
          <h3>Режим работы</h3>
          <CellButton onClick={() => setView('dj')}>DJ</CellButton>
          <CellButton onClick={() => setView('follower')}>Follower</CellButton>
        </Group>
      </Panel>
    </View>
    <View activePanel={'dj'} id={'dj'}>
      <Panel id={'dj'}>
        <DjPanel />
      </Panel>
    </View>
    <View activePanel={'follower'} id={'follower'}>
      <Panel id={'follower'}>
        <FollowerPanel />
      </Panel>
    </View>
  </Root>
}

export default App;
