import './global.css';
import { Header } from './components/Header';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';
import { Post } from './components/Post';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: '/avatar.png',
      name: 'Rafael de Abreu',
      role: 'Frontend Developer'
    },
    contents: [
      {type: 'paragraph', content: 'Fala galeraa,'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifólio, é um projeto que fiz no meu NLW return, evento da Rocketseat. O nome do projeto é DoctorCare'},
      {type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date(Date.now() - 1 * 24*60*60*1000),
  },
  {
    id: 2,
    author: {
      avatarUrl: '/610px-TUX-G2-SVG.svg.png',
      name: 'Michaeld Ronald',
      role: 'Backend Developer'
    },
    contents: [
      {type: 'paragraph', content: 'Fala galeraa aqui é o Michael,'},
      {type: 'paragraph', content: 'baby baby do birulaibe'},
      {type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date(Date.now() - 1 * 24*60*60*1000),
  }
];

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
        {posts.map(post => {
          return (
          <Post 
            key={post.id}
            author={post.author}
            content={post.contents}
            publishedAt={post.publishedAt}
          />
          )
        })}
        </main>
      </div>
    </div>
  )
}

export default App
