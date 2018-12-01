import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import logo from '../../logo.svg'

import'./styles.scss'

class Layout extends Component {
  render () {
    return (
      <div className='layout'>
        <div className='sidebar'>
          <div className='logo-container'>
            <img src={logo} className='App-logo' alt='logo' />
            <p className='title'>Pizza Live</p>
            <p className='description'>Best Pizza In Town</p>
          </div>
          <hr />
          <div className='left-menu'>
            <div className='menu-item'>
              <div className='bg-black color-white'>Menu</div>
              <div className='bg-orange color-white'><Icon name='arrow right' size='large' color='green' /></div>
            </div>
          </div>
        </div>
        <div className='content-section'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
