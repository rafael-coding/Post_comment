import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
};

interface Content {
    content: string
    type: string;
};

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
};

export function Post({author, publishedAt, content}: PostProps){
    const [comments, setComments] = useState([{comment:'Post muito bacana, hein?', author: 'Rafael de Abreu', avatar: '/avatar.gif'}]);
    const [newCommenText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });


    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();
        const copyComments = comments;
        copyComments.unshift({comment: newCommenText, author: '(Você)', avatar: '/comment-avatar.gif'})
        setComments(copyComments);
        setNewCommentText('')
    };

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        setNewCommentText(event.target.value);
    };

    function deleteComment(commentToDelete: string){
        const commentsWithoutDeletedOne = comments.filter(comment => comment.comment !== commentToDelete);
        setComments(commentsWithoutDeletedOne);
    };

    function handleKeySubmit(event: React.KeyboardEvent<HTMLTextAreaElement>){
        if(event.code === 'Enter' || event.code === 'NumpadEnter'){
            const copyComments = comments;
            copyComments.unshift({comment: newCommenText, author: '(Você)', avatar: '/comment-avatar.gif'})
            setComments(copyComments);
            setNewCommentText('')
        }
    }

    const isNewCommentEmpty = newCommenText.length === 0;

    return (
        <article className={styles.post}>

            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link'){
                        return <p key={line.content}><a href='#'>{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea value={newCommenText} onKeyUp={handleKeySubmit} onChange={handleNewCommentChange} placeholder='Deixe um comentário'></textarea>
                <footer>
                    <button disabled={isNewCommentEmpty} type='submit'>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment=> {
                    return (
                        <Comment 
                            key={comment.comment}
                            comment={comment} 
                            date={new Date()}
                            onDeleteComment={deleteComment} 
                        />)
                })}
            </div>
        </article>
    )
}