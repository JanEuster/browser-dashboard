import { GameController } from 'phosphor-react'
import React, { ReactElement } from 'react'
import { LinkApp } from '../common'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { HStack, SpacerV } from '../../common'

const GameImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;

  position: relative;
  // box-sizing: content-box;
  &:hover {
  }
  
  &:hover {
    background-color: var(--four);
    opacity: 50%;
    border: 3px solid var(--three);

  }
`
const GameItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Link href={"games/" + name}>
      <a>
        <GameImageContainer>
          <Image src={`/games/game-${name}.png`} width={80} height={80} alt="" />
        </GameImageContainer>
      </a>
    </Link>
  )
}

const GameLinksApp: React.FC<{}> = ({ }) => {
  let games = [
    <GameItem key="snake" name="snake" />,
    <GameItem key="pong" name="pong" />,
    <GameItem key="tictactoe" name="tictactoe" />,
    <GameItem key="chess" name="chess" />
  ];

  let content: ReactElement[] = [];
  for (let i = 0; i < games.length; i += 2) {
    content.push(
      <>
        <HStack style={{ justifyContent: "space-evenly" }}>
          {games[i]}
          {games[i + 1]}
        </HStack>
        <SpacerV />
      </>
    )
  }

  return (
    <LinkApp icon={<GameController size={24} weight="bold" />} title="Games">
      {content.map(i => { return i })}
    </LinkApp >
  )
}

export default GameLinksApp