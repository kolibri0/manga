import React from "react"
import ContentLoader from "react-content-loader"


export const Skeleton = () => (
  <ContentLoader 
    speed={2.3}
    width={365}
    height={200}
    viewBox="0 0 360 196"
    backgroundColor="#bdb7b7"
    foregroundColor="#ffffff"
  >
    <rect x="145" y="10" rx="0" ry="" width="194" height="25" /> 
    <rect x="145" y="43" rx="0" ry="" width="194" height="22" /> 
    <rect x="145" y="75" rx="0" ry="" width="84" height="21" /> 
    <rect x="145" y="108" rx="0" ry="" width="84" height="19" /> 
    <rect x="145" y="135" rx="0" ry="" width="110" height="22" /> 
    <rect x="145" y="168" rx="0" ry="" width="117" height="20" /> 
    <rect x="0" y="7" rx="10" ry="2" width="140" height="200" />
  </ContentLoader>
)