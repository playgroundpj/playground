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