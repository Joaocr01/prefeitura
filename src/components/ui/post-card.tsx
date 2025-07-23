import Link from 'next/link'
import Image from 'next/image'
import { link } from 'fs'

interface Post {
  id: string
  titulo: string
  foto: string
  descricao: string
  fotografo: string
  createdAt: Date
  user: {
    name: string | null
  }
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <style>
              size: 10px !important;
        </style>
      <div className="relative h-48">
        <Image
          src={post.foto}
          alt={post.titulo}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          <Link href={`/post/${post.id}`}>{post.titulo}</Link>
        </h2>
        <p className="descricao text-muted-foreground mb-4 line-clamp-2">
          {post.descricao}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span>Por: {post.user?.name || 'Anônimo'}</span>
          <span className="text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </article>
  )
}
