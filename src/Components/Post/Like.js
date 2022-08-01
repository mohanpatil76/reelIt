import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    like: {
        color: '#e74c3c',
        cursor: 'pointer',
        fontSize:'32px'
    },
    unlike: {
        color: '#3f3f41',
        cursor: 'pointer',
        fontSize:'32px',
    }
})

function Like({ userData = null, postData = null }) {
    const classes = useStyles();
    const [like, setLike] = useState(null);

    const handleLike = async () => {
        if (like == true) {
            let newLikeArr = postData.Likes.filter(el => {
                return el != userData.Uid;
            })
            await database.posts.doc(postData.PostId).update({
                Likes: newLikeArr
            })
        }
        else {
            let newLikeArr = [...postData.Likes, userData.Uid];
            await database.posts.doc(postData.PostId).update({
                Likes: newLikeArr
            })
        }
    }

    useEffect(() => {
        let check = postData?.Likes.includes(userData?.Uid) ? true : false;
        setLike(check);
    }, [postData])

    return (
        <div className='like' style={{ display:'flex', justifyContent:'flex-start'}}>
            {
                like != null
                    ? <>{like == false
                        ? <><FavoriteBorderIcon className={classes.unlike} onClick={handleLike} /> </>
                        : <><FavoriteIcon className={classes.like} onClick={handleLike} /></>
                    }</>
                    : <></>
            }
        </div>
    )
}

export default React.memo(Like)
