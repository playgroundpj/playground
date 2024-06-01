# 회원 테이블
INSERT INTO tbl_member (member_id, member_nickname, member_password, member_email, member_birth, member_phone_number, member_address) VALUES ('admin', '관리자', '$2a$10$COvazywgZPXseeKaYhruh.pAYYfcSeGO5aSrHOsLZN0X8joNwW2dW', 'players@gmail.com', '1992-08-31','010-1234-1234', '서울시 서대문구 연희동');
INSERT INTO tbl_member (member_id, member_nickname, member_password, member_email, member_birth, member_phone_number, member_address) VALUES ('manager01', '매니저', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager01@naver.com', '1992-08-31','010-1234-1234', '서울시 서대문구 연희동');
INSERT INTO tbl_member (member_id, member_nickname, member_password, member_email, member_birth, member_phone_number, member_address) VALUES ('user01', '유저01', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager01@naver.com', '2004-05-28','010-1234-1234', '서울시 서대문구 연희동');


# 권한 테이블 및 회원별 권한 테이블 데이터 추가

INSERT INTO tbl_authority (authority_name, authority_desc) VALUES ('ROLE_ADMIN', '관리자');
INSERT INTO tbl_authority (authority_name, authority_desc) VALUES ('ROLE_MANAGER', '매니저');
INSERT INTO tbl_authority (authority_name, authority_desc) VALUES ('ROLE_USER', '일반회원');

INSERT INTO tbl_member_role (member_code, authority_code) VALUES (1, 1);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (1, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (1, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (2, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (2, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (3, 3);




# boadgame dml
# INSERT INTO tbl_boardgame (boardgame_name, difficulty, release_date, min_player, max_player, playtime, boardgame_rule)
# VALUES
# ('카탄', '중간', '1995-01-01', 3, 4, 60, '플레이어들은 자원을 모아 도로, 정착지, 도시를 건설합니다.'),
# ('티켓 투 라이드', '쉬움', '2004-01-01', 2, 5, 45, '플레이어들은 기차 카드를 모아 지도상의 철도 노선을 차지합니다.'),
# ('팬데믹', '어려움', '2008-01-01', 2, 4, 45, '플레이어들은 협력하여 질병이 확산되는 것을 막고 치료제를 개발합니다.'),
# ('카르카손', '쉬움', '2000-01-01', 2, 5, 35, '플레이어들은 타일을 배치하여 도시, 도로, 들판을 확장합니다.'),
# ('7 원더스', '중간', '2010-01-01', 2, 7, 30, '플레이어들은 카드를 드래프트하여 문명을 발전시키고 불가사의를 건설합니다.'),
# ('아줄', '쉬움', '2017-01-01', 2, 4, 30, '플레이어들은 타일을 드래프트하여 개인 보드에 패턴을 완성합니다.'),
# ('테라포밍 마스', '어려움', '2016-01-01', 1, 5, 120, '플레이어들은 자원 관리를 통해 화성을 거주 가능한 행성으로 변화시키기 위해 경쟁합니다.'),
# ('스플렌더', '쉬움', '2014-01-01', 2, 4, 30, '플레이어들은 보석을 모아 카드를 개발하여 명성을 쌓습니다.'),
# ('도미니언', '중간', '2008-01-01', 2, 4, 30, '플레이어들은 승점 카드를 얻기 위해 덱을 빌드합니다.'),
# ('글룸헤이븐', '어려움', '2017-01-01', 1, 4, 120, '플레이어들은 전술 전투의 지속적인 세계에서 시나리오를 통해 캠페인을 진행합니다.'),
# ('윙스팬', '중간', '2019-01-01', 1, 5, 40, '플레이어들은 자신들의 야생 보호구역에 새들을 유치합니다.'),
# ('루트', '어려움', '2018-01-01', 2, 4, 90, '플레이어들은 비대칭적인 파벌을 제어하여 숲 속 왕국을 장악하기 위해 싸웁니다.'),
# ('아그리콜라', '어려움', '2007-01-01', 1, 5, 120, '플레이어들은 땅을 농사짓고 작물을 재배하며 동물을 기릅니다.'),
# ('에버델', '중간', '2018-01-01', 1, 4, 80, '플레이어들은 숲 속 세계에서 동물과 건축물을 사용하여 도시를 건설합니다.'),
# ('코드네임', '쉬움', '2015-01-01', 2, 8, 15, '플레이어들은 한 단어로 힌트를 주어 팀이 올바른 단어를 맞추도록 도와줍니다.'),
# ('사이스', '어려움', '2016-01-01', 1, 7, 115, '플레이어들은 제1차 세계대전 이후 대체 역사적 유럽에서 파벌을 제어하여 영토를 정복합니다.'),
# ('티켓 투 라이드: 유럽', '쉬움', '2005-01-01', 2, 5, 45, '플레이어들은 기차 카드를 모아 유럽 전역의 철도 노선을 차지합니다.'),
# ('스피릿 아일랜드', '어려움', '2017-01-01', 1, 4, 90, '플레이어들은 정착민들로부터 섬을 지키는 영혼들입니다.'),
# ('사그라다', '쉬움', '2017-01-01', 1, 4, 30, '플레이어들은 주사위를 드래프트하여 특정 패턴에 맞게 스테인드글라스 창문을 만듭니다.'),
# ('브래스: 버밍엄', '어려움', '2018-01-01', 2, 4, 120, '플레이어들은 산업 혁명 시기에 산업을 건설하고 네트워크를 구축합니다.'),
# ('패치워크', '쉬움', '2014-01-01', 2, 2, 30, '플레이어들은 개인 보드에 가장 예쁜 퀼트를 만들기 위해 경쟁합니다.'),
# ('부르고뉴의 성', '중간', '2011-01-01', 2, 4, 90, '플레이어들은 타일을 배치하여 자신의 영지를 발전시킵니다.'),
# ('글룸', '중간', '2004-01-01', 2, 4, 60, '플레이어들은 불행한 사건을 통해 자신의 가족을 가장 비참하게 만듭니다.'),
# ('킹도미노', '쉬움', '2016-01-01', 2, 4, 15, '플레이어들은 타일을 드래프트하여 5x5 왕국을 만듭니다.'),
# ('라이징 선', '어려움', '2018-01-01', 3, 5, 120, '플레이어들은 신화적 일본에서 클랜을 제어하여 영토를 장악하기 위해 경쟁합니다.'),
# ('블러드 레이지', '어려움', '2015-01-01', 2, 4, 90, '플레이어들은 라그나로크 전에 영광을 얻기 위해 바이킹 클랜을 제어합니다.'),
# ('딕싯', '쉬움', '2008-01-01', 3, 6, 30, '플레이어들은 번갈아가며 이야기꾼이 되어 이야기에 맞는 이미지를 추측합니다.'),
# ('산토리니', '쉬움', '2016-01-01', 2, 4, 20, '플레이어들은 건물을 세우고 자신의 일꾼을 건물의 세 번째 층에 올려놓으려고 합니다.'),
# ('메이지 나이트', '어려움', '2011-01-01', 1, 4, 240, '플레이어들은 덱 빌딩과 RPG 요소를 사용하여 아틀란티스 세계를 탐험하고 정복합니다.'),
# ('비티컬처', '중간', '2013-01-01', 1, 6, 90, '플레이어들은 포도원을 관리하여 와인을 생산하고 주문을 이행합니다.');