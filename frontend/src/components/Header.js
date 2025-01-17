import clsx from 'clsx';
import { useState, useContext } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import LeftNavBarDrawer from './LeftNavBarDrawer';
import Button from '@material-ui/core/Button';
import AuthContext from '../authAPI/auth-context';
import { useHistory } from 'react-router';

import AccountInfo from './AccountInfo';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        zIndex: 10,
    },
    hide: {
        display: 'none',
    },
    titleSm: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: 'inherit',
    },
    titleMd: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
        color: 'inherit',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'fill',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    loginButton: {
        color: 'inherit',
        size: 'medium',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.25rem',
        },
    },
    headerBottomMargin: theme.mixins.toolbar,
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [isAccountInfoDisplayed, setIsAccountInfoDisplayed] = useState(false);

    const auth = useContext(AuthContext);
    const isLoggedIn = auth.isLoggedIn;

    const pageName = props.pageName;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleSearchChange = (e) => {
        props.handleSearchChange(e.target.value);
    };
    const handleSearch = () => {
        props.handleSearch();
    };
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogin = () => {
        history.push('/login');
    };
    const handleLogout = () => {
        handleMenuClose();
        auth.logoutHandler();
        history.replace('/');
    };

    const handleAccountInfo = () => {
        setIsAccountInfoDisplayed(!isAccountInfoDisplayed);
        handleMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleAccountInfo}>My Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label='account of current user'
                    aria-controls='primary-search-account-menu'
                    aria-haspopup='true'
                    color='inherit'
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const appBarRightSideDesktop = (
        <div className={classes.sectionDesktop}>
            <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
            >
                <AccountCircle />
            </IconButton>
        </div>
    );

    const appBarRightSideMobile = (
        <div className={classes.sectionMobile}>
            <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
            >
                <MoreIcon />
            </IconButton>
        </div>
    );

    return (
        <div className={`${classes.grow} ${classes.root}`}>
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        edge='start'
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.titleMd} variant='h4' noWrap>
                        TreeHole
                    </Typography>
                    <Typography
                        className={classes.titleSm}
                        variant='h6'
                        noWrap
                        style={{ paddingLeft: '1.5rem' }}
                    >
                        {pageName}
                    </Typography>
                    {!open && props.isSearchEnabled && (
                        <div className={classes.search}>
                            <div
                                className={classes.searchIcon}
                                onClick={() => handleSearch()}
                            >
                                <IconButton
                                    edge='start'
                                    className={classes.menuButton}
                                    color='inherit'
                                    aria-label='search'
                                >
                                    <SearchIcon />
                                </IconButton>
                            </div>
                            <InputBase
                                placeholder='Search…'
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={props.searchContent}
                                onChange={(e) => handleSearchChange(e)}
                            />
                        </div>
                    )}

                    <div className={classes.grow} />

                    {isLoggedIn && appBarRightSideDesktop}
                    {isLoggedIn && appBarRightSideMobile}
                    {!isLoggedIn && (
                        <Button
                            className={classes.loginButton}
                            onClick={handleLogin}
                        >
                            LOGIN
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            {isLoggedIn && renderMobileMenu}
            {isLoggedIn && renderMenu}

            <div className={classes.headerBottomMargin} />
            <LeftNavBarDrawer
                dWidth={drawerWidth}
                open={open}
                onClose={handleDrawerClose}
                histories={history}
            />
            {isAccountInfoDisplayed && (
                <AccountInfo
                    open={isAccountInfoDisplayed}
                    handleInfoClose={setIsAccountInfoDisplayed}
                />
            )}
        </div>
    );
}
