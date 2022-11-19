import React from "react"
import ContentLoader from "react-content-loader"

export const SkeletonCharacters = () => (
  <ContentLoader 
    speed={2}
    width={200}
    height={315}
    viewBox="0 0 200 315"
    backgroundColor="#bdb7b7"
    foregroundColor="#ffffff"
  >
    {/* <rect x="229" y="0" rx="0" ry="0" width="250" height="22" /> 
    <rect x="229" y="33" rx="0" ry="0" width="138" height="20" /> 
    <rect x="229" y="68" rx="0" ry="0" width="174" height="19" /> 
    <rect x="229" y="101" rx="0" ry="0" width="190" height="23" /> 
    <rect x="229" y="142" rx="0" ry="0" width="190" height="20" /> 
    <rect x="229" y="181" rx="0" ry="0" width="370" height="22" /> 
    <rect x="229" y="216" rx="0" ry="0" width="123" height="23" /> 
    <rect x="229" y="238" rx="0" ry="0" width="363" height="82" />  */}
    <rect x="0" y="0" rx="0" ry="0" width="197" height="310" />
  </ContentLoader>
)
