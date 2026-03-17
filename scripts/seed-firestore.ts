import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || './service-account.json';

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const serviceAccount = require(serviceAccountPath.startsWith('/') ? serviceAccountPath : `${process.cwd()}/${serviceAccountPath}`);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} catch {
  console.error('Failed to load service account. Set GOOGLE_APPLICATION_CREDENTIALS or place service-account.json in project root.');
  process.exit(1);
}

const db = getFirestore();

// ── Batch helper: auto-commits every 500 ops ──
async function batchWrite(
  collectionName: string,
  docs: Record<string, unknown>[],
) {
  const MAX = 500;
  let batch = db.batch();
  let count = 0;

  for (const doc of docs) {
    const ref = db.collection(collectionName).doc();
    batch.set(ref, doc);
    count++;
    if (count % MAX === 0) {
      await batch.commit();
      batch = db.batch();
    }
  }
  if (count % MAX !== 0) await batch.commit();
  console.log(`  ✓ ${collectionName}: ${docs.length} docs`);
}

// ── Data ──

const users: Record<string, unknown>[] = [
  { userId: 'admin', password: '1234', name: '관리자', baptismName: '', diocese: '서울대교구', parish: '명동성당', email: 'admin@catholic.or.kr' },
  { userId: 'maria01', password: 'maria123', name: '김마리아', baptismName: '마리아', diocese: '서울대교구', parish: '압구정성당', email: 'maria@hanmail.net' },
  { userId: 'joseph77', password: 'joseph77', name: '박요셉', baptismName: '요셉', diocese: '수원교구', parish: '수원성당', email: 'joseph@naver.com' },
  { userId: 'teresa22', password: 'teresa22', name: '이데레사', baptismName: '데레사', diocese: '인천교구', parish: '부평성당', email: 'teresa@daum.net' },
  { userId: 'francis', password: 'francis1', name: '정프란치스코', baptismName: '프란치스코', diocese: '서울대교구', parish: '혜화동성당', email: 'francis@gmail.com' },
  { userId: 'paolo99', password: 'paolo99', name: '최바오로', baptismName: '바오로', diocese: '부산교구', parish: '중앙성당', email: 'paolo@catholic.or.kr' },
  { userId: 'cecilia', password: 'ceci1234', name: '한체칠리아', baptismName: '체칠리아', diocese: '대전교구', parish: '대흥동성당', email: 'cecilia@hanmail.net' },
  { userId: 'peter00', password: 'peter000', name: '강베드로', baptismName: '베드로', diocese: '대구대교구', parish: '계산성당', email: 'peter@naver.com' },
  { userId: 'anna88', password: 'anna8888', name: '윤안나', baptismName: '안나', diocese: '광주대교구', parish: '북동성당', email: 'anna@daum.net' },
  { userId: 'agnes', password: 'agnes123', name: '문아녜스', baptismName: '아녜스', diocese: '서울대교구', parish: '약현성당', email: 'agnes@gmail.com' },
];

const boardPosts: Record<string, unknown>[] = [
  { boardType: 'muk', title: '[공지] 묵상나눔 게시판 이용 규칙 안내', content: '묵상나눔 게시판은 하느님 말씀을 함께 나누는 공간입니다. 상업적 글, 정치적 글은 삭제됩니다.', author: '관리자', isNotice: true, views: 3241, createdAt: '2026-01-02' },
  { boardType: 'free', title: '[필독] 자유게시판 운영정책 변경 안내', content: '2026년부터 자유게시판 운영정책이 변경됩니다. 비방, 욕설, 광고성 글은 즉시 삭제됩니다.', author: '관리자', isNotice: true, views: 5412, createdAt: '2026-02-15' },
  { boardType: 'qa', title: '[공지] 질문답변 게시판 이용 안내', content: '질문답변 게시판은 가톨릭 교리 및 전례에 관한 질문을 올리는 공간입니다.', author: '관리자', isNotice: true, views: 2890, createdAt: '2026-01-10' },
  { boardType: 'muk', title: '사순시기 묵상: 광야에서의 40일을 보내며', content: '사순시기를 맞아 광야에서의 40일을 묵상합니다. 예수님께서 겪으신 유혹과 시련을 생각하며...', author: '바오로', isNotice: false, views: 42, createdAt: '2026-03-10' },
  { boardType: 'muk', title: '오늘 복음 말씀을 묵상하며 느낀 점을 나눕니다', content: '오늘 마태오 복음의 말씀이 마음에 깊이 와닿았습니다. 율법학자들의 위선에 대한 경고...', author: '마리아', isNotice: false, views: 38, createdAt: '2026-03-10' },
  { boardType: 'muk', title: '십자가의 길 14처 묵상을 마치고', content: '본당에서 십자가의 길 기도를 함께 바쳤습니다. 14처를 하나하나 묵상하며...', author: '요셉', isNotice: false, views: 67, createdAt: '2026-03-09' },
  { boardType: 'muk', title: '매일미사 후 느낀 은총의 시간 - 사순 둘째주', content: '매일미사에 참석하며 느끼는 은총의 시간이 갈수록 깊어집니다.', author: '데레사', isNotice: false, views: 55, createdAt: '2026-03-09' },
  { boardType: 'muk', title: '사순절 단식과 기도의 의미에 대한 묵상', content: '단식은 단순히 음식을 절제하는 것이 아니라 하느님께 더 가까이 다가가는 것임을...', author: '프란치스코', isNotice: false, views: 89, createdAt: '2026-03-08' },
  { boardType: 'muk', title: '주님, 저에게 말씀하소서 - 렉시오 디비나 나눔', content: '렉시오 디비나를 통해 하느님의 말씀을 깊이 새기는 시간을 가졌습니다.', author: '아녜스', isNotice: false, views: 74, createdAt: '2026-03-08' },
  { boardType: 'muk', title: '이사야서 묵상: 고통받는 종의 노래', content: '이사야 53장의 고통받는 종의 노래를 묵상하며 예수님의 수난을 되새겼습니다.', author: '베드로', isNotice: false, views: 92, createdAt: '2026-03-07' },
  { boardType: 'muk', title: '사순절 자선의 의미를 되새기며', content: '자선은 사랑의 표현입니다. 사순시기에 이웃을 위한 나눔을 실천하며...', author: '루치아', isNotice: false, views: 61, createdAt: '2026-03-07' },
  { boardType: 'muk', title: '오늘 강론에서 깊이 와닿은 말씀', content: '신부님의 강론 중 "하느님은 우리의 약함 속에서 일하신다"는 말씀이...', author: '안드레아', isNotice: false, views: 108, createdAt: '2026-03-06' },
  { boardType: 'muk', title: '묵주기도 5단을 바치며 느낀 평화', content: '묵주기도를 바치면서 마음의 평화를 경험합니다. 특히 영광의 신비를...', author: '가타리나', isNotice: false, views: 85, createdAt: '2026-03-06' },
  { boardType: 'muk', title: '코린토 전서 13장 사랑의 찬가 묵상', content: '사랑은 참고 기다립니다. 사랑은 친절합니다. 이 말씀을 묵상하며 진정한 사랑의 의미를...', author: '마리아', isNotice: false, views: 73, createdAt: '2026-03-05' },
  { boardType: 'muk', title: '탕자의 비유를 묵상하며 - 아버지의 사랑', content: '루카 15장 탕자의 비유에서 아버지의 무한한 사랑을 느꼈습니다.', author: '바오로', isNotice: false, views: 95, createdAt: '2026-03-05' },
  { boardType: 'muk', title: '예레미야서 묵상: 새 계약의 약속', content: '예레미야 31장의 새 계약 약속을 묵상하며 하느님의 신실하심을 되새겼습니다.', author: '요셉', isNotice: false, views: 44, createdAt: '2026-03-04' },
  { boardType: 'muk', title: '사순시기 회개의 참된 의미', content: '회개는 방향 전환입니다. 나에게서 하느님께로, 어둠에서 빛으로...', author: '데레사', isNotice: false, views: 68, createdAt: '2026-03-04' },
  { boardType: 'muk', title: '요한 복음 15장 포도나무 비유 묵상', content: '나는 포도나무요 너희는 가지다. 주님 안에 머무르는 삶의 의미를 깊이 묵상합니다.', author: '프란치스코', isNotice: false, views: 56, createdAt: '2026-03-03' },
  { boardType: 'muk', title: '성체 앞에서의 침묵기도 체험', content: '성체조배를 하며 30분간 침묵 속에 머물렀습니다. 말없이 주님 앞에 앉아있는 것만으로...', author: '아녜스', isNotice: false, views: 82, createdAt: '2026-03-03' },
  { boardType: 'free', title: '우리 본당 사순절 프로그램을 소개합니다', content: '우리 본당에서는 매주 금요일 십자가의 길 기도, 토요일 특별 강의를 진행합니다.', author: '봉사자', isNotice: false, views: 23, createdAt: '2026-03-10' },
  { boardType: 'free', title: '성지순례 후기 - 이스라엘 8일 여행기', content: '지난달 이스라엘 성지순례를 다녀왔습니다. 예루살렘, 베들레헴, 나자렛...', author: '순례자', isNotice: false, views: 156, createdAt: '2026-03-10' },
  { boardType: 'free', title: '가톨릭 영화 추천합니다 - 올해 본 영화 중 최고', content: '최근에 본 "The Two Popes"라는 영화를 추천합니다. 교황 베네딕토 16세와 프란치스코 교황의...', author: '영화팬', isNotice: false, views: 201, createdAt: '2026-03-09' },
  { boardType: 'free', title: '좋은 묵상 책 추천 부탁드립니다', content: '사순시기에 읽기 좋은 묵상 책을 추천해 주실 수 있나요?', author: '독서가', isNotice: false, views: 87, createdAt: '2026-03-09' },
  { boardType: 'free', title: '교우 여러분 주말 좋은 시간 되세요', content: '봄이 다가오고 있습니다. 교우 여러분 모두 주님 안에서 평화로운 주말 보내세요.', author: '인사', isNotice: false, views: 134, createdAt: '2026-03-08' },
  { boardType: 'free', title: '본당 주보 온라인으로 보는 방법 아시나요?', content: '우리 본당 주보를 온라인에서 볼 수 있다고 들었는데 방법을 모르겠습니다.', author: '초보', isNotice: false, views: 96, createdAt: '2026-03-08' },
  { boardType: 'free', title: '부활 대축일 준비 이야기 함께 나눠요', content: '올해 부활 대축일은 4월 5일입니다. 각 본당에서 어떻게 준비하고 계신가요?', author: '레지오', isNotice: false, views: 145, createdAt: '2026-03-07' },
  { boardType: 'free', title: '가톨릭 성가 중 가장 좋아하는 곡은?', content: '저는 "여기에 모인 우리"를 가장 좋아합니다. 여러분은 어떤 성가를 좋아하시나요?', author: '성가대', isNotice: false, views: 267, createdAt: '2026-03-07' },
  { boardType: 'free', title: '전입신고 후 새 본당 적응기', content: '이사를 하고 새 본당에 전입신고를 했습니다. 아직 어색하지만 교우분들이 따뜻하게...', author: '전입자', isNotice: false, views: 178, createdAt: '2026-03-06' },
  { boardType: 'free', title: '본당 바자회 준비 봉사자 모집합니다', content: '다음 달 본당 바자회를 위해 봉사자를 모집합니다. 관심 있으신 분은 사무실로 연락주세요.', author: '봉사위원', isNotice: false, views: 45, createdAt: '2026-03-06' },
  { boardType: 'free', title: '가톨릭 팟캐스트 추천 - 매일 듣고 있어요', content: '가톨릭 관련 팟캐스트 중 "말씀의 등불"을 추천합니다. 매일 짧은 묵상을...', author: '팟캐스트팬', isNotice: false, views: 112, createdAt: '2026-03-05' },
  { boardType: 'free', title: '어린이 주일학교 교사 경험담', content: '3년째 주일학교 교사를 하고 있습니다. 아이들과 함께하는 시간이 정말 보람차고...', author: '교사', isNotice: false, views: 89, createdAt: '2026-03-05' },
  { boardType: 'free', title: '레지오 마리애 단원 모집 안내', content: '우리 본당 레지오 마리애에서 새 단원을 모집합니다. 매주 토요일 오전 10시...', author: '레지오단장', isNotice: false, views: 67, createdAt: '2026-03-04' },
  { boardType: 'free', title: '성당 근처 맛집 추천해주세요', content: '명동성당 근처 교우분들이 자주 가시는 맛집이 있으면 추천 부탁드립니다.', author: '맛집탐방', isNotice: false, views: 234, createdAt: '2026-03-04' },
  { boardType: 'free', title: '가톨릭 캠프 후기 - 청년부 겨울 피정', content: '지난 겨울 청년부 피정에 다녀왔습니다. 침묵 속에서 하느님의 음성을 들을 수 있었던...', author: '청년', isNotice: false, views: 156, createdAt: '2026-03-03' },
  { boardType: 'free', title: '성가대 지원자를 찾습니다', content: '우리 본당 성가대에서 소프라노, 테너 파트 지원자를 모집합니다.', author: '성가대장', isNotice: false, views: 78, createdAt: '2026-03-02' },
  { boardType: 'free', title: '올해 사목 목표에 대한 생각', content: '올해 본당 사목 목표가 "함께 걷는 시노달리타스"인데 구체적으로 어떻게 실천할 수 있을까요?', author: '교우A', isNotice: false, views: 91, createdAt: '2026-03-01' },
  { boardType: 'free', title: '가톨릭 서점 추천 - 바오로딸 신간 안내', content: '바오로딸 서점에서 사순시기 추천 도서 목록이 나왔습니다. 관심 있으신 분들은...', author: '독서모임', isNotice: false, views: 64, createdAt: '2026-02-28' },
  { boardType: 'qa', title: '고해성사 때 어떻게 해야 하나요?', content: '처음 고해성사를 보려고 하는데 절차가 궁금합니다.', author: '예비자', isNotice: false, views: 34, createdAt: '2026-03-10' },
  { boardType: 'qa', title: '세례명은 어떻게 정하나요?', content: '세례를 준비하고 있는데 세례명 정하는 기준이 있나요?', author: '궁금이', isNotice: false, views: 67, createdAt: '2026-03-10' },
  { boardType: 'qa', title: '미사 중 성체를 받는 올바른 자세', content: '성체를 받을 때 손으로 받아야 하나요 입으로 받아야 하나요?', author: '새신자', isNotice: false, views: 89, createdAt: '2026-03-09' },
  { boardType: 'qa', title: '묵주기도 바치는 방법 알려주세요', content: '묵주기도를 배우고 싶은데 자세한 방법을 알려주세요.', author: '초보', isNotice: false, views: 112, createdAt: '2026-03-09' },
  { boardType: 'qa', title: '사순시기에 금육과 금식의 차이는?', content: '금육일과 금식일의 차이가 무엇인가요? 정확한 규정을 알고 싶습니다.', author: '학생', isNotice: false, views: 145, createdAt: '2026-03-08' },
  { boardType: 'qa', title: '대부모 자격 조건이 어떻게 되나요?', content: '대부모를 부탁받았는데 자격 조건이 있나요?', author: '대부', isNotice: false, views: 78, createdAt: '2026-03-08' },
  { boardType: 'qa', title: '혼배성사 절차가 궁금합니다', content: '내년에 결혼을 앞두고 있는데 혼배성사 절차를 알고 싶습니다.', author: '예비부부', isNotice: false, views: 203, createdAt: '2026-03-07' },
  { boardType: 'qa', title: '타교파에서 가톨릭으로 개종할 때', content: '개신교에서 가톨릭으로 개종하려면 어떤 과정을 거쳐야 하나요?', author: '구도자', isNotice: false, views: 189, createdAt: '2026-03-07' },
  { boardType: 'qa', title: '연도(연미사)는 언제 신청하나요?', content: '돌아가신 분을 위한 연미사 신청 방법이 궁금합니다.', author: '교우', isNotice: false, views: 95, createdAt: '2026-03-06' },
  { boardType: 'qa', title: '교적 이전 방법이 궁금합니다', content: '다른 교구로 이사하면 교적은 어떻게 이전하나요?', author: '이사', isNotice: false, views: 121, createdAt: '2026-03-06' },
  { boardType: 'qa', title: '견진성사는 몇 살부터 받을 수 있나요?', content: '견진성사 나이 제한이 있나요? 준비 과정도 궁금합니다.', author: '학부모', isNotice: false, views: 56, createdAt: '2026-03-05' },
  { boardType: 'qa', title: '미사 전례 순서를 알려주세요', content: '미사의 전체 순서를 자세히 알고 싶습니다. 처음 참석하려고 합니다.', author: '방문자', isNotice: false, views: 198, createdAt: '2026-03-05' },
  { boardType: 'qa', title: '가톨릭에서 이혼에 대한 입장은?', content: '가톨릭에서 이혼과 재혼에 대한 교회법적 입장이 궁금합니다.', author: '고민중', isNotice: false, views: 267, createdAt: '2026-03-04' },
  { boardType: 'qa', title: '봉헌금은 얼마나 내야 하나요?', content: '봉헌금에 정해진 금액이 있나요? 처음이라 잘 모르겠습니다.', author: '새교우', isNotice: false, views: 88, createdAt: '2026-03-04' },
  { boardType: 'qa', title: '성경을 처음 읽으려면 어디서부터?', content: '성경을 처음 읽는데 어느 부분부터 시작하면 좋을까요?', author: '입문자', isNotice: false, views: 176, createdAt: '2026-03-03' },
  { boardType: 'qa', title: '영세와 세례는 같은 말인가요?', content: '영세와 세례의 차이가 궁금합니다. 같은 건가요?', author: '궁금이2', isNotice: false, views: 134, createdAt: '2026-03-03' },
  { boardType: 'qa', title: '병자성사는 언제 받나요?', content: '병자성사는 위독할 때만 받는 건가요? 미리 받을 수도 있나요?', author: '간병인', isNotice: false, views: 76, createdAt: '2026-03-02' },
  { boardType: 'qa', title: '가톨릭과 개신교의 성경 차이', content: '가톨릭 성경과 개신교 성경에 차이가 있다고 들었는데 어떤 차이인가요?', author: '비교연구', isNotice: false, views: 215, createdAt: '2026-03-01' },
];

// ── Bible Verses ──
function v(book: string, chapter: number, verse: number, textKo: string): Record<string, unknown> {
  return { book, chapter, verse, textKo, translation: '공동번역' };
}

const bibleVerses: Record<string, unknown>[] = [
  // Genesis 1 (31)
  v('창세기', 1, 1, '한처음에 하느님께서 하늘과 땅을 창조하셨다.'),
  v('창세기', 1, 2, '땅은 아직 꼴을 갖추지 못하고 비어 있었는데, 어둠이 심연 위에 감돌고 하느님의 영이 그 물 위를 감돌고 있었다.'),
  v('창세기', 1, 3, '하느님께서 말씀하셨다. "빛이 생겨라." 그러자 빛이 생겼다.'),
  v('창세기', 1, 4, '하느님께서 보시니 그 빛이 좋았다. 하느님께서 빛과 어둠을 가르셨다.'),
  v('창세기', 1, 5, '하느님께서 빛을 낮이라 부르시고 어둠을 밤이라 부르셨다. 저녁이 되고 아침이 되니 첫째 날이었다.'),
  v('창세기', 1, 6, '하느님께서 말씀하셨다. "물 한가운데에 궁창이 생겨, 물과 물 사이를 갈라놓아라."'),
  v('창세기', 1, 7, '하느님께서 궁창을 만들어, 궁창 아래에 있는 물과 궁창 위에 있는 물을 가르셨다. 그대로 되었다.'),
  v('창세기', 1, 8, '하느님께서 궁창을 하늘이라 부르셨다. 저녁이 되고 아침이 되니 둘째 날이었다.'),
  v('창세기', 1, 9, '하느님께서 말씀하셨다. "하늘 아래에 있는 물이 한곳으로 모여, 마른 땅이 드러나라." 그대로 되었다.'),
  v('창세기', 1, 10, '하느님께서 마른 땅을 뭍이라, 물이 모인 곳을 바다라 부르셨다. 하느님께서 보시니 좋았다.'),
  v('창세기', 1, 11, '하느님께서 말씀하셨다. "땅은 푸른 싹을 돋게 하여라. 씨를 맺는 풀과 씨 있는 과일나무를 제 종류대로 땅 위에 돋게 하여라." 그대로 되었다.'),
  v('창세기', 1, 12, '땅은 푸른 싹을 돋아나게 하였다. 씨를 맺는 풀과 씨 있는 과일나무를 제 종류대로 돋아나게 하였다. 하느님께서 보시니 좋았다.'),
  v('창세기', 1, 13, '저녁이 되고 아침이 되니 셋째 날이었다.'),
  v('창세기', 1, 14, '하느님께서 말씀하셨다. "하늘의 궁창에 빛나는 것들이 생겨, 낮과 밤을 가르고, 표징과 절기, 날과 해를 나타내어라."'),
  v('창세기', 1, 15, '"하늘의 궁창에서 빛나는 것들이 되어, 땅을 비추어라." 그대로 되었다.'),
  v('창세기', 1, 16, '하느님께서 커다란 빛나는 것 두 개를 만드시어, 큰 빛나는 것은 낮을 다스리게 하시고, 작은 빛나는 것은 밤을 다스리게 하셨다. 그리고 별들도 만드셨다.'),
  v('창세기', 1, 17, '하느님께서 그것들을 하늘 궁창에 놓으시어, 땅을 비추게 하시고,'),
  v('창세기', 1, 18, '낮과 밤을 다스리며 빛과 어둠을 가르게 하셨다. 하느님께서 보시니 좋았다.'),
  v('창세기', 1, 19, '저녁이 되고 아침이 되니 넷째 날이었다.'),
  v('창세기', 1, 20, '하느님께서 말씀하셨다. "물에는 생물이 우글거리고, 새들은 땅 위 하늘의 궁창 아래를 날아다녀라."'),
  v('창세기', 1, 21, '하느님께서 커다란 바다 괴물들과 물에서 우글거리며 움직이는 온갖 생물을 제 종류대로, 날개 달린 온갖 새를 제 종류대로 창조하셨다. 하느님께서 보시니 좋았다.'),
  v('창세기', 1, 22, '하느님께서 그것들에게 복을 내리며 말씀하셨다. "번식하고 불어나 바닷물을 채워라. 새들도 땅 위에 불어나라."'),
  v('창세기', 1, 23, '저녁이 되고 아침이 되니 다섯째 날이었다.'),
  v('창세기', 1, 24, '하느님께서 말씀하셨다. "땅은 생물을 제 종류대로 내어라. 집짐승과 기어 다니는 것과 들짐승을 제 종류대로 내어라." 그대로 되었다.'),
  v('창세기', 1, 25, '하느님께서 들짐승을 제 종류대로, 집짐승을 제 종류대로, 땅바닥을 기어 다니는 온갖 것을 제 종류대로 만드셨다. 하느님께서 보시니 좋았다.'),
  v('창세기', 1, 26, '하느님께서 말씀하셨다. "우리와 비슷하게 우리 모습으로 사람을 만들자."'),
  v('창세기', 1, 27, '하느님께서 당신의 모습으로 사람을 창조하셨다. 하느님의 모습으로 사람을 창조하셨다. 남자와 여자로 그들을 창조하셨다.'),
  v('창세기', 1, 28, '하느님께서 그들에게 복을 내리며 말씀하셨다. "자식을 많이 낳고 번성하여 땅을 가득 채우고 지배하여라."'),
  v('창세기', 1, 29, '하느님께서 말씀하셨다. "이제 내가 온 땅 위에서 씨를 맺는 모든 풀과 씨 있는 모든 과일나무를 너희에게 준다. 이것이 너희의 양식이 될 것이다."'),
  v('창세기', 1, 30, '"땅의 모든 짐승과 하늘의 모든 새와 땅을 기어 다니는 모든 것에게는 온갖 푸른 풀을 양식으로 준다." 그대로 되었다.'),
  v('창세기', 1, 31, '하느님께서 보시니 손수 만드신 모든 것이 참 좋았다. 저녁이 되고 아침이 되니 여섯째 날이었다.'),
  // Genesis 2 (19)
  v('창세기', 2, 1, '이렇게 하늘과 땅과 그 모든 것이 이루어졌다.'),
  v('창세기', 2, 2, '하느님께서는 이렛날까지 당신이 하시던 일을 다 이루셨다. 그리고 이렛날에 당신이 하시던 모든 일을 멈추고 쉬셨다.'),
  v('창세기', 2, 3, '하느님께서 이렛날에 복을 내리시고 그날을 거룩하게 하셨다. 하느님께서 창조하여 만드신 온갖 일을 멈추고 그날에 쉬셨기 때문이다.'),
  v('창세기', 2, 4, '이것이 하늘과 땅이 창조된 내력이다. 주 하느님께서 땅과 하늘을 만드시던 날,'),
  v('창세기', 2, 5, '땅에는 아직 들풀이 하나도 없고, 들녘에는 아직 풀 한 포기 돋아나지 않았다. 주 하느님께서 땅 위에 비를 내리지 않으셨고, 흙을 일구는 사람도 아직 없었기 때문이다.'),
  v('창세기', 2, 6, '그러나 물이 땅에서 솟아올라 온 땅을 적셨다.'),
  v('창세기', 2, 7, '주 하느님께서 흙의 먼지로 사람을 빚으시고, 그 코에 생명의 숨을 불어넣으시니, 사람이 생명체가 되었다.'),
  v('창세기', 2, 8, '주 하느님께서 동쪽에 있는 에덴에 동산을 일구시고 당신께서 빚으신 사람을 거기에 놓으셨다.'),
  v('창세기', 2, 9, '주 하느님께서 보기에 탐스럽고 먹기에 좋은 온갖 나무를 흙에서 자라게 하시고, 동산 한가운데에는 생명나무와 선과 악을 알게 하는 나무를 자라게 하셨다.'),
  v('창세기', 2, 10, '에덴에서 강 하나가 흘러나와 그 동산을 적시고, 거기에서 갈라져 네 줄기가 되었다.'),
  v('창세기', 2, 15, '주 하느님께서 사람을 데려다 에덴동산에 두시어, 그곳을 일구고 돌보게 하셨다.'),
  v('창세기', 2, 16, '주 하느님께서 사람에게 명령하셨다. "동산에 있는 모든 나무에서 열매를 따 먹어도 된다."'),
  v('창세기', 2, 17, '"그러나 선과 악을 알게 하는 나무에서는 따 먹으면 안 된다. 그 열매를 따 먹는 날, 너는 반드시 죽을 것이다."'),
  v('창세기', 2, 18, '주 하느님께서 말씀하셨다. "사람이 혼자 있는 것이 좋지 않으니, 그에게 알맞은 협력자를 만들어 주겠다."'),
  v('창세기', 2, 21, '그래서 주 하느님께서 사람을 깊이 잠들게 하셨다. 그가 잠든 사이에 그 갈빗대 하나를 뽑고, 그 자리를 살로 메우셨다.'),
  v('창세기', 2, 22, '주 하느님께서 사람에게서 뽑은 갈빗대로 여자를 지으시고, 그를 사람에게 데려오셨다.'),
  v('창세기', 2, 23, '사람이 말하였다. "이제야 나타났구나, 내 뼈에서 나온 뼈요, 내 살에서 나온 살이로구나."'),
  v('창세기', 2, 24, '그러므로 남자는 아버지와 어머니를 떠나 아내와 결합하여, 둘이 한 몸이 된다.'),
  v('창세기', 2, 25, '사람과 그 아내는 둘 다 벌거벗고 있었지만 부끄러워하지 않았다.'),
  // Genesis 3 (14)
  v('창세기', 3, 1, '뱀은 주 하느님께서 만드신 모든 들짐승 가운데에서 가장 간교하였다. 뱀이 여자에게 말하였다. "하느님이 정말로 동산에 있는 모든 나무에서 열매를 따 먹지 말라고 하셨느냐?"'),
  v('창세기', 3, 2, '여자가 뱀에게 대답하였다. "우리는 동산에 있는 나무 열매를 먹을 수 있다."'),
  v('창세기', 3, 3, '"그러나 동산 한가운데에 있는 나무 열매만은 하느님께서 너희는 그것을 먹어서도 안 되고 그것에 손을 대서도 안 된다, 너희가 죽지 않으려면 하고 말씀하셨다."'),
  v('창세기', 3, 4, '뱀이 여자에게 말하였다. "너희는 결코 죽지 않는다."'),
  v('창세기', 3, 5, '"하느님께서 아시는 것처럼, 너희가 그것을 먹는 날 너희 눈이 열려 하느님처럼 선과 악을 알게 될 줄을 하느님이 아시고 그렇게 말씀하신 것이다."'),
  v('창세기', 3, 6, '여자가 쳐다보니 그 나무 열매는 먹음직하고 소담스러우며 슬기롭게 해줄 만큼 탐스러웠다. 여자가 그 열매를 따서 먹고, 함께 있는 남편에게도 주자 그도 먹었다.'),
  v('창세기', 3, 7, '그러자 두 사람의 눈이 열려 자기들이 벌거벗은 것을 알고 무화과 잎을 엮어 두렁이를 만들어 입었다.'),
  v('창세기', 3, 8, '그들은 하루의 바람이 불 무렵 동산 안을 거니시는 주 하느님의 소리를 듣고, 주 하느님의 얼굴을 피하여 동산 나무 사이에 숨었다.'),
  v('창세기', 3, 9, '주 하느님께서 사람을 부르시며 그에게 말씀하셨다. "너 어디 있느냐?"'),
  v('창세기', 3, 10, '그가 대답하였다. "동산에서 당신의 소리를 듣고, 제가 벌거벗은 몸이라 두려워 숨었습니다."'),
  v('창세기', 3, 15, '"나는 너와 그 여자 사이에, 네 후손과 그 여자의 후손 사이에 적대감을 놓겠다. 그 후손은 너의 머리에 상처를 입히고 너는 그의 발꿈치에 상처를 입힐 것이다."'),
  v('창세기', 3, 19, '"너는 얼굴에 땀을 흘려야 양식을 먹을 수 있으리니, 마침내 흙으로 돌아갈 때까지 그렇게 하리라. 너는 먼지이니 먼지로 돌아가리라."'),
  v('창세기', 3, 23, '그리하여 주 하느님께서 에덴동산에서 사람을 내보내시어, 그가 나온 흙을 일구게 하셨다.'),
  v('창세기', 3, 24, '그렇게 사람을 쫓아내시고, 에덴동산 동쪽에 커룹들과 번쩍이는 불칼을 두시어 생명나무에 이르는 길을 지키게 하셨다.'),
  // Psalm 23 (6)
  v('시편', 23, 1, '주님은 나의 목자, 아쉬울 것 없어라.'),
  v('시편', 23, 2, '푸른 풀밭에 나를 쉬게 하시고 잔잔한 물가로 나를 이끄시네.'),
  v('시편', 23, 3, '내 영혼에 생기를 돋우시고 당신 이름 때문에 의로운 길로 나를 이끄시네.'),
  v('시편', 23, 4, '제가 어둠의 골짜기를 걷는다 해도 재앙을 두려워하지 않으리니 당신께서 저와 함께 계시기 때문입니다.'),
  v('시편', 23, 5, '제 원수들이 보는 앞에서 당신께서 저에게 식탁을 차려 주시고 제 머리에 기름을 부어 주시니 제 잔이 넘치나이다.'),
  v('시편', 23, 6, '한결같은 사랑과 은총이 한평생 나를 따르리니 주님의 집에서 오래오래 살리라.'),
  // Psalm 91 (16)
  v('시편', 91, 1, '지극히 높으신 분의 은밀한 곳에 사는 이는 전능하신 분의 그늘 아래 머무르리라.'),
  v('시편', 91, 2, '나 주님께 아뢰리라. "저의 피난처, 저의 산성, 제가 신뢰하는 저의 하느님!"'),
  v('시편', 91, 3, '그분께서 너를 사냥꾼의 올가미에서, 파멸의 역병에서 건져 주시리라.'),
  v('시편', 91, 4, '당신 깃으로 너를 덮으시고, 당신 날개 아래 너를 피하게 하시리니, 당신의 진리가 큰 방패, 작은 방패가 되리라.'),
  v('시편', 91, 5, '너는 밤의 공포도 두려워하지 않고, 낮에 날아오는 화살도 두려워하지 않으리라.'),
  v('시편', 91, 6, '어둠 속에 떠도는 역병도 한낮에 덮치는 재앙도 두려워하지 않으리라.'),
  v('시편', 91, 7, '네 곁에서 천 명이, 네 오른쪽에서 만 명이 쓰러져도, 너에게는 다가오지 못하리라.'),
  v('시편', 91, 8, '너는 눈으로 바라보기만 하리라. 악인들이 받는 보응을 보리라.'),
  v('시편', 91, 9, '네가 주님을 너의 피난처로, 지극히 높으신 분을 너의 처소로 삼았으니,'),
  v('시편', 91, 10, '너에게 재앙이 미치지 못하고, 네 천막에 재난이 가까이 오지 못하리라.'),
  v('시편', 91, 11, '그분께서 당신 천사들에게 너를 맡기시어, 네가 가는 모든 길에서 너를 지키게 하시리라.'),
  v('시편', 91, 12, '그들이 손으로 너를 받들어, 네 발이 돌에 부딪치지 않게 하리라.'),
  v('시편', 91, 13, '사자와 살무사를 네가 밟고, 젊은 사자와 큰 뱀을 짓이기리라.'),
  v('시편', 91, 14, '"그가 나에게 매달렸으니 내가 그를 구해 주리라. 그가 내 이름을 알았으니 내가 그를 높이 올리리라."'),
  v('시편', 91, 15, '"그가 나를 부르면 내가 그에게 응답하리라. 고난 중에 내가 그와 함께 있으며, 그를 구해 주고 영광스럽게 하리라."'),
  v('시편', 91, 16, '"오랜 삶으로 그를 배불리고, 나의 구원을 그에게 보여 주리라."'),
  // Psalm 150 (6)
  v('시편', 150, 1, '할렐루야! 하느님을 그 성소에서 찬양하여라. 그분을 그 힘찬 궁창에서 찬양하여라.'),
  v('시편', 150, 2, '그분을 그 업적 때문에 찬양하여라. 그분을 그 크신 위엄 때문에 찬양하여라.'),
  v('시편', 150, 3, '그분을 나팔을 불어 찬양하여라. 그분을 비파와 수금으로 찬양하여라.'),
  v('시편', 150, 4, '그분을 북치며 춤추어 찬양하여라. 그분을 현악기와 피리로 찬양하여라.'),
  v('시편', 150, 5, '그분을 소리 높은 심벌즈로 찬양하여라. 그분을 울려 퍼지는 심벌즈로 찬양하여라.'),
  v('시편', 150, 6, '숨 쉬는 것마다 주님을 찬양하여라. 할렐루야!'),
  // Matthew 5 (10)
  v('마태오', 5, 1, '예수님께서 군중을 보시고 산에 오르셨다. 그분께서 자리에 앉으시자 제자들이 그분께 다가왔다.'),
  v('마태오', 5, 2, '예수님께서 입을 여시어 그들을 가르치셨다.'),
  v('마태오', 5, 3, '"행복하여라, 마음이 가난한 사람들! 하늘 나라가 그들의 것이다."'),
  v('마태오', 5, 4, '"행복하여라, 슬퍼하는 사람들! 그들은 위로를 받을 것이다."'),
  v('마태오', 5, 5, '"행복하여라, 온유한 사람들! 그들은 땅을 차지할 것이다."'),
  v('마태오', 5, 6, '"행복하여라, 의로움에 주리고 목마른 사람들! 그들은 흡족해질 것이다."'),
  v('마태오', 5, 7, '"행복하여라, 자비로운 사람들! 그들은 자비를 입을 것이다."'),
  v('마태오', 5, 8, '"행복하여라, 마음이 깨끗한 사람들! 그들은 하느님을 볼 것이다."'),
  v('마태오', 5, 9, '"행복하여라, 평화를 이루는 사람들! 그들은 하느님의 자녀라 불릴 것이다."'),
  v('마태오', 5, 10, '"행복하여라, 의로움 때문에 박해를 받는 사람들! 하늘 나라가 그들의 것이다."'),
  // Mark 1 (14)
  v('마르코', 1, 1, '하느님의 아들 예수 그리스도의 복음의 시작.'),
  v('마르코', 1, 2, '이사야 예언서에 이렇게 쓰여 있다. "보라, 내가 네 앞에 내 사자를 보내니 그가 네 길을 닦으리라."'),
  v('마르코', 1, 3, '"광야에서 외치는 이의 소리, 주님의 길을 마련하여라, 그분의 길을 곧게 내어라."'),
  v('마르코', 1, 4, '세례자 요한이 광야에 나타나, 죄의 용서를 위한 회개의 세례를 선포하였다.'),
  v('마르코', 1, 5, '온 유다 지방과 예루살렘의 모든 주민이 그에게 나가 자기 죄를 고백하며 요르단 강에서 그에게 세례를 받았다.'),
  v('마르코', 1, 6, '요한은 낙타 털옷을 입고 허리에 가죽 띠를 두르고, 메뚜기와 들꿀을 먹었다.'),
  v('마르코', 1, 7, '그는 이렇게 선포하였다. "나보다 더 큰 능력을 지니신 분이 내 뒤에 오신다. 나는 몸을 굽혀 그분의 신발 끈을 풀어 드릴 자격도 없다."'),
  v('마르코', 1, 8, '"나는 너희에게 물로 세례를 주었지만, 그분께서는 너희에게 성령으로 세례를 주실 것이다."'),
  v('마르코', 1, 9, '그 무렵에 예수님께서 갈릴래아 나자렛에서 오시어, 요르단 강에서 요한에게 세례를 받으셨다.'),
  v('마르코', 1, 10, '그분께서 물에서 올라오실 때, 하늘이 갈라지며 성령이 비둘기 같은 모습으로 당신 위에 내려오시는 것을 보셨다.'),
  v('마르코', 1, 11, '그때 하늘에서 소리가 들려왔다. "너는 내가 사랑하는 아들, 내 마음에 드는 아들이다."'),
  v('마르코', 1, 12, '그때에 성령께서 곧 예수님을 광야로 내보내셨다.'),
  v('마르코', 1, 14, '요한이 잡힌 뒤에 예수님께서 갈릴래아에 오시어 하느님의 복음을 선포하셨다.'),
  v('마르코', 1, 15, '"때가 차서 하느님의 나라가 가까이 왔다. 회개하고 복음을 믿어라."'),
  // Luke 1 (12)
  v('루카', 1, 1, '우리 가운데에서 이루어진 일들의 이야기를 엮어 보려고 많은 사람이 손을 대었습니다.'),
  v('루카', 1, 2, '처음부터 목격자이며 말씀의 봉사자가 된 이들이 우리에게 전해 준 대로,'),
  v('루카', 1, 3, '나도 모든 것을 처음부터 자세히 살펴보고 나서, 존경하는 테오필로스 님, 각하께 차례대로 써 드리는 것이 좋겠다고 생각하였습니다.'),
  v('루카', 1, 4, '이는 각하께서 배우신 것이 확실한 사실임을 알게 해 드리려는 것입니다.'),
  v('루카', 1, 26, '여섯째 달에 천사 가브리엘이 하느님께서 보내시어, 갈릴래아 지방 나자렛이라는 고을로 갔다.'),
  v('루카', 1, 27, '다윗 집안의 요셉이라는 사람과 약혼한 처녀를 찾아간 것이다. 그 처녀의 이름은 마리아였다.'),
  v('루카', 1, 28, '천사가 마리아의 집에 들어가 말하였다. "은총이 가득한 이여, 기뻐하여라. 주님께서 너와 함께 계시다."'),
  v('루카', 1, 29, '이 말에 마리아는 몹시 놀라며 이 인사가 무슨 뜻인가 하고 곰곰이 생각하였다.'),
  v('루카', 1, 30, '천사가 다시 마리아에게 말하였다. "두려워하지 마라, 마리아야. 너는 하느님의 총애를 받았다."'),
  v('루카', 1, 31, '"보라, 이제 네가 잉태하여 아들을 낳을 터이니 그 이름을 예수라 하여라."'),
  v('루카', 1, 32, '"그분께서는 큰 인물이 되시고, 지극히 높으신 분의 아드님이라 불리실 것이다."'),
  v('루카', 1, 46, '마리아가 말하였다. "내 영혼이 주님을 찬송하고"'),
  v('루카', 1, 47, '"내 구원자 하느님 안에서 내 마음이 기뻐 뛰나이다."'),
  v('루카', 1, 48, '"그분께서 당신 종의 비천함을 굽어보셨기 때문입니다. 이제부터 과연 모든 세대가 나를 행복하다 하리이다."'),
  // John 1 (14)
  v('요한', 1, 1, '한처음에 말씀이 계셨다. 말씀은 하느님과 함께 계셨는데 말씀은 하느님이셨다.'),
  v('요한', 1, 2, '그분께서는 한처음에 하느님과 함께 계셨다.'),
  v('요한', 1, 3, '모든 것이 그분을 통하여 생겨났고 그분 없이 생겨난 것은 하나도 없다.'),
  v('요한', 1, 4, '그분 안에 생명이 있었으니 그 생명은 사람들의 빛이었다.'),
  v('요한', 1, 5, '그 빛이 어둠 속에서 비치고 있지만 어둠은 그를 깨닫지 못하였다.'),
  v('요한', 1, 6, '하느님께서 보내신 사람이 있었는데 그의 이름은 요한이었다.'),
  v('요한', 1, 7, '그는 증언하러 왔다. 빛을 증언하여 자기를 통해 모든 사람이 믿게 하려는 것이었다.'),
  v('요한', 1, 8, '그 사람은 빛이 아니었다. 빛을 증언하러 왔을 따름이다.'),
  v('요한', 1, 9, '모든 사람을 비추는 참빛이 세상에 오고 있었다.'),
  v('요한', 1, 10, '그분께서 세상에 계셨고 세상이 그분을 통하여 생겨났지만 세상은 그분을 알아보지 못하였다.'),
  v('요한', 1, 11, '그분께서 당신 땅에 오셨지만 그분의 백성은 그분을 맞아들이지 않았다.'),
  v('요한', 1, 12, '그분을 맞아들인 이들, 그분의 이름을 믿는 모든 이에게 하느님의 자녀가 되는 권한을 주셨다.'),
  v('요한', 1, 13, '그들은 혈통이나 육욕이나 사람의 욕망에서가 아니라 하느님에게서 태어났다.'),
  v('요한', 1, 14, '말씀이 사람이 되시어 우리 가운데 사셨다. 우리는 그분의 영광을 보았다. 은총과 진리가 충만하신 아버지의 외아들의 영광을.'),
];

// ── Daily Mass (7 days) ──
const dailyMass: Record<string, unknown>[] = [
  {
    date: '2026-03-10', liturgicalSeason: '사순 제2주간 화요일', liturgicalColor: '보라색',
    firstReadingRef: '이사야 1,10.16-20',
    firstReadingText: '주 하느님이 말한다. 소돔의 통치자들아, 주님의 말씀을 들어라. 고모라의 백성아, 우리 하느님의 가르침에 귀를 기울여라. 너희 손이 피로 가득하다. 몸을 씻어 깨끗이 하여라. 내 눈앞에서 너희의 악한 행실을 치워 버려라. 악행을 그만두어라. 선행을 배워라. 공정을 추구하여라.',
    psalmRef: '시편 50(49),8-9.16ㄴㅂ-17.21.23',
    psalmResponse: '올바른 길을 걷는 이에게, 하느님의 구원을 보여 주리라.',
    secondReadingRef: null, secondReadingText: null,
    gospelAcclamation: '주님의 말씀은 참되고 그분의 모든 행위는 성실하시다.',
    gospelRef: '마태오 23,1-12',
    gospelText: '그때에 예수님께서 군중과 제자들에게 말씀하셨다. "율법 학자들과 바리사이들은 모세의 자리에 앉아 있다. 그러니 그들이 너희에게 말하는 것은 다 실행하고 지켜라. 그러나 그들의 행실은 따라 하지 마라."',
  },
  {
    date: '2026-03-09', liturgicalSeason: '사순 제2주간 월요일', liturgicalColor: '보라색',
    firstReadingRef: '다니엘 9,4ㄴ-10',
    firstReadingText: '주님, 크고 두려운 하느님, 당신을 사랑하고 당신의 계명을 지키는 이들에게 계약을 지키시고 자애를 베푸시는 분.',
    psalmRef: '시편 79(78),8.9.11.13',
    psalmResponse: '주님, 자비로 우리를 대하소서.',
    secondReadingRef: null, secondReadingText: null,
    gospelAcclamation: '주님의 말씀은 영원히 살아 있고 온 세상에 퍼져 나간다.',
    gospelRef: '루카 6,36-38',
    gospelText: '그때에 예수님께서 제자들에게 말씀하셨다. "너희 아버지께서 자비하신 것처럼 너희도 자비로운 사람이 되어라. 남을 심판하지 마라. 그러면 너희도 심판받지 않을 것이다."',
  },
  {
    date: '2026-03-08', liturgicalSeason: '사순 제2주일', liturgicalColor: '보라색',
    firstReadingRef: '창세기 15,5-12.17-18',
    firstReadingText: '주님께서 아브람을 밖으로 데리고 나가시며 말씀하셨다. "하늘을 쳐다보아라. 네가 셀 수 있거든 저 별들을 세어 보아라. 네 후손이 저렇게 많아질 것이다."',
    psalmRef: '시편 27(26),1.7-8.8ㄴ-9.13-14',
    psalmResponse: '주님은 나의 빛, 나의 구원.',
    secondReadingRef: '필리피 3,17─4,1',
    secondReadingText: '형제 여러분, 여러분은 함께 나를 본받는 사람이 되십시오. 또 우리를 본보기로 삼아 그대로 사는 이들을 눈여겨보십시오. 우리의 본국은 하늘에 있습니다. 우리는 거기에서 오실 구원자 주 예수 그리스도를 기다리고 있습니다.',
    gospelAcclamation: '빛나는 구름 속에서 아버지의 목소리가 들렸다. "이는 내가 사랑하는 아들, 너희는 그의 말을 들어라."',
    gospelRef: '루카 9,28ㄴ-36',
    gospelText: '예수님께서 베드로와 요한과 야고보를 데리고 기도하러 산에 올라가셨다. 예수님께서 기도하시는 동안에 그 얼굴 모습이 달라지고 그 옷이 하얗게 번쩍였다.',
  },
  {
    date: '2026-03-07', liturgicalSeason: '사순 제1주간 토요일', liturgicalColor: '보라색',
    firstReadingRef: '신명기 26,16-19',
    firstReadingText: '모세가 이스라엘 백성에게 말하였다. 오늘 주 너의 하느님께서 너에게 이 규정과 법규를 실행하라고 명령하신다.',
    psalmRef: '시편 119(118),1-2.4-5.7-8',
    psalmResponse: '행복하여라, 주님의 가르침대로 걸어가는 이들!',
    secondReadingRef: null, secondReadingText: null,
    gospelAcclamation: '너희는 완전한 사람이 되어라. 하늘의 너희 아버지께서 완전하신 것처럼.',
    gospelRef: '마태오 5,43-48',
    gospelText: '예수님께서 제자들에게 말씀하셨다. "너희는 원수를 사랑하여라. 너희를 박해하는 자들을 위하여 기도하여라."',
  },
  {
    date: '2026-03-06', liturgicalSeason: '사순 제1주간 금요일', liturgicalColor: '보라색',
    firstReadingRef: '에제키엘 18,21-28',
    firstReadingText: '주 하느님이 말한다. 악인이라도 자기가 저지른 모든 죄에서 돌아서서 나의 모든 규정을 지키고 공정과 의로움을 실천하면, 반드시 살 것이다.',
    psalmRef: '시편 130(129),1-2.3-4.5-7ㄱ.7ㄴ-8',
    psalmResponse: '주님께서 자비를 베푸시고 넘치는 속량을 베푸시리라.',
    secondReadingRef: null, secondReadingText: null,
    gospelAcclamation: '네 마음에서 모든 죄를 떨쳐 버리고 새 마음과 새 영을 가져라.',
    gospelRef: '마태오 5,20-26',
    gospelText: '예수님께서 제자들에게 말씀하셨다. "너희의 의로움이 율법 학자들과 바리사이들의 의로움을 능가하지 않으면, 결코 하늘 나라에 들어가지 못할 것이다."',
  },
  {
    date: '2026-03-05', liturgicalSeason: '사순 제1주간 목요일', liturgicalColor: '보라색',
    firstReadingRef: '에스테르(보충) 4,17ㄴ.17ㅁ-17ㅂ.17ㅈ',
    firstReadingText: '주님, 저희를 도우소서. 당신의 유산을 남에게 내주지 마소서.',
    psalmRef: '시편 138(137),1-2ㄱ.2ㄴㅂ-3.7ㄴ-8',
    psalmResponse: '제가 부르짖는 날 응답하셨나이다.',
    secondReadingRef: null, secondReadingText: null,
    gospelAcclamation: '청하여라, 받을 것이다. 찾아라, 얻을 것이다. 문을 두드려라, 열릴 것이다.',
    gospelRef: '마태오 7,7-12',
    gospelText: '예수님께서 제자들에게 말씀하셨다. "청하여라, 너희에게 주실 것이다. 찾아라, 너희가 얻을 것이다. 문을 두드려라, 너희에게 열릴 것이다."',
  },
  {
    date: '2026-03-04', liturgicalSeason: '사순 제1주간 수요일', liturgicalColor: '보라색',
    firstReadingRef: '요나 3,1-10',
    firstReadingText: '주님의 말씀이 요나에게 내렸다. "일어나 저 큰 도성 니느웨로 가서, 내가 너에게 이르는 말을 그곳에 선포하여라."',
    psalmRef: '시편 51(50),3-4.12-13.18-19',
    psalmResponse: '하느님이시여, 제 마음을 깨끗이 만들어 주소서.',
    secondReadingRef: null, secondReadingText: null,
    gospelAcclamation: '요나가 니느웨 사람들에게 표징이 된 것처럼, 사람의 아들도 이 세대에게 표징이 될 것이다.',
    gospelRef: '루카 11,29-32',
    gospelText: '군중이 모여들자 예수님께서 말씀하기 시작하셨다. "이 세대는 악한 세대다. 이 세대가 표징을 요구하지만 요나 예언자의 표징밖에는 어떠한 표징도 받지 못할 것이다."',
  },
];

// ── Saints (25) ──
const saints: Record<string, unknown>[] = [
  { name: '심플리치오', feastDate: '3월 10일', description: '교황 심플리치오(468-483)는 서로마 제국 멸망 시기에 교회를 이끌었다.' },
  { name: '마크레도니오', feastDate: '3월 10일', description: '시리아의 은수자로 40년간 수도 생활을 하였다.' },
  { name: '가에타노 에라모', feastDate: '3월 10일', description: '이탈리아의 복자로 가난한 이들을 위해 헌신하였다.' },
  { name: '아우렐리오', feastDate: '3월 10일', description: '카르타고의 주교로 교회 일치를 위해 힘썼다.' },
  { name: '프란치스코 하비에르', feastDate: '12월 3일', description: '예수회 선교사로 아시아에 복음을 전한 성인. 한국 가톨릭의 수호성인.' },
  { name: '김대건 안드레아', feastDate: '9월 20일', description: '한국 최초의 사제이자 순교자. 1984년 시성.' },
  { name: '정하상 바오로', feastDate: '9월 20일', description: '조선시대 평신도 지도자로 순교하였다.' },
  { name: '이성례 마리아', feastDate: '9월 20일', description: '한국 103위 순교 성인 중 한 분.' },
  { name: '토마스 아퀴나스', feastDate: '1월 28일', description: '중세 최고의 신학자이자 철학자. 신학대전의 저자.' },
  { name: '아씨시의 프란치스코', feastDate: '10월 4일', description: '작은형제회(프란치스코회) 창설자. 가난과 평화의 성인.' },
  { name: '클라라', feastDate: '8월 11일', description: '아씨시의 성녀 클라라. 가난한 자매회(클라라회) 창설자.' },
  { name: '데레사(아빌라)', feastDate: '10월 15일', description: '아빌라의 성녀 데레사. 가르멜 수도회 개혁자이자 교회학자.' },
  { name: '소화 데레사', feastDate: '10월 1일', description: '리지외의 성녀 데레사. "작은 길"의 영성으로 유명한 교회학자.' },
  { name: '요셉', feastDate: '3월 19일', description: '성모 마리아의 배필이자 예수님의 양부. 보편 교회의 수호자.' },
  { name: '베네딕토', feastDate: '7월 11일', description: '서방 수도 생활의 아버지. 베네딕토 수도회 창설자.' },
  { name: '이냐시오 데 로욜라', feastDate: '7월 31일', description: '예수회(소시에타스 예수) 창설자.' },
  { name: '아우구스티노', feastDate: '8월 28일', description: '히포의 주교. 서방 교회의 위대한 교부이자 교회학자.' },
  { name: '패트릭', feastDate: '3월 17일', description: '아일랜드의 사도. 아일랜드에 그리스도교를 전파한 성인.' },
  { name: '안토니오(파도바)', feastDate: '6월 13일', description: '파도바의 성 안토니오. 설교가이자 교회학자.' },
  { name: '빈첸시오 아 바오로', feastDate: '9월 27일', description: '자선 사업과 사제 양성에 헌신한 성인. 사랑의 딸회 공동 창설자.' },
  { name: '요한 바오로 2세', feastDate: '10월 22일', description: '제264대 교황. 폴란드 출신으로 20세기 가장 영향력 있는 교황.' },
  { name: '막시밀리아노 콜베', feastDate: '8월 14일', description: '아우슈비츠에서 다른 수감자를 대신하여 죽은 순교자.' },
  { name: '마더 데레사(콜카타)', feastDate: '9월 5일', description: '콜카타의 성녀 데레사. 사랑의 선교회 창설자.' },
  { name: '피오 신부', feastDate: '9월 23일', description: '오상을 받은 카푸친 작은형제회 사제.' },
  { name: '루치아', feastDate: '12월 13일', description: '시라쿠사의 동정 순교자. 눈의 수호성인.' },
];

// ── News (18) ──
const news: Record<string, unknown>[] = [
  { title: '교황 "사순시기, 회개와 자선의 때"', summary: '프란치스코 교황이 사순시기를 맞아 신자들에게 회개와 자선을 촉구하는 메시지를 발표했다.', source: '가톨릭평화신문', createdAt: '2026-03-10' },
  { title: '서울대교구, 2027 세계청년대회 준비위 출범', summary: '서울대교구가 2027년 서울 세계청년대회 준비위원회를 공식 출범시켰다.', source: '가톨릭신문', createdAt: '2026-03-09' },
  { title: '전국 본당 사순 특별 전례 풍성', summary: '사순시기를 맞아 전국 본당에서 다양한 특별 전례와 신심행사가 진행되고 있다.', source: '가톨릭평화신문', createdAt: '2026-03-08' },
  { title: '주교회의, AI 윤리 가이드라인 발표', summary: '한국천주교주교회의가 인공지능 기술의 윤리적 사용에 대한 가이드라인을 발표했다.', source: '가톨릭신문', createdAt: '2026-03-07' },
  { title: '가톨릭 대학생 연합 봉사단 발대식', summary: '전국 가톨릭 대학생 연합 봉사단이 올해 활동을 시작하는 발대식을 가졌다.', source: '가톨릭평화신문', createdAt: '2026-03-06' },
  { title: '교구장 사제 서품식 거행', summary: '서울대교구에서 새 사제 5명의 서품식이 거행되었다.', source: '가톨릭신문', createdAt: '2026-03-05' },
  { title: '전국 순교지 성지순례 프로그램 확대', summary: '올해부터 전국 순교 성지 순례 프로그램이 확대 운영된다.', source: '가톨릭평화신문', createdAt: '2026-03-04' },
  { title: '가톨릭 청년 일자리 박람회 개최', summary: '가톨릭 사회복지 기관들이 참여하는 청년 일자리 박람회가 열린다.', source: '가톨릭신문', createdAt: '2026-03-03' },
  { title: '교황청, 시노달리타스 2차 총회 결과 발표', summary: '교황청이 시노달리타스에 관한 세계주교대의원회의 2차 총회 최종 문서를 발표했다.', source: '가톨릭평화신문', createdAt: '2026-03-02' },
  { title: '한국 가톨릭 신자 수 600만 돌파', summary: '한국천주교 신자 수가 처음으로 600만 명을 넘어섰다는 통계가 발표되었다.', source: '가톨릭신문', createdAt: '2026-03-01' },
  { title: '명동성당 보존 복원 사업 착공', summary: '명동대성당 문화재 보존 복원 사업이 본격적으로 시작되었다.', source: '가톨릭평화신문', createdAt: '2026-02-28' },
  { title: '가톨릭 사회교리 온라인 강좌 개설', summary: '한국천주교중앙협의회에서 가톨릭 사회교리 온라인 강좌를 새로 개설했다.', source: '가톨릭신문', createdAt: '2026-02-27' },
  { title: '전국 성체조배 운동 확산', summary: '전국 본당에서 24시간 성체조배 운동이 확산되고 있다.', source: '가톨릭평화신문', createdAt: '2026-02-26' },
  { title: '교황, 새 추기경 12명 서임', summary: '프란치스코 교황이 새로운 추기경 12명을 서임하는 추기경회의를 개최했다.', source: '가톨릭신문', createdAt: '2026-02-25' },
  { title: '가톨릭 미디어 혁신 포럼 개최', summary: '가톨릭 미디어의 디지털 혁신을 주제로 한 포럼이 개최되었다.', source: '가톨릭평화신문', createdAt: '2026-02-24' },
  { title: 'WYD 서울 2027 자원봉사자 모집 시작', summary: '2027 서울 세계청년대회 자원봉사자 모집이 공식적으로 시작되었다.', source: '가톨릭신문', createdAt: '2026-02-23' },
  { title: '한국 순교자 현양 특별전 개최', summary: '절두산 순교성지에서 한국 순교자 현양 특별전이 열리고 있다.', source: '가톨릭평화신문', createdAt: '2026-02-22' },
  { title: '가톨릭 환경운동 "찬미받으소서" 캠페인 확대', summary: '교황 회칙 "찬미받으소서"에 기반한 환경운동 캠페인이 전국으로 확대되고 있다.', source: '가톨릭신문', createdAt: '2026-02-21' },
];

// ── Visitors (7) ──
const visitors: Record<string, unknown>[] = [
  { visitDate: '2026-03-10', count: 1234 },
  { visitDate: '2026-03-09', count: 1567 },
  { visitDate: '2026-03-08', count: 1890 },
  { visitDate: '2026-03-07', count: 1345 },
  { visitDate: '2026-03-06', count: 1456 },
  { visitDate: '2026-03-05', count: 1678 },
  { visitDate: '2026-03-04', count: 1123 },
];

// ── Banners (5) ──
const banners: Record<string, unknown>[] = [
  { title: '2026 부활 평화마켓', subtitle: '다양한 수공예품과 먹거리를 만나보세요', dateText: '2026. 3. 21(토) 12-18시', location: '청년문화공간JU 1층 카페', bgColor: '#f5efe5', isActive: true, sortOrder: 1 },
  { title: '어른들을 위한 성경공부', subtitle: '성경의 핵심을 쉽고 깊이 있게 배우는 시간', dateText: '상반기 19기: 4월 9일~', location: '교육 방법: Zoom 교육', bgColor: '#e8f4e8', isActive: true, sortOrder: 2 },
  { title: '2027 서울 세계청년대회', subtitle: '전 세계 청년들이 서울에서 만납니다', dateText: '함께 준비하는 WYD 서울', location: '', bgColor: '#1a3a6b', isActive: true, sortOrder: 3 },
  { title: '사순시기 특별 강좌', subtitle: '사순시기의 의미와 실천을 함께 나눕니다', dateText: '매주 수요일 저녁 7시', location: '명동대성당 꼰솔라따홀', bgColor: '#f0e0d0', isActive: true, sortOrder: 4 },
  { title: '가톨릭 청년 봉사단 모집', subtitle: '함께 나누는 기쁨, 청년 봉사단에 참여하세요', dateText: '3월 15일 마감', location: '지원: youth.catholic.or.kr', bgColor: '#e0e8f0', isActive: true, sortOrder: 5 },
];

// ── Quick Links (10) ──
const quickLinks: Record<string, unknown>[] = [
  { label: '매일미사', icon: '⛪', url: 'mass.html', sortOrder: 1 },
  { label: '성무일도', icon: '📿', url: 'prayers.html', sortOrder: 2 },
  { label: '성경', icon: '✝️', url: 'bible.html', sortOrder: 3 },
  { label: '기도문', icon: '🙏', url: 'prayers.html', sortOrder: 4 },
  { label: '가톨릭대사전', icon: '📚', url: 'bible.html', sortOrder: 5 },
  { label: '7성사', icon: '✟', url: 'saints.html', sortOrder: 6 },
  { label: '가톨릭성인', icon: '👼', url: 'saints.html', sortOrder: 7 },
  { label: '소리주보', icon: '🔊', url: 'hymns.html', sortOrder: 8 },
  { label: '가톨릭성가', icon: '🎵', url: 'hymns.html', sortOrder: 9 },
  { label: 'WYD', icon: '🌍', url: 'index.html', sortOrder: 10 },
];

// ── Hymns (35) ──
const hymns: Record<string, unknown>[] = [
  { number: 101, title: '하늘 높이 계신 분이', lyricsFirstLine: '하늘 높이 계신 분이 아래로 내려오사', category: '입당' },
  { number: 102, title: '여기에 모인 우리', lyricsFirstLine: '여기에 모인 우리 주님의 백성일세', category: '입당' },
  { number: 103, title: '이 기쁜 소식을', lyricsFirstLine: '이 기쁜 소식을 만백성에게 전하세', category: '입당' },
  { number: 104, title: '다함께 노래하세', lyricsFirstLine: '다함께 노래하세 주 찬양하세', category: '입당' },
  { number: 105, title: '구원의 하느님', lyricsFirstLine: '구원의 하느님 주님께 영광', category: '입당' },
  { number: 106, title: '기쁘다 구세주 오셨네', lyricsFirstLine: '기쁘다 구세주 오셨네 만백성 맞으라', category: '입당' },
  { number: 201, title: '봉헌하오니', lyricsFirstLine: '봉헌하오니 하느님 아버지', category: '봉헌' },
  { number: 202, title: '이 제물을', lyricsFirstLine: '이 제물을 받으소서 주님', category: '봉헌' },
  { number: 203, title: '빵과 포도주', lyricsFirstLine: '빵과 포도주 봉헌하나이다', category: '봉헌' },
  { number: 204, title: '주님의 식탁 위에', lyricsFirstLine: '주님의 식탁 위에 빵과 술을 드리오니', category: '봉헌' },
  { number: 205, title: '받아주소서', lyricsFirstLine: '하느님 아버지 이 예물 받아주소서', category: '봉헌' },
  { number: 301, title: '하느님의 어린양', lyricsFirstLine: '하느님의 어린양 세상의 죄를 없애시는', category: '영성체' },
  { number: 302, title: '사랑의 빵', lyricsFirstLine: '주님은 사랑의 빵 영원한 생명의 빵', category: '영성체' },
  { number: 303, title: '생명의 양식', lyricsFirstLine: '생명의 양식 주님의 몸과 피', category: '영성체' },
  { number: 304, title: '주님 한 말씀만', lyricsFirstLine: '주님 한 말씀만 하시면 제 영혼이 나으리이다', category: '영성체' },
  { number: 305, title: '오 거룩하신 잔치여', lyricsFirstLine: '오 거룩하신 잔치여 그리스도를 받아 모시는', category: '영성체' },
  { number: 401, title: '파견의 노래', lyricsFirstLine: '이제 우리 주님 말씀 따라 세상 속으로', category: '파견' },
  { number: 402, title: '주님의 봉사자', lyricsFirstLine: '주님의 봉사자 주님의 일꾼으로', category: '파견' },
  { number: 403, title: '평화의 기도', lyricsFirstLine: '나를 평화의 도구로 써 주소서', category: '파견' },
  { number: 404, title: '주의 사랑 안에', lyricsFirstLine: '주의 사랑 안에 살리라', category: '파견' },
  { number: 501, title: '성모찬가', lyricsFirstLine: '마리아 은총이 가득하신 분', category: '성모' },
  { number: 502, title: '아베 마리아', lyricsFirstLine: '아베 아베 아베 마리아', category: '성모' },
  { number: 503, title: '성모님의 노래', lyricsFirstLine: '내 영혼이 주님을 찬송하며', category: '성모' },
  { number: 504, title: '로사리오의 성모님', lyricsFirstLine: '로사리오의 성모님 저희를 위하여 빌어주소서', category: '성모' },
  { number: 505, title: '파티마의 성모님', lyricsFirstLine: '파티마의 성모님 도우소서', category: '성모' },
  { number: 601, title: '주님 저를 이끄소서', lyricsFirstLine: '주님 저를 이끄소서 어디로든지', category: '사순' },
  { number: 602, title: '십자가의 길', lyricsFirstLine: '십자가의 길을 걸으며 주님 수난 묵상하네', category: '사순' },
  { number: 603, title: '자비를 베푸소서', lyricsFirstLine: '주님 자비를 베푸소서 저희에게', category: '사순' },
  { number: 604, title: '회개하라', lyricsFirstLine: '회개하라 하늘 나라가 가까이 왔다', category: '사순' },
  { number: 605, title: '오소서 성령이여', lyricsFirstLine: '오소서 성령이여 마리아의 청함으로', category: '사순' },
  { number: 606, title: '눈물의 골짜기', lyricsFirstLine: '눈물의 골짜기에서 주님을 부릅니다', category: '사순' },
  { number: 607, title: '주님의 십자가', lyricsFirstLine: '주님의 십자가 지고 가는 길에', category: '사순' },
  { number: 701, title: '알렐루야', lyricsFirstLine: '알렐루야 알렐루야 알렐루야', category: '부활' },
  { number: 702, title: '부활의 노래', lyricsFirstLine: '부활하신 주님께 영광 드리세', category: '부활' },
  { number: 703, title: '그리스도 부활하셨네', lyricsFirstLine: '그리스도 부활하셨네 알렐루야', category: '부활' },
];

// ── Prayers (15) ──
const prayers: Record<string, unknown>[] = [
  { title: '성호경', content: '성부와 성자와 성령의 이름으로. 아멘.', category: '기본기도' },
  { title: '주님의 기도', content: '하늘에 계신 우리 아버지, 아버지의 이름이 거룩히 빛나시며 아버지의 나라가 오시며 아버지의 뜻이 하늘에서와 같이 땅에서도 이루어지소서. 오늘 저희에게 일용할 양식을 주시고 저희에게 잘못한 이를 저희가 용서하오니 저희 죄를 용서하시고 저희를 유혹에 빠지지 않게 하시고 악에서 구하소서. 아멘.', category: '기본기도' },
  { title: '성모송', content: '은총이 가득하신 마리아님, 기뻐하소서. 주님께서 함께 계시니 여인 중에 복되시며 태중의 아들 예수님 또한 복되시나이다. 천주의 성모 마리아님, 이제와 저희 죽을 때에 저희 죄인을 위하여 빌어주소서. 아멘.', category: '기본기도' },
  { title: '사도신경', content: '전능하신 천주 성부 천지의 창조주를 저는 믿나이다. 그 외아들 우리 주 예수 그리스도님, 성령으로 인하여 동정 마리아에게서 나시고 본시오 빌라도 통치 아래서 고난을 받으시고 십자가에 못 박혀 돌아가시고 묻히셨으며 저승에 가시어 사흗날에 죽은 이들 가운데서 부활하시고 하늘에 올라 전능하신 천주 성부 오른편에 앉으시며 그리로부터 산 이와 죽은 이를 심판하러 오시리라 믿나이다. 성령을 믿으며 거룩하고 보편된 교회와 모든 성인의 통공을 믿으며 죄의 용서와 육신의 부활을 믿으며 영원한 삶을 믿나이다. 아멘.', category: '기본기도' },
  { title: '영광송', content: '영광이 성부와 성자와 성령께 처음과 같이 이제와 항상 영원히. 아멘.', category: '기본기도' },
  { title: '고백기도', content: '전능하신 하느님과 형제자매 여러분에게 고백하오니 생각과 말과 행위로 죄를 짓고 의무를 소홀히 하였나이다. 제 탓이옵니다 제 탓이옵니다 저의 큰 탓이옵니다. 그러므로 간절히 바라오니 평생 동정이신 성모 마리아와 모든 천사와 성인과 형제자매 여러분은 저를 위하여 하느님께 빌어주소서.', category: '기본기도' },
  { title: '삼종기도', content: '주님의 천사가 마리아에게 아뢰니 성령으로 잉태하셨나이다. 성모송. 주님의 종이오니 말씀대로 이루어지이다. 성모송. 말씀이 사람이 되시어 저희 가운데 사셨나이다. 성모송. 천주의 성모님, 저희를 위하여 빌어주소서. 그리스도의 약속을 받을 자격이 있는 사람이 되게 하소서.', category: '성모기도' },
  { title: '묵주기도 - 환희의 신비', content: '제1신비: 마리아께서 예수님을 잉태하심을 묵상합시다.\n제2신비: 마리아께서 엘리사벳을 방문하심을 묵상합시다.\n제3신비: 예수님께서 베들레헴에서 탄생하심을 묵상합시다.\n제4신비: 예수님을 성전에 봉헌하심을 묵상합시다.\n제5신비: 잃으셨던 예수님을 성전에서 찾으심을 묵상합시다.', category: '묵주기도' },
  { title: '묵주기도 - 고통의 신비', content: '제1신비: 예수님께서 겟세마니에서 피땀 흘리심을 묵상합시다.\n제2신비: 예수님께서 매맞으심을 묵상합시다.\n제3신비: 예수님께서 가시관 씌움을 받으심을 묵상합시다.\n제4신비: 예수님께서 십자가를 지심을 묵상합시다.\n제5신비: 예수님께서 십자가에 못 박혀 돌아가심을 묵상합시다.', category: '묵주기도' },
  { title: '묵주기도 - 영광의 신비', content: '제1신비: 예수님께서 부활하심을 묵상합시다.\n제2신비: 예수님께서 승천하심을 묵상합시다.\n제3신비: 성령이 강림하심을 묵상합시다.\n제4신비: 마리아께서 하늘에 올림을 받으심을 묵상합시다.\n제5신비: 마리아께서 하늘과 땅의 모후로 뽑히심을 묵상합시다.', category: '묵주기도' },
  { title: '묵주기도 - 빛의 신비', content: '제1신비: 예수님께서 요르단 강에서 세례를 받으심을 묵상합시다.\n제2신비: 예수님께서 가나의 혼인잔치에서 첫 기적을 행하심을 묵상합시다.\n제3신비: 예수님께서 하느님 나라를 선포하심을 묵상합시다.\n제4신비: 예수님께서 거룩하게 변모하심을 묵상합시다.\n제5신비: 예수님께서 성체성사를 세우심을 묵상합시다.', category: '묵주기도' },
  { title: '식사 전 기도', content: '주님, 이 음식을 주심을 감사하며 주님의 은혜로 저희가 이 음식을 받게 하시고 굶주리는 모든 이에게도 음식을 베풀어 주소서. 우리 주 그리스도를 통하여 비나이다. 아멘.', category: '생활기도' },
  { title: '식사 후 기도', content: '전능하신 하느님, 이 은혜에 감사드리며 주님의 자비로 세상을 떠난 신자들에게 영원한 안식을 주소서. 아멘.', category: '생활기도' },
  { title: '아침기도', content: '주님, 새 아침을 주심을 감사드립니다. 오늘 하루도 주님의 뜻 안에서 살아가게 하시고, 주님의 사랑을 이웃에게 전할 수 있게 하여 주소서. 성모님의 전구를 통하여 간청하나이다. 아멘.', category: '생활기도' },
  { title: '저녁기도', content: '주님, 오늘 하루를 보내며 감사드립니다. 오늘 부족했던 점을 용서하시고, 편안한 밤을 주소서. 오늘 만난 모든 이에게 축복을 내려주소서. 아멘.', category: '생활기도' },
];

// ── Diocese News (48) ──
const dioceses = [
  '서울대교구', '수원교구', '인천교구', '대전교구',
  '대구대교구', '부산교구', '광주대교구', '전주교구',
  '청주교구', '춘천교구', '마산교구', '원주교구',
  '제주교구', '안동교구', '의정부교구', '군종교구',
];
const dioceseNewsTemplates: [string, string][] = [
  ['사순시기 특별 강좌 프로그램 운영', '2026-03-10'],
  ['2026년 상반기 사제 서품식 거행', '2026-03-08'],
  ['교구 차원 가리타스 운동 전개', '2026-03-05'],
];
const dioceseNews: Record<string, unknown>[] = [];
for (const diocese of dioceses) {
  for (const [titleTemplate, date] of dioceseNewsTemplates) {
    dioceseNews.push({ diocese, title: `[${diocese}] ${titleTemplate}`, createdAt: date });
  }
}

// ── Gallery (12) ──
const gallery: Record<string, unknown>[] = [
  { title: '사순시기 전례 꽃꽂이 - 보라색 장미', category: '전례꽃꽂이', imageUrl: '/images/gallery/flower1.jpg', description: '사순시기를 상징하는 보라색 장미로 장식한 제대 꽃꽂이', createdAt: '2026-03-10' },
  { title: '부활절 전례 꽃꽂이 - 백합', category: '전례꽃꽂이', imageUrl: '/images/gallery/flower2.jpg', description: '부활의 기쁨을 상징하는 흰 백합 꽃꽂이', createdAt: '2026-03-09' },
  { title: '대림시기 전례 꽃꽂이 - 대림환', category: '전례꽃꽂이', imageUrl: '/images/gallery/flower3.jpg', description: '네 개의 초가 놓인 대림환 꽃꽂이', createdAt: '2026-03-08' },
  { title: '최후의 만찬 - 레오나르도 다 빈치', category: '성화', imageUrl: '/images/gallery/art1.jpg', description: '레오나르도 다 빈치의 최후의 만찬 (1495-1498)', createdAt: '2026-03-07' },
  { title: '시스티나 성당 천장화 - 미켈란젤로', category: '성화', imageUrl: '/images/gallery/art2.jpg', description: '미켈란젤로의 시스티나 성당 천장화 중 천지창조', createdAt: '2026-03-06' },
  { title: '수태고지 - 프라 안젤리코', category: '성화', imageUrl: '/images/gallery/art3.jpg', description: '프라 안젤리코의 수태고지 (1438-1445)', createdAt: '2026-03-05' },
  { title: '명동대성당 전경', category: '성당건축', imageUrl: '/images/gallery/church1.jpg', description: '서울 명동대성당의 고딕 양식 외관', createdAt: '2026-03-04' },
  { title: '계산대성당 내부', category: '성당건축', imageUrl: '/images/gallery/church2.jpg', description: '대구 계산대성당의 아름다운 내부 모습', createdAt: '2026-03-03' },
  { title: '전동성당 전경', category: '성당건축', imageUrl: '/images/gallery/church3.jpg', description: '전주 전동성당의 로마네스크 양식 건축물', createdAt: '2026-03-02' },
  { title: '절두산 순교성지', category: '성지', imageUrl: '/images/gallery/holy1.jpg', description: '서울 절두산 순교성지 전경', createdAt: '2026-03-01' },
  { title: '해미순교성지', category: '성지', imageUrl: '/images/gallery/holy2.jpg', description: '충남 해미읍성 순교성지', createdAt: '2026-02-28' },
  { title: '천진암 성지', category: '성지', imageUrl: '/images/gallery/holy3.jpg', description: '경기도 광주 천진암 한국 천주교 발상지', createdAt: '2026-02-27' },
];

// ── Audio Books (10) ──
const audioBooks: Record<string, unknown>[] = [
  { title: '성경 봉독 - 창세기', author: '가톨릭성서모임', duration: '12:30:00', category: '성경' },
  { title: '성경 봉독 - 시편', author: '가톨릭성서모임', duration: '8:45:00', category: '성경' },
  { title: '성경 봉독 - 마태오 복음', author: '가톨릭성서모임', duration: '5:20:00', category: '성경' },
  { title: '어린 왕자와 복음', author: '이해인 수녀', duration: '3:15:00', category: '영성' },
  { title: '작은 꽃 성녀 데레사 자서전', author: '소화 데레사', duration: '6:40:00', category: '성인전' },
  { title: '고백록 - 아우구스티노', author: '성 아우구스티노', duration: '14:20:00', category: '고전' },
  { title: '하느님의 도성', author: '성 아우구스티노', duration: '18:00:00', category: '고전' },
  { title: '십자가의 요한 - 영혼의 어두운 밤', author: '십자가의 성 요한', duration: '4:50:00', category: '영성' },
  { title: '토마스 머튼의 칠층산', author: '토마스 머튼', duration: '10:30:00', category: '영성' },
  { title: '교황 프란치스코 - 복음의 기쁨', author: '교황 프란치스코', duration: '7:15:00', category: '교황문헌' },
];

// ── Realtime News (10) ──
const realtimeNews: Record<string, unknown>[] = [
  { title: '[속보] 교황, 사순시기 특별 메시지 발표 "가난한 이들을 기억하라"', source: '바티칸뉴스', createdAt: '2026-03-10 14:30:00' },
  { title: '서울대교구 WYD 2027 준비위 1차 회의 개최', source: '가톨릭신문', createdAt: '2026-03-10 11:00:00' },
  { title: '전국 주교단, 사회정의 실현 공동선언문 발표', source: '가톨릭평화신문', createdAt: '2026-03-10 09:30:00' },
  { title: '명동성당 사순 특별 전례 안내 - 매주 금요일 십자가의 길', source: '서울대교구', createdAt: '2026-03-09 16:00:00' },
  { title: '가톨릭대학교 신학대학원 2026학년도 후기 모집', source: '가톨릭대학교', createdAt: '2026-03-09 10:00:00' },
  { title: '한국 가톨릭 청년 아시아 연대 회의 참가단 모집', source: '주교회의청년사목위', createdAt: '2026-03-08 15:00:00' },
  { title: '교황청 신앙교리부, 새 문서 "희망의 순례자" 발표', source: '바티칸뉴스', createdAt: '2026-03-08 08:00:00' },
  { title: '전국 성체조배 릴레이 기도운동 3월 일정 공개', source: '가톨릭평화신문', createdAt: '2026-03-07 14:00:00' },
  { title: '가톨릭 사회복지 기관 합동 채용설명회 개최 안내', source: '가톨릭신문', createdAt: '2026-03-07 09:00:00' },
  { title: '절두산 순교성지 특별 전시 "순교자의 길" 개막', source: '절두산순교성지', createdAt: '2026-03-06 11:00:00' },
];

// ── Announcements (5) ──
const announcements: Record<string, unknown>[] = [
  { title: '[안내] 굿뉴스 홈페이지 서버 점검 안내 (3/15 02:00~06:00)', source: '운영팀', createdAt: '2026-03-10' },
  { title: '[업데이트] 매일미사 앱 v3.2 업데이트 안내', source: '개발팀', createdAt: '2026-03-08' },
  { title: '[안내] 2026년 전례력 PDF 다운로드 서비스 오픈', source: '전례팀', createdAt: '2026-03-05' },
  { title: '[공지] 개인정보처리방침 변경 안내', source: '운영팀', createdAt: '2026-03-01' },
  { title: '[이벤트] 성경 퀴즈 이벤트 - 매주 월요일 새 문제 공개', source: '운영팀', createdAt: '2026-02-25' },
];

// ── Main ──
async function main() {
  console.log('Firestore 시딩 시작...\n');

  await batchWrite('users', users);
  await batchWrite('boardPosts', boardPosts);
  await batchWrite('bibleVerses', bibleVerses);
  await batchWrite('dailyMass', dailyMass);
  await batchWrite('saints', saints);
  await batchWrite('news', news);
  await batchWrite('visitors', visitors);
  await batchWrite('banners', banners);
  await batchWrite('quickLinks', quickLinks);
  await batchWrite('hymns', hymns);
  await batchWrite('prayers', prayers);
  await batchWrite('dioceseNews', dioceseNews);
  await batchWrite('gallery', gallery);
  await batchWrite('audioBooks', audioBooks);
  await batchWrite('realtimeNews', realtimeNews);
  await batchWrite('announcements', announcements);

  console.log('\n시딩 완료!');
  process.exit(0);
}

main().catch((err) => {
  console.error('시딩 실패:', err);
  process.exit(1);
});
