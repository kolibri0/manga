import React from "react"
import ContentLoader from "react-content-loader"


export const Skeleton = () => (
  <ContentLoader 
    speed={2.3}
    width={365}
    height={270}
    viewBox="0 0 360 250"
    backgroundColor="#bdb7b7"
    foregroundColor="#ffffff"
  >
    <rect x="173" y="10" rx="0" ry="" width="180" height="22" /> 
    <rect x="173" y="43" rx="0" ry="" width="180" height="22" /> 
    <rect x="173" y="75" rx="0" ry="" width="84" height="22" /> 
    <rect x="173" y="108" rx="0" ry="" width="84" height="19" /> 
    <rect x="173" y="135" rx="0" ry="" width="110" height="22" /> 
    <rect x="173" y="168" rx="0" ry="" width="117" height="20" /> 
    <rect x="0" y="7" rx="10" ry="2" width="165" height="270" />
  </ContentLoader>
)