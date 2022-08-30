import Link from "next/link";
import Image from "next/image";

const PostCard = ({ post }) => {
  return (
    <div key={post.slug}>
      <Link href={`/tips/${post.slug}`}>
        <a>
          <div className="border rounded">
            <Image
              src={`/images/${post.frontMatter.image}.svg`}
              width={360}
              height={360}
            />
          </div>
          <p>{post.frontMatter.title}</p>
        </a>
      </Link>
    </div>
  );
};

export default PostCard;