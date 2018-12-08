import React from 'react'

import AppIcon from '../components/AppsIcon'

import Pane from '../components/Pane'
import Header from '../components/Header'
import Footer from '../components/Footer'


export default function Apps (props){
  return(
    <Pane>
      <Header title='UMI-ipfs APPs' />
      <div className='apps'>
        <p> The body of caurri apps</p>
        <div className='grid-container'>
          <div className='grid-item'>
            <AppIcon
              name='caurifile'
            />
          </div>
          <div className='grid-item'>2</div>
          <div className='grid-item'>3</div>
          <div className='grid-item'>4</div>
          <div className='grid-item'>5</div>
          <div className='grid-item'>6</div>
        </div>
      </div>

      <Footer>
        <p> cauri footer form searh app</p>
      </Footer>
    </Pane>
  )
}
