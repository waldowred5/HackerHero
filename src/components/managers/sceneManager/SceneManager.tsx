import React from 'react';
import useScene, { SCENE } from './useSceneState';
import { MainMenu } from '../../canvas/scenes/mainMenu/MainMenu';
import { Loading } from '../../canvas/scenes/loading/Loading';
import { Match } from '../../canvas/scenes/match/Match';
import { SceneLights } from '../../canvas/organisms/sceneLights/SceneLights';
import { useControls } from 'leva';
import { GameOver } from '../../canvas/scenes/gameOver/GameOver';

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
