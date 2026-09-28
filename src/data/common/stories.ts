import oppenheimerHearing from '../../assets/stories/oppenheimer-hearing.webp'
import oppenheimerHero from '../../assets/stories/oppenheimer-hero.webp'
import type { Story } from '../../types/story'

/**
 * 공통 이야기 seed. 화면에서 직접 고치지 않는다(변경은 퍼소나별 진행 상태에만).
 * TODO: 콘텐츠 사실 검수 — 모든 항목 verified: false. 발표 전에 출처와 대조한다.
 * TODO: 이미지 저작권 — 오펜하이머 이미지는 영화 스틸로 보인다. 공개 배포 전에 출처·사용 가능 여부를 확인한다.
 */
export const STORIES: Story[] = [
  {
    id: 'oppenheimer',
    title: '원자폭탄의 아버지는\n왜 미국의 적이 됐나',
    category: 'person',
    tags: [
      { label: '인물', tone: 'brown' },
      { label: '과학', tone: 'green' },
      { label: '1954년', tone: 'orange' },
    ],
    region: '미국',
    era: '냉전',
    readMinutes: 4,
    mapLabel: '과학',
    subject: '오펜하이머',
    heroImage: { src: oppenheimerHero, alt: '황량한 들판에 서서 먼 곳을 바라보는 모자 쓴 남자의 뒷모습' },
    summary:
      '원자폭탄 개발을 이끈 오펜하이머는 전쟁 영웅이 됐지만, 냉전이 시작되자 자신의 나라로부터 충성심을 의심받았다.',
    summaryDetail:
      '1949년 소련이 원자폭탄 실험에 성공하자 미국은 더 강한 수소폭탄 개발을 서둘렀어요. 개발에 반대 의견을 낸 오펜하이머는 과거 좌파 인사들과의 교류까지 문제가 됐고, 1954년 원자력위원회 청문회 끝에 보안 인가를 잃었어요. 이 결정은 2022년 미국 에너지부가 무효로 돌렸어요.',
    visual: {
      src: oppenheimerHearing,
      alt: '청문회장 탁자 앞에 앉아 있는 남자와 뒤편의 위원들',
      caption: '오펜하이머는 1943년부터 1945년까지 로스앨러모스 초대 연구소장으로 맨해튼 프로젝트를 이끌었다.',
    },
    fact: '1954년 청문회의 쟁점은 형사 유죄가 아니라, 오펜하이머에게 국가 기밀 접근 자격을 계속 허용할 것인지였습니다.',
    terms: [
      {
        term: '‘보안 인가’란?',
        definition:
          '정부가 국가 기밀을 다룰 수 있도록 개인에게 내주는 자격이에요. 신원과 충성도를 심사해 주고, 심사 결과에 따라 거둬들일 수도 있어요.',
      },
    ],
    sources: ['미국 에너지부', '미국 국립문서기록관리청'],
    next: {
      storyId: 'hydrogen-bomb',
      title: '오펜하이머는 왜\n수소폭탄에 반대했을까?',
      description: '더 강한 폭탄을 둘러싼 과학자와 국가의 선택',
    },
    connectionIntro: {
      title: '한 과학자, 세 갈래의 역사',
      description: '오펜하이머의 선택은 비밀 도시 로스앨러모스와 최초의 핵실험, 냉전의 군비 경쟁으로 이어집니다.',
    },
    connections: [
      { storyId: 'los-alamos', type: '장소', title: '비밀 도시 로스앨러모스', description: '지도에도 없던 원자폭탄 연구소' },
      { storyId: 'trinity-test', type: '사건', title: '1945년 트리니티 실험', description: '인류 최초의 핵폭발이 남긴 것' },
      { storyId: 'hydrogen-bomb', type: '논쟁', title: '수소폭탄을 둘러싼 선택', description: '더 강한 폭탄에 반대한 과학자들' },
    ],
    verified: false,
  },
  {
    id: 'los-alamos',
    title: '지도에 없던 도시,\n로스앨러모스',
    category: 'place',
    tags: [
      { label: '장소', tone: 'brown' },
      { label: '과학', tone: 'green' },
      { label: '1943년', tone: 'orange' },
    ],
    region: '미국',
    era: '제2차 세계대전',
    readMinutes: 3,
    mapLabel: '도시',
    subject: '로스앨러모스',
    summary: '원자폭탄을 만들기 위해 뉴멕시코 고원에 세운 비밀 연구소는, 주소조차 사서함 번호 하나뿐이었다.',
    summaryDetail:
      '1943년 미국은 맨해튼 프로젝트의 핵심 연구소를 뉴멕시코주 외딴 고원에 세웠어요. 과학자와 가족들은 외부와 연락이 제한된 채 살았고, 편지는 한 사서함 번호로 오갔어요.',
    fact: '로스앨러모스 연구소는 1943년 문을 열었고, 오펜하이머가 초대 소장을 맡았습니다.',
    terms: [
      {
        term: '‘맨해튼 프로젝트’란?',
        definition: '제2차 세계대전 중 미국이 영국·캐나다와 함께 추진한 원자폭탄 개발 계획이에요.',
      },
    ],
    sources: ['로스앨러모스 국립연구소', '미국 에너지부'],
    connectionIntro: {
      title: '비밀 도시에서 시작된 이야기',
      description: '로스앨러모스에서 만든 폭탄은 사막의 실험장으로, 그리고 한 과학자의 운명으로 이어집니다.',
    },
    connections: [
      { storyId: 'trinity-test', type: '사건', title: '1945년 트리니티 실험', description: '인류 최초의 핵폭발이 남긴 것' },
      { storyId: 'oppenheimer', type: '인물', title: '원자폭탄의 아버지', description: '전쟁 영웅은 왜 의심받았나' },
    ],
    verified: false,
  },
  {
    id: 'trinity-test',
    title: '사막에 뜬 두 번째 태양,\n트리니티 실험',
    category: 'event',
    tags: [
      { label: '사건', tone: 'brown' },
      { label: '과학', tone: 'green' },
      { label: '1945년', tone: 'orange' },
    ],
    region: '미국',
    era: '제2차 세계대전',
    readMinutes: 3,
    mapLabel: '실험',
    subject: '트리니티 실험',
    summary: '1945년 7월 16일 새벽, 뉴멕시코 사막에서 인류 최초의 핵폭발이 일어났다.',
    summaryDetail:
      '로스앨러모스에서 만든 플루토늄 폭탄을 실제로 터뜨려 본 실험이에요. 실험이 성공한 지 3주 뒤, 미국은 히로시마와 나가사키에 원자폭탄을 떨어뜨렸어요.',
    fact: '트리니티 실험은 1945년 7월 16일 뉴멕시코주 앨라모고도 인근 사막에서 진행됐습니다.',
    terms: [],
    sources: ['미국 에너지부', '미국 국립공원관리청'],
    connectionIntro: {
      title: '한 번의 폭발, 이어진 선택들',
      description: '최초의 핵실험은 전쟁의 끝과 함께 더 큰 무기 경쟁의 시작이 됐습니다.',
    },
    connections: [
      { storyId: 'hydrogen-bomb', type: '논쟁', title: '수소폭탄을 둘러싼 선택', description: '더 강한 폭탄에 반대한 과학자들' },
      { storyId: 'los-alamos', type: '장소', title: '비밀 도시 로스앨러모스', description: '지도에도 없던 원자폭탄 연구소' },
    ],
    verified: false,
  },
  {
    id: 'hydrogen-bomb',
    title: '오펜하이머는 왜\n수소폭탄에 반대했을까?',
    category: 'event',
    tags: [
      { label: '논쟁', tone: 'brown' },
      { label: '냉전', tone: 'green' },
      { label: '1949년', tone: 'orange' },
    ],
    region: '미국',
    era: '냉전',
    readMinutes: 4,
    mapLabel: '정치',
    subject: '수소폭탄 논쟁',
    summary: '소련의 원자폭탄 실험 뒤, 미국 정부의 자문위원들은 더 강한 폭탄을 만드는 데 반대 의견을 냈다.',
    summaryDetail:
      '1949년 오펜하이머가 이끈 원자력위원회 일반자문위원회는 수소폭탄 개발에 반대하는 보고서를 냈어요. 하지만 1950년 트루먼 대통령은 개발을 지시했고, 1952년 미국은 첫 수소폭탄 실험을 했어요.',
    fact: '1949년 일반자문위원회 보고서는 수소폭탄 개발 반대 의견을 담았고, 이 기록은 훗날 오펜하이머 청문회에서 다시 거론됐습니다.',
    terms: [],
    sources: ['미국 에너지부', '미국 국립문서기록관리청'],
    connectionIntro: {
      title: '더 강한 무기 앞의 과학자들',
      description: '수소폭탄 논쟁은 오펜하이머의 청문회로, 냉전의 군비 경쟁으로 이어집니다.',
    },
    connections: [
      { storyId: 'oppenheimer', type: '인물', title: '원자폭탄의 아버지', description: '전쟁 영웅은 왜 의심받았나' },
      { storyId: 'trinity-test', type: '사건', title: '1945년 트리니티 실험', description: '인류 최초의 핵폭발이 남긴 것' },
    ],
    verified: false,
  },
  {
    id: 'prohibition',
    title: '금주법은 어떻게\n마피아를 키웠나',
    category: 'event',
    tags: [
      { label: '사건', tone: 'brown' },
      { label: '사회', tone: 'green' },
      { label: '1920년', tone: 'orange' },
    ],
    region: '미국',
    era: '근대',
    readMinutes: 3,
    mapLabel: '도시',
    subject: '금주법',
    summary: '술을 금지하면 범죄가 줄 거라 믿었지만, 몰래 파는 술이 조직 범죄의 돈줄이 됐다.',
    summaryDetail:
      '미국은 1920년부터 술의 제조와 판매를 금지했어요. 수요는 그대로여서 밀주와 비밀 술집이 늘었고, 시카고의 알 카포네 같은 조직이 큰돈을 벌었어요. 금주법은 1933년 폐지됐어요.',
    fact: '금주법은 수정헌법 제18조로 1920년 시행됐고, 1933년 수정헌법 제21조로 폐지됐습니다.',
    terms: [],
    sources: ['미국 국립문서기록관리청', '미국 의회도서관'],
    connectionIntro: {
      title: '금지가 만든 또 다른 역사',
      description: '도덕을 위한 법이 도시의 밤과 범죄 조직의 모습을 바꿨습니다.',
    },
    connections: [{ storyId: 'oppenheimer', type: '인물', title: '원자폭탄의 아버지', description: '같은 시대, 다른 미국의 얼굴' }],
    verified: false,
  },
  {
    id: 'ibangik',
    title: '제주에서 중국까지?\n표류한 이방익의 대륙 횡단',
    category: 'person',
    tags: [
      { label: '인물', tone: 'brown' },
      { label: '항해', tone: 'green' },
      { label: '1796년', tone: 'orange' },
    ],
    region: '조선',
    era: '조선 후기',
    readMinutes: 4,
    mapLabel: '항해',
    subject: '이방익',
    summary: '바다에서 길을 잃은 제주 무관은 대만 섬에 닿았고, 중국 대륙을 가로질러 조선으로 돌아왔다.',
    summaryDetail:
      '정조 때 제주 출신 무관 이방익은 배를 타고 가다 풍랑을 만나 표류했어요. 대만 부근 섬에 닿은 뒤 중국 여러 지방과 베이징을 거쳐 이듬해 돌아왔고, 정조는 이 여정을 기록으로 남기게 했어요.',
    fact: '이방익의 표류와 귀환 여정은 조선 후기 문헌에 기록으로 남아 있습니다.',
    terms: [],
    sources: ['조선왕조실록', '한국고전번역원'],
    connectionIntro: {
      title: '바다 위에서 넓어진 세계',
      description: '한 사람의 표류는 조선 사람이 본 바깥 세상의 기록이 됐습니다.',
    },
    connections: [{ storyId: 'palace-summer', type: '생활', title: '조선 궁궐의 여름', description: '얼음은 어디서 왔을까' }],
    verified: false,
  },
  {
    id: 'odysseus',
    title: '트로이 전쟁은 끝났는데,\n오디세우스는 왜\n10년 동안 돌아오지 못했을까?',
    category: 'person',
    tags: [
      { label: '인물', tone: 'brown' },
      { label: '신화', tone: 'green' },
      { label: '고대', tone: 'orange' },
    ],
    region: '그리스',
    era: '고대',
    readMinutes: 4,
    mapLabel: '신화',
    subject: '오디세우스',
    summary: '호메로스의 서사시에서 오디세우스는 전쟁이 끝난 뒤에도 10년 동안 바다를 떠돌았다.',
    summaryDetail:
      '『오디세이아』는 트로이 전쟁 뒤 오디세우스가 고향 이타카로 돌아가기까지의 모험을 그린 서사시예요. 신의 분노와 괴물, 유혹이 그의 귀향을 가로막아요. 역사 기록이 아니라 신화라는 점을 함께 알아두면 좋아요.',
    fact: '『오디세이아』는 기원전 8세기 무렵 호메로스의 작품으로 전해지는 서사시입니다.',
    terms: [],
    sources: ['호메로스, 『오디세이아』'],
    connectionIntro: {
      title: '신화와 역사 사이',
      description: '트로이 이야기는 신화이면서, 고고학이 실제 도시를 찾아 나선 계기가 됐습니다.',
    },
    connections: [{ storyId: 'ibangik', type: '항해', title: '표류한 이방익', description: '바다에서 길을 잃은 또 다른 여정' }],
    verified: false,
  },
  {
    id: 'surrender-document',
    title: '광복은 8월 15일인데,\n항복문서는 왜 9월 9일에\n쓰였을까?',
    category: 'event',
    tags: [
      { label: '사건', tone: 'brown' },
      { label: '광복', tone: 'green' },
      { label: '1945년', tone: 'orange' },
    ],
    region: '한국',
    era: '근현대',
    readMinutes: 3,
    mapLabel: '광복',
    subject: '항복문서',
    summary: '일본의 항복 발표는 8월 15일이었지만, 한반도 남쪽의 항복문서 서명은 9월 9일 서울에서 이뤄졌다.',
    summaryDetail:
      '8월 15일 일본 왕이 항복을 발표했고, 9월 2일 도쿄만의 미주리호에서 일본 전체의 항복문서가 조인됐어요. 한반도 남쪽에서는 미군이 들어온 뒤인 9월 9일, 조선총독이 조선총독부 건물에서 항복문서에 서명했어요.',
    fact: '1945년 9월 9일 조선총독부에서 조선총독 아베 노부유키가 미군에 대한 항복문서에 서명했습니다.',
    terms: [],
    sources: ['국사편찬위원회', '국가기록원'],
    connectionIntro: {
      title: '광복 이후의 몇 주',
      description: '해방의 날과 항복의 날 사이에는 한반도의 운명을 바꾼 시간이 있었습니다.',
    },
    connections: [{ storyId: 'oppenheimer', type: '인물', title: '원자폭탄의 아버지', description: '전쟁을 끝낸 무기를 만든 사람' }],
    verified: false,
  },
  {
    id: 'palace-summer',
    title: '수문장 교대식도 멈춘 폭염,\n조선의 궁궐은 여름을\n어떻게 버텼을까?',
    category: 'era',
    tags: [
      { label: '생활', tone: 'brown' },
      { label: '궁궐', tone: 'green' },
      { label: '조선', tone: 'orange' },
    ],
    region: '조선',
    era: '조선',
    readMinutes: 3,
    mapLabel: '궁궐',
    subject: '궁궐의 여름',
    summary: '조선 왕실은 한겨울 한강에서 뜬 얼음을 빙고에 저장했다가 여름에 꺼내 썼다.',
    summaryDetail:
      '겨울에 캔 얼음을 동빙고와 서빙고 같은 얼음 창고에 보관했다가, 여름이 되면 왕실과 관청에 나눠 썼어요. 더위가 심한 날에는 관리들에게 얼음을 내려주기도 했어요.',
    fact: '조선은 얼음 저장과 분배를 맡는 관청을 두고 서울에 동빙고와 서빙고를 운영했습니다.',
    terms: [],
    sources: ['조선왕조실록', '국립고궁박물관'],
    connectionIntro: {
      title: '궁궐의 사계절',
      description: '얼음 한 덩이에도 조선의 제도와 생활이 담겨 있습니다.',
    },
    connections: [{ storyId: 'ibangik', type: '인물', title: '표류한 이방익', description: '정조 시대의 또 다른 이야기' }],
    verified: false,
  },
]
