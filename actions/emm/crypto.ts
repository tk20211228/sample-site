import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // 32バイトの鍵が必要
const ALGORITHM = "aes-256-gcm"; // 暗号化アルゴリズム

// 暗号化するデータの型定義
interface SignupData {
  name: string;
  projectId: string;
  projectName: string;
}

export function encryptData(data: SignupData): string {
  // オブジェクトをJSON文字列に変換
  const jsonString = JSON.stringify(data);

  // 1. 初期化ベクトル（IV）の生成
  const iv = randomBytes(12); // 12バイトのランダムな値

  // 2. 暗号化器の作成
  const cipher = createCipheriv(
    ALGORITHM, // 暗号化アルゴリズム
    Buffer.from(ENCRYPTION_KEY, "hex"), // 鍵 環境変数の16進数文字列をバッファに変換
    iv // 初期化ベクトル
  );

  // 3. データの暗号化
  let encrypted = cipher.update(jsonString, "utf8", "hex"); // 文字列を暗号化
  encrypted += cipher.final("hex"); // 最後のブロックを暗号化

  // 4. 認証タグの取得
  const authTag = cipher.getAuthTag(); // 改ざん検知用のタグ

  // IV + 認証タグ + 暗号文を連結して返す
  return iv.toString("hex") + ":" + authTag.toString("hex") + ":" + encrypted;
}

export function decryptData(encryptedData: string): SignupData {
  // 1. 暗号文の分解
  const [ivHex, authTagHex, encryptedText] = encryptedData.split(":");

  // 2. 復号器の作成
  const decipher = createDecipheriv(
    ALGORITHM, // 暗号化アルゴリズム
    Buffer.from(ENCRYPTION_KEY, "hex"),
    Buffer.from(ivHex, "hex")
  );
  // 3. 認証タグの設定
  decipher.setAuthTag(Buffer.from(authTagHex, "hex")); // 認証タグの設定

  // 4. データの復号
  let decrypted = decipher.update(encryptedText, "hex", "utf8"); // 暗号文を復号
  decrypted += decipher.final("utf8"); // 最後のブロックを復号

  // JSON文字列をオブジェクトに戻す
  return JSON.parse(decrypted) as SignupData;
}
