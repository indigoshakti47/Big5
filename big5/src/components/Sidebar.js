import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import MapIcon from '@material-ui/icons/Map'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Menu from '@material-ui/icons/Menu'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import Logo from './../assets/logo.svg';

const SideBar = ({ logout }) => {
    const createLink = (icon, name, route, action) => ({ icon, name, route, action })
    const [active, setActive] = useState(false); 
    const links = [
        createLink(HomeIcon, 'Home', '/dashboard'),
        createLink(EmojiPeopleIcon, 'Users', '/users'),
        createLink(FingerprintIcon, 'Comparison', '/comparison'),
        createLink(ExitToApp, 'Logout', '', logout),
    ]

    return (
        <React.Fragment> 
            { /* Desktop */}
        <div className = "side-bar desktop">
            <img className = "logo" src = {Logo} alt="image1"/> 
                {
              links.map(({ icon: Icon, name, route, action }, index) => (
                    <div className = {index <= links.length - 2 ? "icon-container-menu" : "icon-container-menu last"} key={name}> 
                        <span className = {"line-icon-decorator"} /> 
                        <IconButton className="icon-side-menu" color="secondary" component={Link} to={route} onClick={() => action && action()}>
                            <Badge color="white">
                                <Icon />
                            </Badge>
                        </IconButton>
                    </div>
                ))
            }
        </div>

        <span className = "effect-side" /> 
        <div className = {`side-bar mobile ${active ? 'active' : null}`}>
            
        {
            active ? 
           
        
              links.map(({ icon: Icon, name, route, action }, index) => (
                    <div className = "icon-container-menu" onClick = { ()=> setActive(false)} key={name}> 
                        <IconButton className="icon-side-menu" color="secondary" component={Link} to={route} onClick={() => action && action()}>
                            <Badge color="white">
                                <Icon />
                            </Badge>
                        </IconButton>
                    </div>
                )) : 
                <div onClick = { ()=> setActive(true)}>
                            <Badge color="white">
                                <Menu style = { { color: 'white'}}/>
                            </Badge>
                    </div>
                   
            }
        </div>
        </React.Fragment>
    ) 
}

export default SideBar; 