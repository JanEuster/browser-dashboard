import React from "react"
import styled from "styled-components"

export const WeatherHeader = styled.div`
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-left: 1rem;
  margin-right: 1rem;
`

export const TempText = styled.h2`
  font-size: 2.5rem;
`
export const TempMinMax = styled.div`
  font-size: 1.5rem;
  font-family: Roboto;
  font-weight: 400;
  margin: 0.3rem 0.7rem 0.3rem 0rem;

  display: flex;
  align-items: center;
`
export const TempMinMaxText = styled.div`
  margin: 0 0.3rem;
`

// export const ConditionDesc = styled.p`
//   margin: 0.2rem;
// `
export const ConditionDesc = styled.p`
  margin: 0;
  font-size: 1rem;
  background-color: var(--one);
  margin-bottom: 0.5rem;
`

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`

export const InfoBox = styled.div`
  background-color: var(--three);
  width: 90%;
  height: 90%;
  margin-left: auto;
  margin-right: auto;
  // margin-bottom: 1rem;

  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  overflow: hidden;
`

export const InfoBoxRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0.55rem;
`

export const InfoBoxElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;

  & p{
    padding: 0 0.4rem;
  }
`

export const LocationTextWrapper = styled.div`
  width: 90%;
  display: inline-block;
  position: relative;

  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  `
export const LocationText = styled.pre`
  background-color: var(--two);
  font-size: 0.7rem;
  font-family: Roboto mono;
  font-weight: 500;
  position: absolute;
  white-space: nowrap;
  margin: 0;
  top: 0;
  right: 0;
  padding: 0.1rem 0.35rem;
`