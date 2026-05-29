// Vercel Serverless Function — 네이버 쇼핑 API 프록시
// 경로: /api/search?query=텀블러
//
// ⚙️ Vercel 대시보드 → Project → Settings → Environment Variables 에 추가:
//    NAVER_CLIENT_ID     = 네이버 개발자센터에서 발급한 Client ID
//    NAVER_CLIENT_SECRET = 네이버 개발자센터에서 발급한 Client Secret
//
// 네이버 개발자센터: https://developers.naver.com/apps/#/list
//   → 애플리케이션 등록 → "검색" API 사용 체크 → 키 발급

export default async function handler(req, res) {
  // CORS (같은 도메인에서 호출하면 필요 없지만, 미리보기·로컬 테스트용)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { query = '', display = '10', sort = 'sim' } = req.query;
  if (!query.trim()) {
    return res.status(400).json({ error: 'query is required' });
  }

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      error: 'NAVER_CLIENT_ID / NAVER_CLIENT_SECRET environment variables are not set.',
    });
  }

  const url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=${encodeURIComponent(display)}&sort=${encodeURIComponent(sort)}`;

  try {
    const naverRes = await fetch(url, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });
    const data = await naverRes.json();
    if (!naverRes.ok) {
      return res.status(naverRes.status).json({ error: 'Naver API error', detail: data });
    }
    // 짧은 캐시
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}
