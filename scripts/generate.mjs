import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  console.log("🚀 記事の自動生成を開始します...");

  // 1. 金庫からGeminiの鍵を取り出して準備
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-pro" });

  // 2. Geminiへの指示書（プロンプト）
  const prompt = `
    あなたは防災メディア「NEXT防災」のプロライターです。
    「電源・ガジェット」のカテゴリ向けに、災害時に役立つ最新の防災アイテムに関するブログ記事を1つ生成してください。

    【出力ルール】
    ・記事のタイトルと本文のみを出力してください。
    ・microCMSにそのまま入稿するため、HTML形式（<h2>, <h3>, <p>, <ul>, <li>など）で出力してください。
    ・重要なキーワードには <span class="bg-yellow-200 font-bold px-1"> を使ってマーカー線を引いてください。
    ・特に注意すべきポイントは、以下のTailwindクラスを用いたアラートボックス枠で囲んでください。
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
        <p class="font-bold text-blue-800 m-0 mb-2">💡 ポイント</p>
        <p class="m-0 text-gray-700">（ここに内容）</p>
      </div>
    ・HTMLのコードブロック（\`\`\`html）などは付けずに、中身のHTMLタグから書き始めてください。
  `;

  // 3. AIに記事を書かせる
  console.log("🧠 Geminiが記事を執筆中...");
  const result = await model.generateContent(prompt);
  let contentHtml = result.response.text();
  
  // もしAIが余計な ```html などを付けてきたら削る処理
  contentHtml = contentHtml.replace(/```html\n|```/g, '').trim();

  // 4. microCMSへ送信（入稿）する
  console.log("📝 microCMSへ入稿しています...");
  const response = await fetch(`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
    },
    body: JSON.stringify({
      title: "【AI自動生成】災害時に備える最新電源・ガジェットガイド", 
      content: contentHtml,
    }),
  });

  if (response.ok) {
    console.log("✅ microCMSへの自動入稿が完了しました！");
  } else {
    const errorText = await response.text();
    console.error("❌ エラーが発生しました:", errorText);
    process.exit(1);
  }
}

main();
