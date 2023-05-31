import useScene from '@/store/scene/useSceneState';
import { MainMenu } from '@/components/canvas/scenes/mainMenu/MainMenu';
import { Loading } from '@/components/canvas/scenes/loading/Loading';
import { Match } from '@/components/canvas/scenes/match/Match';
import { SceneLights } from '@/components/canvas/organisms/sceneLights/SceneLights';
import { useControls } from 'leva';
import { GameOver } from '@/components/canvas/scenes/gameOver/GameOver';
import { SCENE } from '@/store/scene/types';

export const SceneManager = () => {
  const { scene, updateScene } = useScene();

  const gameScreenComponents: { [index: string]: any } = {
    [SCENE.GAME_OVER]: GameOver,
    [SCENE.LOADING]: Loading,
    [SCENE.MAIN_MENU]: MainMenu,
    [SCENE.MATCH]: Match,
  };

  const Component = gameScreenComponents[scene];

  // Debug
  useControls('Scene', {
    scene: {
      value: scene,
      options: Object.values(SCENE),
      onChange: (scene: keyof typeof SCENE) => updateScene(scene),
    },
  });

  return <>
    <SceneLights/>
    <Component/>
  </>;
};
