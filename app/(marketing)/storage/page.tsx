import { deleteImage, uploadImage } from "@/actions/avatar";

export default function Page() {
  return (
    <div>
      storage
      <form action={uploadImage}>
        <input type="file" name="file" />
        <button>投稿</button>
      </form>
      <form action={deleteImage}>
        <button>削除</button>
      </form>
    </div>
  );
}
