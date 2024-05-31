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

# 공지게시판 테이블 데이터 추가
INSERT INTO tbl_notice (notice_code, member_code, notice_title, notice_content, create_date, modifyed_date, notice_category) VALUES
                                                                                                                                 (1, 1, '공지사항 제목 1', '공지사항 내용 1', '2023-05-01 10:00:00', '2023-05-01 10:00:00', '공지사항'),
                                                                                                                                 (2, 1, '이벤트 제목 1', '이벤트 내용 1', '2023-05-02 11:00:00', '2023-05-02 11:00:00', '이벤트'),
                                                                                                                                 (3, 1, '자주묻는질문 제목 1', '자주묻는질문 내용 1', '2023-05-03 12:00:00', '2023-05-03 12:00:00', '자주묻는질문'),
                                                                                                                                 (4, 1, '공지사항 제목 2', '공지사항 내용 2', '2023-05-04 13:00:00', '2023-05-04 13:00:00', '공지사항'),
                                                                                                                                 (5, 1, '이벤트 제목 2', '이벤트 내용 2', '2023-05-05 14:00:00', '2023-05-05 14:00:00', '이벤트'),
                                                                                                                                 (6, 1, '공지사항 제목 3', '공지사항 내용 3', '2023-05-06 15:00:00', '2023-05-06 15:00:00', '공지사항'),
                                                                                                                                 (7, 1, '자주묻는질문 제목 2', '자주묻는질문 내용 2', '2023-05-07 16:00:00', '2023-05-07 16:00:00', '자주묻는질문'),
                                                                                                                                 (8, 1, '공지사항 제목 4', '공지사항 내용 4', '2023-05-08 17:00:00', '2023-05-08 17:00:00', '공지사항'),
                                                                                                                                 (9, 1, '이벤트 제목 3', '이벤트 내용 3', '2023-05-09 18:00:00', '2023-05-09 18:00:00', '이벤트'),
                                                                                                                                 (10, 1, '공지사항 제목 5', '공지사항 내용 5', '2023-05-10 19:00:00', '2023-05-10 19:00:00', '공지사항'),
                                                                                                                                 (11, 1, '자주묻는질문 제목 3', '자주묻는질문 내용 3', '2023-05-11 20:00:00', '2023-05-11 20:00:00', '자주묻는질문'),
                                                                                                                                 (12, 1, '공지사항 제목 6', '공지사항 내용 6', '2023-05-12 21:00:00', '2023-05-12 21:00:00', '공지사항'),
                                                                                                                                 (13, 1, '이벤트 제목 4', '이벤트 내용 4', '2023-05-13 22:00:00', '2023-05-13 22:00:00', '이벤트'),
                                                                                                                                 (14, 1, '공지사항 제목 7', '공지사항 내용 7', '2023-05-14 23:00:00', '2023-05-14 23:00:00', '공지사항'),
                                                                                                                                 (15, 1, '자주묻는질문 제목 4', '자주묻는질문 내용 4', '2023-05-15 08:00:00', '2023-05-15 08:00:00', '자주묻는질문'),
                                                                                                                                 (16, 1, '공지사항 제목 8', '공지사항 내용 8', '2023-05-16 09:00:00', '2023-05-16 09:00:00', '공지사항'),
                                                                                                                                 (17, 1, '이벤트 제목 5', '이벤트 내용 5', '2023-05-17 10:00:00', '2023-05-17 10:00:00', '이벤트'),
                                                                                                                                 (18, 1, '공지사항 제목 9', '공지사항 내용 9', '2023-05-18 11:00:00', '2023-05-18 11:00:00', '공지사항'),
                                                                                                                                 (19, 1, '자주묻는질문 제목 5', '자주묻는질문 내용 5', '2023-05-19 12:00:00', '2023-05-19 12:00:00', '자주묻는질문'),
                                                                                                                                 (20, 1, '공지사항 제목 10', '공지사항 내용 10', '2023-05-20 13:00:00', '2023-05-20 13:00:00', '공지사항');
