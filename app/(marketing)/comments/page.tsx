import { addComment, deleteComment } from "@/actions/comment";
import { getComments } from "@/app/data/comments";

export default async function Page() {
  const comments = await getComments();
  // if (comments?.length === 0) {
  //   return <p>コメントはありません。</p>;
  // }

  return (
    <div>
      <form action={addComment}>
        <textarea name="body" id=""></textarea>
        <button type="submit">コメントする</button>
      </form>

      {comments?.length === 0 ? (
        <p>コメントがありません</p>
      ) : (
        comments?.map((comment) => (
          <div key={comment.id}>
            <p>{comment.body}</p>
            <form action={deleteComment.bind(null, comment.id)}>
              <button type="submit">削除</button>
            </form>
          </div>
        ))
      )}
    </div>
  );
}
