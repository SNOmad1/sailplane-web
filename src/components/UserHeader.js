import React, {useEffect, useState} from 'react';
import * as sailplaneAccess from '../utils/sailplane-access';
import Jdenticon from 'react-jdenticon';
import {primary2, primary3, primary45} from '../utils/colors';
import {SmallInstanceItem} from './SmallInstanceItem';
import {setStatus} from '../actions/tempData';
import {useDispatch} from 'react-redux';
import {FaServer} from 'react-icons/fa';
import {compressKey} from "../utils/Utils";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    borderBottom: `1px solid ${primary2}`,
    paddingBottom: 2,
  },
  right: {
    fontSize: 16,
    lineHeight: '18px',
    color: primary45,
  },
  userItem: {
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 2,
  },
  menu: {
    position: 'absolute',
    top: 34,
    backgroundColor: '#FFF',
    minWidth: 100,
    right: 0,
    border: `1px solid ${primary3}`,
    fontSize: 14,
    zIndex: 2,
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: primary45,
    fontSize: 16,
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
  },
  headerIcon: {
    marginRight: 4,
  },
};

export function UserHeader({sailplane, title, iconComponent, leftSide}) {
  const [myID, setMyID] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  console.log(sailplane)

  useEffect(() => {
    const getID = () => {
      try {
        console.log(sailplane)
        const tmpMyID = compressKey(sailplane._orbitdb.identity.publicKey);

        setMyID(tmpMyID);
      } catch (e) {
        console.log('err', e);
      }
    };

    if (sailplane) {
      getID();
    }
  }, [sailplane]);

  const IconComponent = iconComponent;

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        {title ? (
          <div style={styles.title}>
            <IconComponent
              color={primary3}
              size={16}
              style={styles.headerIcon}
            />
            {title}
          </div>
        ) : (
          leftSide
        )}
      </div>
      <div style={styles.right}>
        {myID ? (
          <div style={styles.userItem}>
            <div onClick={() => setMenuOpen(!menuOpen)}>
              <Jdenticon value={myID} size={'34'} style={styles.icon} />
            </div>
            {menuOpen ? (
              <div style={styles.menu}>
                <SmallInstanceItem
                  name={'Copy user ID'}
                  onClick={async () => {
                    await navigator.clipboard.writeText(myID);
                    setMenuOpen(false);
                    dispatch(
                      setStatus({
                        message: 'User ID copied to clipboard',
                        isInfo: true,
                      }),
                    );
                    setTimeout(() => dispatch(setStatus({})), 1500);
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
