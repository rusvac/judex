import React from 'react'
import Blockies from 'react-blockies'

const WalletAvatar = (props) => (
    <Blockies
      seed={props.seed}
      size={5}
      scale={13}
    />
)

export default WalletAvatar

  /*
    seed={props.seed} {/* the only required prop; determines how the image is generated 
    size={10} {/* number of squares wide/tall the image will be; default = 15 
    scale={3} {/* width/height of each square in pixels; default = 4 
    color="#dfe" {/* normal color; random by default 
    bgColor="#ffe" {/* background color; random by default 
    spotColor="#abc" {/* color of the more notable features; random by default 
    className="identicon" {/* optional class name for the canvas element; "identicon" by default 

  */