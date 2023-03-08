import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="footer-container">
      <p>2023 Marsel Headphones All rights reserved.</p>
      <p className='icons'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
      </p>
    </div>
  )
}

export default Footer