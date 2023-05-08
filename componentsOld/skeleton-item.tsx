import React from "react"
import ContentLoader from "react-content-loader"

export const SkeletonItem = () => (
  <ContentLoader 
    speed={1}
    width={1200}
    height={345}
    viewBox="0 0 1200 345"
    backgroundColor="#bdb7b7"
    foregroundColor="#ffffff"
  >
    <rect x="0" y="0" rx="0" ry="0" width="230" height="320" /> 
    <rect x="241" y="0" rx="0" ry="0" width="250" height="22" /> 
    <rect x="241" y="33" rx="0" ry="0" width="170" height="20" /> 
    <rect x="241" y="68" rx="0" ry="0" width="140" height="19" /> 
    <rect x="241" y="101" rx="0" ry="0" width="140" height="23" /> 
    <rect x="241" y="142" rx="0" ry="0" width="140" height="20" /> 
    <rect x="241" y="181" rx="0" ry="0" width="100" height="22" /> 
    <rect x="361" y="181" rx="0" ry="0" width="100" height="22" /> 
    <rect x="481" y="181" rx="0" ry="0" width="100" height="22" />
    <rect x="601" y="181" rx="0" ry="0" width="100" height="22" />
    <rect x="241" y="216" rx="0" ry="0" width="123" height="23" /> 
    <rect x="241" y="238" rx="0" ry="0" width="950" height="82" />
  </ContentLoader>
)