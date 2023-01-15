import { ThumbsUp, Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow, addMinutes } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import styles from './Comment.module.css'

interface Comment {
    comment: string;
    author: string;
    avatar: string;
}

interface CommentProps {
    comment: Comment;
    date: Date;
    onDeleteComment: (comment: string) => void;
}

export function Comment({comment, date, onDeleteComment}: CommentProps) {
    const [likeCount, setLikeCount] = useState(0);
    const [countPublishedDate, setCountPublishedDate] = useState(date);

    let timer: number;
    useEffect(()=>{
        timer = setInterval(()=>{
            setCountPublishedDate((state)=>{
                return addMinutes(state, 1)
            })
        },20000);

        return ()=> clearInterval(timer)
    }, []);

    function handleDeleteComment(){
        onDeleteComment(comment.comment);
    };

    function handleLikeCount (){
        setLikeCount((stateLikeCount) => stateLikeCount + 1);
    };

    const publishedDateFormatted = format(countPublishedDate, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(countPublishedDate, {
        locale: ptBR,
        addSuffix: true,
    });

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={comment.avatar} alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{comment.author}</strong>
                            <time dateTime="2023-01-01" title={publishedDateFormatted}>{publishedDateRelativeToNow}</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>
                    <p>{comment.comment}</p>
                </div>
                <footer>
                    <button onClick={handleLikeCount}>
                        <ThumbsUp />
                        aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}