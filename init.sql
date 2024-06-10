-- --------------------------------------------------------
-- db 생성 및 유저 권한 할당
-- --------------------------------------------------------
create database if not exists playground;

create user if not exists 'players'@'%' identified by 'players';
grant all privileges on playground.* to 'players'@'%';

use playground;

-- --------------------------------------------------------
-- ddl
-- --------------------------------------------------------
drop table if exists tbl_authority;
create table if not exists tbl_authority
(
    -- column level constraints
    authority_code int auto_increment comment '권한식별코드',
    authority_name varchar(255) not null comment '권한명',
    authority_desc varchar(4000) not null comment '권한설명',
    -- table level constraints
    constraint pk_authority_code primary key (authority_code)
) engine=innodb comment '권한';

-- tbl_member_role(회원별권한)
drop table if exists tbl_member_role;
create table if not exists tbl_member_role
(
    -- column level constraints
    member_code int auto_increment comment '회원식별코드',
    authority_code int not null comment '권한식별코드',
    -- table level constraints
    constraint pk_member_role primary key (member_code, authority_code)
) engine=innodb comment '회원별권한';

# tbl_GameTable(매장 테이블)
drop table if exists tbl_GameTable;
create table if not exists `tbl_GameTable` (
	`table_code`	int auto_increment primary key 	COMMENT '데이블코드',
	`table_name`	VARCHAR(255)	NOT NULL	COMMENT '테이블명',
	`max_people`	INT	NOT NULL	COMMENT '최대인원',
	`table_price`	INT	NOT NULL	COMMENT '시간요금'
);

# tbl_Notice(공지게시판)
drop table if exists tbl_Notice;
create table if not exists `tbl_Notice` (
	`notice_code`	int auto_increment	COMMENT '게시글코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`notice_title`	VARCHAR(255)	NOT NULL	COMMENT '제목',
	`notice_content`	VARCHAR(255)	NOT NULL	COMMENT '내용',
	`create_date`	VARCHAR(255)	NOT NULL		COMMENT '작성일',
	`modifyed_date`	VARCHAR(255)	NULL	COMMENT '수정일',
	`notice_category`	VARCHAR(255)	NOT NULL	COMMENT '카테고리',
    constraint pk_notice_code primary key (notice_code)
);

# tbl_Review(리뷰게시판)
drop table if exists tbl_Review;
create table if not exists `tbl_Review` (
	`review_code`	int auto_increment	COMMENT '리뷰코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`review_title`	VARCHAR(255)	NOT NULL	COMMENT '제목',
	`review_content`	VARCHAR(255)	NOT NULL	COMMENT '내용',
	`create_date`	VARCHAR(255)	NOT NULL		COMMENT '작성일',
	`modifyed_date`	VARCHAR(255)	NULL	COMMENT '수정일',
	`review_star`	INT	NOT NULL	COMMENT '별점',
    constraint pk_review_code primary key (review_code)
);

# tbl_reply(댓글 게시판)
drop table if exists tbl_reply;
create table if not exists `tbl_reply` (
	`reply_code`	int auto_increment	COMMENT '댓글코드',
	`review_code`	INT	NOT NULL	COMMENT '리뷰코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`reply_content`	VARCHAR(255)	NULL	COMMENT '내용',
	`create_date`	VARCHAR(255)	NOT NULL    COMMENT '작성일',
	`modifyed_date`	VARCHAR(255)	NULL	COMMENT '수정일',
    constraint pk_reply_code primary key (reply_code)

);


drop table if exists tbl_ReviewImage;
create table if not exists `tbl_ReviewImage` (
    `reviewImage_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`image_url`	VARCHAR(255)	NOT NULL	COMMENT '이미지경로',
	`review_code`	int not null 	COMMENT '리뷰코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`image_no`	INT	NOT NULL	DEFAULT 1	COMMENT '업로드순서'
);

drop table if exists tbl_NoticeImage;
create table if not exists `tbl_NoticeImage` (
    `noticeImage_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`image_url`	VARCHAR(255)	NOT NULL	COMMENT '이미지경로',
	`notice_code`	int not null 	COMMENT '게시글코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`image_no`	INT	NOT NULL	DEFAULT 1	COMMENT '업로드순서'
);

drop table if exists tbl_Coopon;
create table if not exists `tbl_Coopon` (
	`coopon_code`	int auto_increment	COMMENT '쿠폰코드',
	`coopon_name`	VARCHAR(255)	NOT NULL	COMMENT '쿠폰명',
	`coopon_type`	VARCHAR(255)	NOT NULL	DEFAULT '금액'	COMMENT '쿠폰종류',
	`coopon_discount`	INT	NOT NULL	COMMENT '할인액',
	`coopon_period`	VARCHAR(255)	NOT NULL	COMMENT '유효기간',
	`Field`	VARCHAR(255)	NULL,
    constraint pk_coopon_code primary key (coopon_code)
);

# tbl_Grade(등급)
drop table if exists tbl_Grade;
create table if not exists `tbl_Grade` (
	`grade_code`	int auto_increment	COMMENT '등급코드',
	`grade_name`	VARCHAR(255)	NOT NULL	COMMENT '등급명',
	`grade_min_pay`	INT	NOT NULL	COMMENT '최소금액',
	`grade_max_pay`	INT	NOT NULL	COMMENT '최대금액',
	`mileage_percent`	INT	NOT NULL	COMMENT '마일리지비율',
    constraint pk_grade_code primary key (grade_code)
);

# tbl_BoardGame(보드게임)
drop table if exists tbl_BoardGame;
create table if not exists `tbl_BoardGame` (
	`boardgame_code`	int auto_increment	primary key 	COMMENT '보드게임코드',
	`boardgame_name`	VARCHAR(255)	NOT NULL	COMMENT '보드게임명',
	`difficulty`	VARCHAR(255)	NOT NULL	COMMENT '난이도',
	`release_date`	VARCHAR(255)	NULL	COMMENT '출시일',
	`min_player`	INT	NOT NULL	COMMENT '최소인원',
	`max_player`	INT	NOT NULL	COMMENT '최대인원',
	`playtime`	INT	NOT NULL	COMMENT '게임시간',
	`boardgame_rule`	VARCHAR(255)	COMMENT '게임설명',
	`boardgame_img_url1`	VARCHAR(255)	COMMENT '게임이미지1',
	`boardgame_img_url2`	VARCHAR(255)	COMMENT '게임이미지2',
	`boardgame_img_url3`	VARCHAR(255)	COMMENT '게임이미지3'
);

drop table if exists tbl_Menu;
create table if not exists `tbl_Menu` (
	`menu_code`	int auto_increment	primary key COMMENT '메뉴코드',
	`menu_name`	VARCHAR(255)	NOT NULL	COMMENT '메뉴명',
	`category`	VARCHAR(255)	NOT NULL	COMMENT '카테고리',
	`menu_content`	VARCHAR(255)	NULL	COMMENT '메뉴설명',
	`menu_price`	INT	NOT NULL	COMMENT '메뉴가격',
	`orderable_status`	BOOLEAN	NOT NULL	DEFAULT false	COMMENT '주문가능상태',
    `menu_img`	VARCHAR(255)	COMMENT '메뉴이미지'
);

drop table if exists tbl_MenuImage;
create table if not exists `tbl_MenuImage` (
    `menuImage_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`image_url`	VARCHAR(255)	NOT NULL	COMMENT '이미지경로',
	`menu_code`	INT	NOT NULL	COMMENT '메뉴코드',
	`image_no`	INT	NOT NULL	DEFAULT 1	COMMENT '업로드순서'
);

drop table if exists tbl_BoardGameImage;
create table if not exists `tbl_BoardGameImage` (
    `boardGameImage_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`image_url`	VARCHAR(255)	NOT NULL	COMMENT '이미지경로',
	`boardgame_code`	VARCHAR(255)	NOT NULL	COMMENT '보드게임코드',
	`image_no`	INT	NOT NULL	DEFAULT 1	COMMENT '업로드순서'
);

drop table if exists tbl_Order;
create table if not exists `tbl_Order` (
	`order_code`	int auto_increment	COMMENT '주문코드',
	`order_date`	VARCHAR(255)	NOT NULL		COMMENT '주문일자',
	`order_time`	VARCHAR(255)	NOT NULL		COMMENT '주문시간',
	`order_total_pay`	INT	NOT NULL	COMMENT '총주문금액',
    constraint pk_order_code primary key (order_code)
);

drop table if exists tbl_Member;
create table if not exists `tbl_Member` (
	`member_code`	int auto_increment	COMMENT '회원코드',
	`member_id`	VARCHAR(255)	NOT NULL	COMMENT '회원아이디',
	`member_password`	VARCHAR(255)	NOT NULL	COMMENT '비밀번호',
	`member_nickname`	VARCHAR(255)	NOT NULL	COMMENT '닉네임',
	`member_birth`	VARCHAR(255)	NOT NULL	COMMENT '생년월일',
	`member_phone_number`	VARCHAR(255)	NOT NULL	COMMENT '연락처',
	`member_address`	VARCHAR(255)	NULL	COMMENT '주소',
	`member_email`	VARCHAR(255)	NULL	COMMENT '이메일',
	`member_visit_count`	INT	NULL	COMMENT '방문횟수',
    constraint pk_member_code primary key (member_code)
);

drop table if exists tbl_Payment;
create table if not exists `tbl_Payment` (
	`payment_code`	int auto_increment	COMMENT '결제코드',
	`payment_date`	VARCHAR(255)	NOT NULL		COMMENT '결제일',
	`payment_datetime`	VARCHAR(255)	NOT NULL		COMMENT '결제시간',
	`payment_total`	INT	NOT NULL	COMMENT '결제금액',
	`payment_type`	VARCHAR(255)	NOT NULL	COMMENT '결제구분',
	`mileage_get_point`	INT	NULL	COMMENT '마일리지적립금액',
	`mileage_used_point`	INT	NULL	COMMENT '마일리지사용금액',
    constraint pk_payment_code primary key (payment_code)
);

drop table if exists tbl_MemberCoopon;
create table if not exists `tbl_MemberCoopon` (
    `memberCoopoon_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`coopon_code`	INT	NOT NULL	COMMENT '쿠폰코드',
	`payment_code`	INT	NOT NULL	COMMENT '결제코드',
	`coopon_state`	BOOLEAN	NOT NULL	COMMENT '쿠폰사용여부'
);

drop table if exists tbl_Store;
create table if not exists `tbl_Store` (
	`store_code`	int auto_increment	COMMENT '매장코드',
	`store_name`	VARCHAR(255)	NOT NULL	COMMENT '매장명',
	`store_location`	VARCHAR(255)	NOT NULL	COMMENT '매장위치',
	`open_time`	VARCHAR(255)	NOT NULL	COMMENT '영업시작시간',
	`close_time`	VARCHAR(255)	NOT NULL	COMMENT '영업마감시간',
	`closed_day`	VARCHAR(255)	NOT NULL	DEFAULT '연중무휴'	COMMENT '휴무일',
    constraint pk_store_code primary key (store_code)
);

drop table if exists tbl_Manager;
create table if not exists `tbl_Manager` (
    `manager_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`member_code`	INT	NOT NULL UNIQUE COMMENT '회원코드',
	`store_code`	INT	NOT NULL UNIQUE COMMENT '매장코드'
);

drop table if exists tbl_StoreMenu;
create table if not exists `tbl_StoreMenu` (
    `storeMenu_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`menu_code`	INT	NOT NULL	COMMENT '메뉴코드',
	`menu_count`	INT	NOT NULL	COMMENT '메뉴수량'
);

drop table if exists tbl_StoreBoardGame;
create table if not exists `tbl_StoreBoardGame` (
    `storeBoardGame_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
    `store_code`	INT	NOT NULL	COMMENT '매장코드',
	`boardgame_code`	VARCHAR(255)	NOT NULL	COMMENT '보드게임코드',
	`boardgame_count`	INT	NOT NULL	COMMENT '보드게임수량',
	`boardgame_location`	VARCHAR(255)	NOT NULL	COMMENT '보드게임위치'
);

drop table if exists tbl_StoreGameTable;
create table if not exists `tbl_StoreGameTable` (
    `storeGameTable_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드'
);

drop table if exists tbl_OrderMenu;
create table if not exists `tbl_OrderMenu` (
    `orderMenu_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드',
	`menu_code`	INT	NOT NULL	COMMENT '메뉴코드',
	`order_code`	INT	NOT NULL	COMMENT '주문코드',
	`order_count`	INT	NOT NULL	COMMENT '주문수량'
);

drop table if exists tbl_OrderPayment;
create table if not exists `tbl_OrderPayment` (
    `orderPayment_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`payment_code`	INT	NOT NULL	COMMENT '결제코드',
	`order_code`	INT	NOT NULL	COMMENT '주문코드'
);

drop table if exists tbl_MemberGrade;
create table if not exists `tbl_MemberGrade` (
    `memberGrade_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`grade_code`	INT	NOT NULL
);

drop table if exists tbl_reservation;
create table if not exists `tbl_reservation` (
	`reservation_code`	int auto_increment	COMMENT '예약코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`reservation_date`	VARCHAR(255)	NOT NULL	COMMENT '예약일자',
	`reservation_datetime`	VARCHAR(255)	NOT NULL	COMMENT '예약일시',
	`reservation_state`	VARCHAR(255)	NOT NULL	COMMENT '예약상태',
	`reservation_modify_date`	VARCHAR(255)	NULL	COMMENT '수정일자',
	`reservation_modify_datetime`	VARCHAR(255)	NULL	COMMENT '수정일시',
	`start_time`	VARCHAR(255)	NOT NULL	COMMENT '사용시작시간',
	`end_time`	VARCHAR(255)	NOT NULL	COMMENT '사용종료시간',
    constraint pk_reservation_code primary key (reservation_code)
);

drop table if exists tbl_StoreReservation;
create table if not exists `tbl_StoreReservation` (
    `storeReservation_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`reservation_code`	INT	NOT NULL	COMMENT '에약코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드'
);

drop table if exists tbl_reservationPayment;
create table if not exists `tbl_reservationPayment` (
    `reservationPayment_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`reservation_code`	INT	NOT NULL	COMMENT '에약코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드',
	`payment_code`	INT	NOT NULL	COMMENT '결제코드'
);

drop table if exists tbl_GamePayment;
create table if not exists `tbl_GamePayment` (
    `GamePayment_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드',
	`payment_code`	INT	NOT NULL	COMMENT '결제코드'
);


-- --------------------------------------------------------
-- dml
-- --------------------------------------------------------

# 회원 테이블
INSERT INTO tbl_member (member_id, member_nickname, member_password, member_email, member_birth, member_phone_number, member_address) VALUES
        ('admin', '관리자', '$2a$10$COvazywgZPXseeKaYhruh.pAYYfcSeGO5aSrHOsLZN0X8joNwW2dW', 'players@gmail.com', '1992-08-31','010-1234-1234', '서울시 서대문구 연희동');
INSERT INTO tbl_member (member_id, member_nickname, member_password, member_email, member_birth, member_phone_number, member_address) VALUES
      ('manager01', '매니저', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager01@naver.com', '1992-08-31','010-1234-1234', '서울시 서대문구 연희동');
INSERT INTO tbl_member (member_id, member_nickname, member_password, member_email, member_birth, member_phone_number, member_address) VALUES
      ('manager02', '매니저02', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager02@naver.com', '1993-05-17', '010-2345-2345', '서울시 강남구 역삼동'),
      ('manager03', '매니저03', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager03@naver.com', '1991-12-22', '010-3456-3456', '서울시 마포구 홍대동'),
      ('manager04', '매니저04', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager04@naver.com', '1990-03-09', '010-4567-4567', '서울시 용산구 한남동'),
      ('manager05', '매니저05', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager05@naver.com', '1989-11-05', '010-5678-5678', '서울시 송파구 가락동'),
      ('manager06', '매니저06', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager06@naver.com', '1994-07-13', '010-6789-6789', '서울시 서초구 서초동'),
      ('manager07', '매니저07', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager07@naver.com', '1992-02-14', '010-7890-7890', '서울시 강동구 천호동'),
      ('manager08', '매니저08', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager08@naver.com', '1995-08-25', '010-8901-8901', '서울시 관악구 봉천동'),
      ('manager09', '매니저09', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager09@naver.com', '1990-10-10', '010-9012-9012', '서울시 구로구 구로동'),
      ('manager10', '매니저10', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager10@naver.com', '1988-04-12', '010-0123-0123', '서울시 은평구 녹번동'),
      ('manager11', '매니저11', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager11@naver.com', '1993-01-03', '010-1234-5678', '서울시 서대문구 북가좌동'),
      ('manager12', '매니저12', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager12@naver.com', '1994-09-14', '010-2345-6789', '서울시 노원구 상계동'),
      ('manager13', '매니저13', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager13@naver.com', '1992-11-23', '010-3456-7890', '서울시 중랑구 면목동'),
      ('manager14', '매니저14', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager14@naver.com', '1989-07-19', '010-4567-8901', '서울시 동대문구 청량리동'),
      ('manager15', '매니저15', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager15@naver.com', '1995-05-05', '010-5678-9012', '서울시 성북구 정릉동'),
      ('manager16', '매니저16', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager16@naver.com', '1991-03-30', '010-6789-0123', '서울시 도봉구 쌍문동'),
      ('manager17', '매니저17', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager17@naver.com', '1990-08-18', '010-7890-1234', '서울시 강북구 수유동'),
      ('manager18', '매니저18', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager18@naver.com', '1993-12-02', '010-8901-2345', '서울시 중구 명동'),
      ('manager19', '매니저19', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager19@naver.com', '1992-04-17', '010-9012-3456', '서울시 종로구 삼청동'),
      ('manager20', '매니저20', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'manager20@naver.com', '1989-06-06', '010-0123-4567', '서울시 동작구 흑석동');
INSERT INTO tbl_member (member_id, member_nickname, member_password, member_email, member_birth, member_phone_number, member_address) VALUES
      ('user01', '유저01', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user01@naver.com', '2004-05-28','010-1234-1234', '서울시 서대문구 연희동');
INSERT INTO tbl_member (member_id, member_nickname, member_password, member_email, member_birth, member_phone_number, member_address) VALUES
    ('user02', '유저02', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user02@naver.com', '2002-03-15','010-1234-5678', '서울시 강남구 삼성동'),
    ('user03', '유저03', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user03@naver.com', '1998-11-23','010-2345-6789', '서울시 마포구 상암동'),
    ('user04', '유저04', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user04@naver.com', '1995-08-07','010-3456-7890', '서울시 용산구 이태원동'),
    ('user05', '유저05', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user05@naver.com', '2000-01-29','010-4567-8901', '서울시 송파구 잠실동'),
    ('user06', '유저06', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user06@naver.com', '2001-05-14','010-5678-9012', '서울시 서초구 반포동'),
    ('user07', '유저07', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user07@naver.com', '1997-09-22','010-6789-0123', '서울시 성동구 성수동'),
    ('user08', '유저08', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user08@naver.com', '1999-12-05','010-7890-1234', '서울시 동대문구 회기동'),
    ('user09', '유저09', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user09@naver.com', '2003-07-19','010-8901-2345', '서울시 강북구 수유동'),
    ('user10', '유저10', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user10@naver.com', '2004-10-02','010-9012-3456', '서울시 은평구 불광동'),
    ('user11', '유저11', '$2a$10$N34MRj4tKVD0AxwvEcC8eOLUyBpXloPKE7Yw.S4/kj5fD1OU5BWsi', 'user11@naver.com', '2005-04-18','010-0123-4567', '서울시 노원구 상계동');

# 권한 테이블 및 회원별 권한 테이블 데이터 추가

INSERT INTO tbl_authority (authority_name, authority_desc) VALUES ('ROLE_ADMIN', '관리자');
INSERT INTO tbl_authority (authority_name, authority_desc) VALUES ('ROLE_MANAGER', '매니저');
INSERT INTO tbl_authority (authority_name, authority_desc) VALUES ('ROLE_USER', '일반회원');

INSERT INTO tbl_member_role (member_code, authority_code) VALUES (1, 1);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (1, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (1, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (2, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (2, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (3, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (3, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (4, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (4, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (5, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (5, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (6, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (6, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (7, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (7, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (8, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (8, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (9, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (9, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (10, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (10, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (11, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (11, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (12, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (12, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (13, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (13, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (14, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (14, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (15, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (15, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (16, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (16, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (17, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (17, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (18, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (18, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (19, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (19, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (20, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (20, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (21, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (21, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (22, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (23, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (24, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (25, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (26, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (27, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (28, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (29, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (30, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (31, 3);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (32, 3);


# 공지게시판 테이블 데이터 추가
INSERT INTO tbl_notice (member_code, notice_title, notice_content, create_date, modifyed_date, notice_category) VALUES
                                                                                                                    (1, '공지사항 제목 1', '공지사항 내용 1', '2024-01-01', '2024-01-01', '공지사항'),
                                                                                                                    (1, '공지사항 제목 2', '공지사항 내용 2', '2024-01-02', '2024-01-02', '이벤트'),
                                                                                                                    (1, '공지사항 제목 3', '공지사항 내용 3', '2024-01-03', '2024-01-03', '자주묻는질문'),
                                                                                                                    (1, '공지사항 제목 4', '공지사항 내용 4', '2024-01-04', '2024-01-04', '공지사항'),
                                                                                                                    (1, '공지사항 제목 5', '공지사항 내용 5', '2024-01-05', '2024-01-05', '이벤트'),
                                                                                                                    (1, '공지사항 제목 6', '공지사항 내용 6', '2024-01-06', '2024-01-06', '자주묻는질문'),
                                                                                                                    (1, '공지사항 제목 7', '공지사항 내용 7', '2024-01-07', '2024-01-07', '공지사항'),
                                                                                                                    (1, '공지사항 제목 8', '공지사항 내용 8', '2024-01-08', '2024-01-08', '이벤트'),
                                                                                                                    (1, '공지사항 제목 9', '공지사항 내용 9', '2024-01-09', '2024-01-09', '자주묻는질문'),
                                                                                                                    (1, '공지사항 제목 10', '공지사항 내용 10', '2024-01-10', '2024-01-10', '공지사항'),
                                                                                                                    (1, '공지사항 제목 11', '공지사항 내용 11', '2024-01-11', '2024-01-11', '이벤트'),
                                                                                                                    (1, '공지사항 제목 12', '공지사항 내용 12', '2024-01-12', '2024-01-12', '자주묻는질문'),
                                                                                                                    (1, '공지사항 제목 13', '공지사항 내용 13', '2024-01-13', '2024-01-13', '공지사항'),
                                                                                                                    (1, '공지사항 제목 14', '공지사항 내용 14', '2024-01-14', '2024-01-14', '이벤트'),
                                                                                                                    (1, '공지사항 제목 15', '공지사항 내용 15', '2024-01-15', '2024-01-15', '자주묻는질문'),
                                                                                                                    (1, '공지사항 제목 16', '공지사항 내용 16', '2024-01-16', '2024-01-16', '공지사항'),
                                                                                                                    (1, '공지사항 제목 17', '공지사항 내용 17', '2024-01-17', '2024-01-17', '이벤트'),
                                                                                                                    (1, '공지사항 제목 18', '공지사항 내용 18', '2024-01-18', '2024-01-18', '자주묻는질문'),
                                                                                                                    (1, '공지사항 제목 19', '공지사항 내용 19', '2024-01-19', '2024-01-19', '공지사항'),
                                                                                                                    (1, '공지사항 제목 20', '공지사항 내용 20', '2024-01-20', '2024-01-20', '이벤트');






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


INSERT INTO `tbl_BoardGame`
(`boardgame_name`, `difficulty`, `release_date`, `min_player`, `max_player`, `playtime`, `boardgame_rule`, `boardgame_img_url1`, `boardgame_img_url2`, `boardgame_img_url3`)
VALUES
    ('7 원더스', 'Medium', '2010-08-10',2,7,30, '플레이어는 고대 7대 불가사의 중 하나를 발전시켜 문명을 발전시킵니다.','c7c0f2e820074f8791d1bae344c95197.png',' ', ' '),
    ('가이아 프로젝트', 'Hard', '2017-09-01',1,4,150, '플레이어는 은하계를 탐험하며 새로운 행성을 개척합니다.','dd3022faf3634fed9e9278e7506e4806.png',' ', ' '),
    ('글룸 헤이븐', 'Hard', '2020-03-05',1,4,120, '플레이어는 북유럽 신화에서 영감을 받은 캐릭터가 되어 전투를 벌입니다.','f419bdbe93c74fee92979ed4d080dbf8.png',' ', ' '),
    ('데드 오브 윈터', 'Hard', '2014-06-30',2,5,120, '플레이어는 좀비 아포칼립스에서 생존을 위해 협력합니다.','f7f5c597a98245a8a314d75b718b86d6.png',' ', ' '),
    ('도미니언', 'Medium', '2008-10-07',2,4,30, '플레이어는 카드 덱을 구성하여 자신의 왕국을 확장하고 점수를 모읍니다.','737be81071284a3691fa10fb18d8bc0d.png',' ', ' '),
    ('듄: 임페리움', 'Hard', '2020-12-18',1,4,120, '플레이어는 듄 세계에서 권력을 쟁취하기 위해 전략을 세웁니다.','65bd405e8fe04c7fac8682f12f3a5565.png',' ', ' '),
    ('디셉션: 홍콩', 'Medium', '2014-11-01',4,12,20, '플레이어는 살인 사건의 범인을 찾기 위해 단서를 모아야 합니다.','9677aa3d822748669fc4aeb0c1f87169.png',' ', ' '),
    ('디텍티브: 모던 크라임 보드게임', 'Hard', '2018-08-02',1,5,120, '플레이어는 현대 범죄를 해결하기 위해 단서를 수집하고 분석합니다.','6fd062c7178147ee8c14ddafaeda4c82.png',' ', ' '),
    ('라이징 선', 'Hard', '2018-03-04',3,5,90, '플레이어는 일본 신화를 배경으로 한 전투와 정치 게임을 즐깁니다.','9afdce13bc604864850099a2cbf5d8ac.png',' ', ' '),
    ('레지스탕스: 아발론', 'Medium', '2012-09-01',5,10,30, '플레이어는 아서 왕의 기사로서 반역자들을 찾아내야 합니다.','2dcf724c5e0d435483c31e71508b68b4.png',' ', ' '),
    ('리스크', 'Medium', '1959-01-01',2,6,120, '플레이어는 세계 정복을 목표로 군사 전략을 펼칩니다.','037d6ab5edfa4e8486bfef006226e2e8.png',' ', ' '),
    ('마르코 폴로의 발자취', 'Medium', '2015-06-01',2,4,60, '플레이어는 마르코 폴로의 여정을 따라 무역과 탐험을 합니다.','e544f51f66784acd90cc2128081924c9.png',' ', ' '),
    ('반지의 제왕', 'Hard', '2000-12-01',2,5,90, '플레이어는 반지의 제왕 이야기를 따라가며 모험을 합니다.','af499f0417e64260933f1b556b21eab3.png',' ', ' '),
    ('배틀라인', 'Easy', '2000-06-01',2,2,30, '플레이어는 고대 전투를 배경으로 전략을 세워 승리를 노립니다.','edb1277ddde240f69fdd61ec509cb6d2.png',' ', ' '),
    ('배틀쉽', 'Easy', '1967-01-01',2,2,30, '플레이어는 상대방의 함대를 찾아 격침시키는 게임입니다.','0abadc6664754e81842c883b2e1c2c89.png',' ', ' '),
    ('블러드 레이지', 'Medium', '2015-03-01',2,4,90, '플레이어는 북유럽 신화를 배경으로 전쟁을 벌입니다.','5284cac71cd34f33b1ea82f8d8757700.png',' ', ' '),
    ('사이쓰', 'Medium', '2016-08-10',1,7,115, '플레이어는 가상의 동유럽에서 자원을 모으고 군대를 키웁니다.','9c2186b732584a3e87a37643839af695.png',' ', ' '),
    ('센추리: 향신료의 길', 'Medium', '2017-06-01',2,5,45, '플레이어는 중세의 향신료 무역을 주제로 다양한 전략을 펼칩니다.','dffba96dfb8f4dd4aedaf9b7f92bbfab.png',' ', ' '),
    ('스크래블', 'Easy', '1938-01-01',2,4,90, '플레이어는 타일을 사용하여 단어를 만들어 점수를 얻습니다.','6b79a2fc25014a76b5c6dfac464aa570.png',' ', ' '),
    ('스타 워즈: 리벨리온', 'Medium', '2016-03-31',2,4,180, '플레이어는 스타 워즈 세계에서 반란군과 제국군의 싸움을 경험합니다.','b6c0fe3bb1da4b22905ff41bea0b9eac.png',' ', ' '),
    ('스플렌더', 'Easy', '2014-03-31',2,4,30, '플레이어는 보석상인이 되어 다양한 보석을 모아 더 큰 가치의 보석으로 교환합니다.','d65c3147c0444ff8954e60b6be80142d.png',' ', ' '),
    ('스플렌더 마블', 'Easy', '2021-01-01',2,4,30, '플레이어는 보석상인이 되어 다양한 보석을 모아 더 큰 가치의 보석으로 교환합니다.','56f6f4524a14455b890f530d63638834.png',' ', ' '),
    ('아그리콜라', 'Hard', '2007-10-12',1,5,120, '플레이어는 중세 농부가 되어 농장을 경영하고 가족을 부양합니다.','12c04f46573d4a58aa001ca5deb29f97.png',' ', ' '),
    ('아이스쿨', 'Easy', '2016-10-14',2,4,30, '플레이어는 펭귄 학교에서 경쟁하며 얼음길을 달립니다.','a4acd4a1deb04ca88824c55d3cb81ffc.png',' ', ' '),
    ('아줄', 'Medium', '2017-10-26',2,4,45, '플레이어는 포르투갈의 아줄레주 타일을 사용해 아름다운 벽화를 완성합니다.','2eaf92ecd41d47b19dd9201762d7cd40.png',' ', ' '),
    ('아컴 호러', 'Hard', '2005-07-01',1,8,180, '플레이어는 탐정이 되어 미스터리한 사건을 해결합니다.','fb455f7176c34fff853e4758187ee574.png',' ', ' '),
    ('어사일럼', 'Medium', '2015-11-01',1,4,90, '플레이어는 정신병원에서 탈출하기 위해 단서를 찾고 퍼즐을 풉니다.','87be2cbca787455bb04f38f6d0127444.png',' ', ' '),
    ('엔데버: 에이지 오브 세일', 'Medium', '2018-09-01',2,5,60, '플레이어는 대항해시대의 선장이 되어 항해와 무역을 합니다.','cf679aefc2054b7ea6cf3a828091fa1e.png',' ', ' '),
    ('엠피리얼 스펠스', 'Medium', '2014-09-18',1,4,60, '플레이어는 다양한 문명을 발전시켜 자원을 모으고 적을 무찔릅니다.','1b0788a6d1a2414a8bb11fff657ca0f4.png',' ', ' '),
    ('이스케이프 룸: 더 게임', 'Hard', '2016-07-01',3,5,60, '플레이어는 제한된 시간 안에 탈출을 목표로 퍼즐을 풉니다.','b851af47b1c24549a421526b945d641e.png',' ', ' '),
    ('임페리얼 설틀', 'Hard', '2021-04-22',1,4,90, '플레이어는 우주 탐사를 통해 새로운 행성을 개척합니다.','c34d3a9081144ce7a64da56c638ef304.png',' ', ' '),
    ('좀비사이드', 'Medium', '2012-08-01',1,6,60, '플레이어는 좀비로 가득한 도시에서 살아남기 위해 협력합니다.','7d4c43eb66ed44f68dbaa003cf61c0b1.png',' ', ' '),
    ('카르카손', 'Easy', '2000-10-01',2,5,35, '플레이어는 타일을 놓아 중세 도시를 건설하고 점수를 얻습니다.','cc43c62a395141329bacf581535a245e.png',' ', ' '),
    ('카탄의 개척자들', 'Medium', '1995-10-01',3,4,90, '플레이어는 카탄 섬의 개척자가 되어 섬의 다양한 자원을 활용해 자신의 마을을 발전시킵니다.','8c6ac53202204bca933b191541010e75.png',' ', ' '),
    ('칼라스', 'Medium', '2005-11-25',2,5,90, '플레이어는 중세 프랑스의 도시를 건설하고 발전시킵니다.','734f0fae35d4439298ec417ad26c423e.png',' ', ' '),
    ('클랭크!', 'Medium', '2016-10-25',2,4,45, '플레이어는 던전을 탐험하며 보물을 모으고 드래곤을 피합니다.','12424df2d12c40e39e5980607da4a883.png',' ', ' '),
    ('클루', 'Easy', '1949-01-01',2,6,45, '플레이어는 미스터리한 살인 사건의 범인을 추리합니다.','fcf318ff141644fba299c68ff104f547.png',' ', ' '),
    ('테라포밍 마스', 'Hard', '2016-10-28',1,5,120, '플레이어는 화성을 개척하여 인간이 살 수 있는 환경으로 변화시킵니다.','90bf568bda484543b851cf51183e9acb.png',' ', ' '),
    ('테오티우아칸: 시티 오브 갓', 'Hard', '2018-09-01',1,4,120, '플레이어는 고대 테오티우아칸 문명을 발전시키기 위해 노력합니다.','9f2c25f7436b447ebfdac71f5726f042.png',' ', ' '),
    ('티켓 투 라이드', 'Easy', '2004-11-15',2,5,60, '플레이어는 철도 노선을 건설하여 다양한 목적지에 연결하는 것을 목표로 합니다.','8246f0e1c72d4c678882ca1dc6aaa6be.png',' ', ' '),
    ('파워 그리드', 'Hard', '2004-10-01',2,6,120, '플레이어는 발전소를 운영하며 전력을 공급하는 것을 목표로 합니다.','205e297c8605449581faa061ad045967.png',' ', ' '),
    ('팬데믹', 'Hard', '2008-06-20',2,4,45, '플레이어는 전 세계를 돌아다니며 전염병을 막기 위한 연구와 치료를 진행합니다.','ece05e8f2d07443aabebad5064fad084.png',' ', ' '),
    ('푸에르토 리코', 'Hard', '2002-10-04',3,5,90, '플레이어는 푸에르토 리코 섬의 총독이 되어 농장을 운영하고 상품을 수출합니다.','5eb644127308497e933a18b817d518ca.png',' ', ' ');






# menu 데이터 삽입
INSERT INTO tbl_menu (menu_code, menu_name, category, menu_content, menu_price, menu_img, orderable_status) VALUES
    (1, '아메리카노', '음료', '신선하게 내린 커피와 뜨거운 물',3000,'b05375afa77c4071be37ad44e584c1fc.png', 1),
    (2, '카푸치노', '음료', '에스프레소와 스팀 밀크 거품',3500,'20f40f05614e4b8d9a36e6d21fdee72a.png', 1),
    (3, '라떼', '음료', '에스프레소와 스팀 밀크',3500,'c13ad68a86c34613a989c851d5bc3808.png', 1),
    (4, '모카', '음료', '에스프레소와 초콜릿 스팀 밀크',4000,'894495e39aa24ea09e6254450c60c777.png', 1),
    (5, '녹차', '음료', '신선하게 우려낸 녹차',3000,'b97da0f72f5746edad22958ddd817cc8.png', 1),
    (6, '허브차', '음료', '다양한 허브 블렌드 차',3000,'3b1b0cd440eb4305acb0b7184a144e37.png', 1),
    (7, '레모네이드', '음료', '신선한 레몬으로 만든 레모네이드',3500,'ffd1be3567334a8fb3f5e2723bcb1ab4.png', 1),
    (8, '스무디', '음료', '신선한 과일과 요거트를 블렌딩한 스무디',4500,'07c492ed0637446ab4462b822e2649c0.png', 1),
    (9, '피자', '음식', '다양한 토핑을 얹은 신선한 피자',12000,'b6b54d610492412095c9b8bf35ab983a.png', 1),
    (10, '파스타', '음식', '다양한 소스를 선택할 수 있는 파스타',10000,'15ddda2cb40345da90fd5d305f2299e9.png', 1),
    (11, '샌드위치', '음식', '다양한 재료를 선택할 수 있는 신선한 샌드위치',7000,'070f080a5f874c3fbdbb4039df2bece8.png', 1),
    (12, '샐러드', '음식', '신선한 재료로 만든 다양한 샐러드',8000,'08bb83e665ba4b1e9ecd6bbba1bcf835.png', 1),
    (13, '나초', '간식', '치즈와 살사를 곁들인 바삭한 나초',6000,'18cec196250d4e8583268a0a779d7763.png', 1),
    (14, '프렌치 프라이', '간식', '케첩과 함께 제공되는 바삭한 프렌치 프라이',5000,'2b370260cbce499baf75a8fae3cd29ca.png', 1),
    (15, '치킨 윙', '간식', '디핑 소스와 함께 제공되는 매콤한 치킨 윙',10000,'c9c1b7ea535e4fea8056eea5f28f8e88.png', 1),
    (16, '치즈 스틱', '간식', '마리나라 소스를 곁들인 튀긴 치즈 스틱',7000,'a0af571ed4cb42a684a8080639d2f004.png', 1),
    (17, '초콜릿 케이크', '디저트', '풍부한 초콜릿 케이크와 프로스팅',5000,'7a07d6ab28e44cb1982a0e0fbef569b9.png', 1),
    (18, '아이스크림', '디저트', '다양한 아이스크림 맛',3000,'5b9403279f0f48e89d3a51dae64a7219.png', 1),
    (19, '브라우니', '디저트', '견과류가 들어간 쫀득한 브라우니',4000,'993d4bc622344480952f1c7084544b9f.png', 1),
    (20, '머핀', '디저트', '신선하게 구워낸 머핀',3000,'d4c767b02a0b4d9898c0ee5e97ce2fb6.png', 1);




# store 데이터 삽입
INSERT INTO tbl_store (store_name, store_location, open_time, close_time, closed_day)
VALUES
    ('강남점', '강남', '09:00', '22:00', '연중무휴'),
    ('종로점', '종로', '10:00', '21:00', '연중무휴'),
    ('신촌점', '신촌', '08:00', '23:00', '연중무휴'),
    ('홍대점', '홍대', '10:00', '22:00', '연중무휴'),
    ('이태원점', '이태원', '11:00', '20:00', '연중무휴'),
    ('잠실점', '잠실', '09:30', '21:30', '연중무휴'),
    ('삼성점', '삼성', '08:30', '22:00', '연중무휴'),
    ('서초점', '서초', '09:00', '21:00', '연중무휴'),
    ('대치점', '대치', '10:00', '22:00', '연중무휴'),
    ('역삼점', '역삼', '08:00', '21:00', '연중무휴'),
    ('동대문점', '동대문', '09:30', '22:30', '연중무휴'),
    ('성수점', '성수', '09:00', '22:00', '연중무휴'),
    ('왕십리점', '왕십리', '10:00', '21:30', '연중무휴'),
    ('합정점', '합정', '08:00', '23:00', '연중무휴'),
    ('망원점', '망원', '09:00', '21:00', '연중무휴'),
    ('상수점', '상수', '10:00', '22:00', '연중무휴'),
    ('건대점', '건대', '08:00', '22:00', '연중무휴'),
    ('구로점', '구로', '09:30', '21:00', '연중무휴'),
    ('영등포점', '영등포', '09:00', '23:00', '연중무휴'),
    ('목동점', '목동', '08:30', '22:30', '연중무휴');

# tbl_manager 데이터 삽입
INSERT INTO tbl_manager (member_code, store_code)
VALUES
    (2,1),
    (3,2),
    (4,3),
    (5,4),
    (6,5),
    (7,6),
    (8,7),
    (9,8),
    (10,9),
    (11,10),
    (12,11),
    (13,12),
    (14,13),
    (15,14),
    (16,15),
    (17,16),
    (18,17),
    (19,18),
    (20,19);

# 게임 테이블
INSERT INTO `tbl_GameTable` (`table_name`, `max_people`, `table_price`) VALUES
    ('Table 1', 4, 5000),
    ('Table 2', 6, 7000),
    ('Table 3', 8, 10000),
    ('Table 4', 4, 5000),
    ('Table 5', 6, 7000),
    ('Table 6', 8, 10000),
    ('Table 7', 4, 5000),
    ('Table 8', 6, 7000),
    ('Table 9', 8, 10000),
    ('Table 10', 4, 5000);

# 예약 테이블
INSERT INTO `tbl_reservation` (
    `member_code`,
    `reservation_date`,
    `reservation_datetime`,
    `reservation_state`,
    `reservation_modify_date`,
    `reservation_modify_datetime`,
    `start_time`,
    `end_time`
) VALUES
      (22, '2024-06-01', '2024-05-31 10:00:00', 'Confirmed', NULL, NULL, '10:00', '12:00'),
      (22, '2024-06-08', '2024-06-07 11:00:00', 'Pending', NULL, NULL, '11:00', '13:00'),
      (22, '2024-06-15', '2024-06-14 12:00:00', 'Cancelled', '2024-06-14', '2024-06-13 09:00:00', '12:00', '14:00'),

      (23, '2024-06-02', '2024-06-01 11:00:00', 'Confirmed', NULL, NULL, '11:00', '13:00'),
      (23, '2024-06-09', '2024-06-08 12:00:00', 'Confirmed', NULL, NULL, '12:00', '14:00'),
      (23, '2024-06-16', '2024-06-15 13:00:00', 'Cancelled', '2024-06-15', '2024-06-14 10:00:00', '13:00', '15:00'),

      (24, '2024-06-03', '2024-06-02 12:00:00', 'Cancelled', '2024-06-01', '2024-05-31 09:00:00', '12:00', '14:00'),
      (24, '2024-06-10', '2024-06-09 13:00:00', 'Pending', NULL, NULL, '13:00', '15:00'),
      (24, '2024-06-17', '2024-06-16 14:00:00', 'Confirmed', NULL, NULL, '14:00', '16:00'),
      (24, '2024-06-24', '2024-06-23 15:00:00', 'Cancelled', '2024-06-23', '2024-06-22 12:00:00', '15:00', '17:00'),

      (25, '2024-06-04', '2024-06-03 13:00:00', 'Pending', NULL, NULL, '13:00', '15:00'),
      (25, '2024-06-11', '2024-06-10 14:00:00', 'Confirmed', NULL, NULL, '14:00', '16:00'),
      (25, '2024-06-18', '2024-06-17 15:00:00', 'Confirmed', NULL, NULL, '15:00', '17:00'),
      (25, '2024-06-25', '2024-06-24 16:00:00', 'Pending', NULL, NULL, '16:00', '18:00'),

      (26, '2024-06-05', '2024-06-04 14:00:00', 'Confirmed', NULL, NULL, '14:00', '16:00'),
      (26, '2024-06-12', '2024-06-11 15:00:00', 'Pending', NULL, NULL, '15:00', '17:00'),
      (26, '2024-06-19', '2024-06-18 16:00:00', 'Confirmed', NULL, NULL, '16:00', '18:00'),
      (26, '2024-06-26', '2024-06-25 17:00:00', 'Confirmed', NULL, NULL, '17:00', '19:00'),
      (26, '2024-06-27', '2024-06-26 18:00:00', 'Cancelled', '2024-06-26', '2024-06-25 15:00:00', '18:00', '20:00'),

      (27, '2024-06-06', '2024-06-05 15:00:00', 'Confirmed', NULL, NULL, '15:00', '17:00'),
      (27, '2024-06-13', '2024-06-12 16:00:00', 'Confirmed', NULL, NULL, '16:00', '18:00'),
      (27, '2024-06-20', '2024-06-19 17:00:00', 'Pending', NULL, NULL, '17:00', '19:00'),

      (28, '2024-06-07', '2024-06-06 16:00:00', 'Pending', NULL, NULL, '16:00', '18:00'),
      (28, '2024-06-14', '2024-06-13 17:00:00', 'Confirmed', NULL, NULL, '17:00', '19:00'),
      (28, '2024-06-21', '2024-06-20 18:00:00', 'Cancelled', '2024-06-20', '2024-06-19 15:00:00', '18:00', '20:00'),

      (29, '2024-06-08', '2024-06-07 17:00:00', 'Confirmed', NULL, NULL, '17:00', '19:00'),
      (29, '2024-06-15', '2024-06-14 18:00:00', 'Pending', NULL, NULL, '18:00', '20:00'),
      (29, '2024-06-22', '2024-06-21 19:00:00', 'Confirmed', NULL, NULL, '19:00', '21:00'),
      (29, '2024-06-29', '2024-06-28 20:00:00', 'Confirmed', NULL, NULL, '20:00', '22:00'),

      (30, '2024-06-09', '2024-06-08 18:00:00', 'Cancelled', '2024-06-08', '2024-06-07 14:00:00', '18:00', '20:00'),
      (30, '2024-06-16', '2024-06-15 19:00:00', 'Confirmed', NULL, NULL, '19:00', '21:00'),
      (30, '2024-06-23', '2024-06-22 20:00:00', 'Pending', NULL, NULL, '20:00', '22:00'),

      (31, '2024-06-10', '2024-06-09 19:00:00', 'Confirmed', NULL, NULL, '19:00', '21:00'),
      (31, '2024-06-17', '2024-06-16 20:00:00', 'Confirmed', NULL, NULL, '20:00', '22:00'),
      (31, '2024-06-24', '2024-06-23 21:00:00', 'Cancelled', '2024-06-23', '2024-06-22 18:00:00', '21:00', '23:00'),

      (32, '2024-06-11', '2024-06-10 20:00:00', 'Pending', NULL, NULL, '20:00', '22:00'),
      (32, '2024-06-18', '2024-06-17 21:00:00', 'Confirmed', NULL, NULL, '21:00', '23:00'),
      (32, '2024-06-25', '2024-06-24 22:00:00', 'Cancelled', '2024-06-24', '2024-06-23 19:00:00', '22:00', '00:00');

#매장별 보드게임 테이블
-- store_code 1
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '1', 5, 'A-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '2', 3, 'A-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '3', 10, 'A-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '4', 8, 'A-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '5', 6, 'A-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '6', 7, 'A-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '7', 9, 'A-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '8', 4, 'A-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '9', 11, 'A-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '10', 2, 'A-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '11', 5, 'A-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '12', 8, 'A-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '13', 3, 'A-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '14', 10, 'A-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (1, '15', 6, 'A-15');

-- store_code 2
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '1', 4, 'B-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '2', 5, 'B-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '3', 6, 'B-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '4', 2, 'B-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '5', 3, 'B-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '6', 7, 'B-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '7', 1, 'B-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '8', 5, 'B-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '9', 4, 'B-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '10', 8, 'B-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '11', 6, 'B-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '12', 7, 'B-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (2, '13', 9, 'B-13');

-- store_code 3
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '1', 5, 'C-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '2', 3, 'C-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '3', 10, 'C-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '4', 8, 'C-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '5', 6, 'C-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '6', 7, 'C-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '7', 9, 'C-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '8', 4, 'C-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '9', 11, 'C-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '10', 2, 'C-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '11', 5, 'C-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '12', 8, 'C-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '13', 3, 'C-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '14', 10, 'C-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (3, '15', 6, 'C-15');

-- store_code 4
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '1', 4, 'D-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '2', 5, 'D-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '3', 6, 'D-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '4', 2, 'D-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '5', 3, 'D-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '6', 7, 'D-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '7', 1, 'D-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '8', 5, 'D-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '9', 4, 'D-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '10', 8, 'D-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '11', 6, 'D-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (4, '12', 7, 'D-12');

-- store_code 5
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '1', 5, 'E-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '2', 3, 'E-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '3', 10, 'E-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '4', 8, 'E-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '5', 6, 'E-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '6', 7, 'E-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '7', 9, 'E-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '8', 4, 'E-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '9', 11, 'E-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '10', 2, 'E-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '11', 5, 'E-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '12', 8, 'E-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '13', 3, 'E-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (5, '14', 10, 'E-14');

-- store_code 6
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '1', 4, 'F-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '2', 5, 'F-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '3', 6, 'F-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '4', 2, 'F-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '5', 3, 'F-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '6', 7, 'F-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '7', 1, 'F-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '8', 5, 'F-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '9', 4, 'F-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '10', 8, 'F-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '11', 6, 'F-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '12', 7, 'F-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '13', 9, 'F-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '14', 5, 'F-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (6, '15', 6, 'F-15');

-- store_code 7
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '1', 5, 'G-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '2', 3, 'G-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '3', 10, 'G-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '4', 8, 'G-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '5', 6, 'G-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '6', 7, 'G-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '7', 9, 'G-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '8', 4, 'G-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '9', 11, 'G-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '10', 2, 'G-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '11', 5, 'G-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '12', 8, 'G-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '13', 3, 'G-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (7, '14', 10, 'G-14');

-- store_code 8
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '1', 4, 'H-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '2', 5, 'H-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '3', 6, 'H-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '4', 2, 'H-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '5', 3, 'H-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '6', 7, 'H-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '7', 1, 'H-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '8', 5, 'H-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '9', 4, 'H-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '10', 8, 'H-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '11', 6, 'H-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '12', 7, 'H-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '13', 9, 'H-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '14', 5, 'H-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (8, '15', 6, 'H-15');

-- store_code 9
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '1', 5, 'I-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '2', 3, 'I-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '3', 10, 'I-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '4', 8, 'I-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '5', 6, 'I-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '6', 7, 'I-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '7', 9, 'I-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '8', 4, 'I-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '9', 11, 'I-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '10', 2, 'I-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '11', 5, 'I-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '12', 8, 'I-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '13', 3, 'I-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '14', 10, 'I-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (9, '15', 6, 'I-15');

-- store_code 10
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '1', 4, 'J-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '2', 5, 'J-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '3', 6, 'J-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '4', 2, 'J-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '5', 3, 'J-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '6', 7, 'J-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '7', 1, 'J-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '8', 5, 'J-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '9', 4, 'J-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '10', 8, 'J-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '11', 6, 'J-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (10, '12', 7, 'J-12');

-- store_code 11
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '1', 5, 'K-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '2', 3, 'K-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '3', 10, 'K-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '4', 8, 'K-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '5', 6, 'K-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '6', 7, 'K-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '7', 9, 'K-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '8', 4, 'K-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '9', 11, 'K-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '10', 2, 'K-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '11', 5, 'K-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '12', 8, 'K-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '13', 3, 'K-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '14', 10, 'K-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (11, '15', 6, 'K-15');

-- store_code 12
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '1', 4, 'L-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '2', 5, 'L-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '3', 6, 'L-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '4', 2, 'L-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '5', 3, 'L-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '6', 7, 'L-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '7', 1, 'L-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '8', 5, 'L-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '9', 4, 'L-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '10', 8, 'L-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '11', 6, 'L-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '12', 7, 'L-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (12, '13', 9, 'L-13');

-- store_code 13
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '1', 5, 'M-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '2', 3, 'M-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '3', 10, 'M-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '4', 8, 'M-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '5', 6, 'M-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '6', 7, 'M-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '7', 9, 'M-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '8', 4, 'M-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '9', 11, 'M-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '10', 2, 'M-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '11', 5, 'M-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '12', 8, 'M-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '13', 3, 'M-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '14', 10, 'M-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (13, '15', 6, 'M-15');

-- store_code 14
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '1', 4, 'N-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '2', 5, 'N-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '3', 6, 'N-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '4', 2, 'N-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '5', 3, 'N-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '6', 7, 'N-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '7', 1, 'N-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '8', 5, 'N-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '9', 4, 'N-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '10', 8, 'N-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '11', 6, 'N-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '12', 7, 'N-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '13', 9, 'N-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '14', 5, 'N-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (14, '15', 6, 'N-15');

-- store_code 15
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '1', 5, 'O-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '2', 3, 'O-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '3', 10, 'O-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '4', 8, 'O-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '5', 6, 'O-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '6', 7, 'O-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '7', 9, 'O-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '8', 4, 'O-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '9', 11, 'O-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '10', 2, 'O-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '11', 5, 'O-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '12', 8, 'O-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '13', 3, 'O-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '14', 10, 'O-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (15, '15', 6, 'O-15');


-- store_code 16
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '1', 4, 'P-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '2', 5, 'P-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '3', 6, 'P-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '4', 2, 'P-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '5', 3, 'P-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '6', 7, 'P-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '7', 1, 'P-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '8', 5, 'P-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '9', 4, 'P-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '10', 8, 'P-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '11', 6, 'P-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '12', 7, 'P-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '13', 9, 'P-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '14', 5, 'P-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (16, '15', 6, 'P-15');

-- store_code 17
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '1', 5, 'Q-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '2', 3, 'Q-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '3', 10, 'Q-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '4', 8, 'Q-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '5', 6, 'Q-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '6', 7, 'Q-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '7', 9, 'Q-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '8', 4, 'Q-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '9', 11, 'Q-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '10', 2, 'Q-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '11', 5, 'Q-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '12', 8, 'Q-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '13', 3, 'Q-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '14', 10, 'Q-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (17, '15', 6, 'Q-15');


-- store_code 18
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '1', 4, 'R-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '2', 5, 'R-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '3', 6, 'R-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '4', 2, 'R-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '5', 3, 'R-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '6', 7, 'R-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '7', 1, 'R-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '8', 5, 'R-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '9', 4, 'R-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '10', 8, 'R-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '11', 6, 'R-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '12', 7, 'R-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '13', 9, 'R-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '14', 5, 'R-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (18, '15', 6, 'R-15');

-- store_code 19
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '1', 5, 'S-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '2', 3, 'S-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '3', 10, 'S-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '4', 8, 'S-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '5', 6, 'S-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '6', 7, 'S-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '7', 9, 'S-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '8', 4, 'S-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '9', 11, 'S-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '10', 2, 'S-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '11', 5, 'S-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '12', 8, 'S-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '13', 3, 'S-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '14', 10, 'S-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (19, '15', 6, 'S-15');

-- store_code 20
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '1', 4, 'T-1');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '2', 5, 'T-2');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '3', 6, 'T-3');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '4', 2, 'T-4');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '5', 3, 'T-5');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '6', 7, 'T-6');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '7', 1, 'T-7');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '8', 5, 'T-8');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '9', 4, 'T-9');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '10', 8, 'T-10');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '11', 6, 'T-11');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '12', 7, 'T-12');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '13', 9, 'T-13');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '14', 5, 'T-14');
INSERT INTO `tbl_StoreBoardGame` (`store_code`, `boardgame_code`, `boardgame_count`, `boardgame_location`) VALUES (20, '15', 6, 'T-15');



# 매장별 게임테이블
-- store_code 1
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (1, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (1, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (1, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (1, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (1, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (1, 6);

-- store_code 2
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (2, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (2, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (2, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (2, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (2, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (2, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (2, 7);

-- store_code 3
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 8);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (3, 9);

-- store_code 4
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (4, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (4, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (4, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (4, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (4, 5);

-- store_code 5
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (5, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (5, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (5, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (5, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (5, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (5, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (5, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (5, 8);

-- store_code 6
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 8);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 9);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (6, 10);

-- store_code 7
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (7, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (7, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (7, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (7, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (7, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (7, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (7, 7);

-- store_code 8
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 8);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 9);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (8, 10);

-- store_code 9
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (9, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (9, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (9, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (9, 4);

-- store_code 10
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (10, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (10, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (10, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (10, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (10, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (10, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (10, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (10, 8);

-- store_code 11
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (11, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (11, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (11, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (11, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (11, 5);

-- store_code 12
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (12, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (12, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (12, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (12, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (12, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (12, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (12, 7);

-- store_code 13
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (13, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (13, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (13, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (13, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (13, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (13, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (13, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (13, 8);

-- store_code 14
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (14, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (14, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (14, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (14, 4);

-- store_code 15
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (15, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (15, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (15, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (15, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (15, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (15, 6);

-- store_code 16
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 8);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (16, 9);

-- store_code 17
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 8);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 9);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (17, 10);

-- store_code 18
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (18, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (18, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (18, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (18, 4);

-- store_code 19
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (19, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (19, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (19, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (19, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (19, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (19, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (19, 7);

-- store_code 20
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 1);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 2);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 3);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 4);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 5);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 6);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 7);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 8);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 9);
INSERT INTO `tbl_StoreGameTable` (`store_code`, `table_code`) VALUES (20, 10);


# 매장별 메뉴 테이블
-- store_code 1
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 2, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 3, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 4, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 5, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 6, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 7, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 8, 9);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 9, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 10, 2);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 11, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 12, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 13, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 14, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (1, 15, 5);

-- store_code 2
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 1, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 2, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 3, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 4, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 5, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 6, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 7, 2);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 8, 9);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 9, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 10, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 11, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 12, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 13, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (2, 14, 7);

-- store_code 3
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 2, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 3, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 4, 2);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 5, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 6, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 7, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 8, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 9, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 10, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 11, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 12, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (3, 13, 2);

-- store_code 4
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 1, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 2, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 3, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 4, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 5, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 6, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 7, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 8, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 9, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 10, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 11, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (4, 12, 7);

-- store_code 5
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 2, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 3, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 4, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 5, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 6, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 7, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 8, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 9, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 10, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 11, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 12, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 13, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (5, 14, 7);

-- store_code 6
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 1, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 2, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 3, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 4, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 5, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 6, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 7, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 8, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 9, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 10, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 11, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 12, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (6, 13, 8);

-- store_code 7
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 1, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 2, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 3, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 4, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 5, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 6, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 7, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 8, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 9, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 10, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 11, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (7, 12, 3);

-- store_code 8
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 2, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 3, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 4, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 5, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 6, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 7, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 8, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 9, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 10, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 11, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 12, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 13, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (8, 14, 7);

-- store_code 9
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 1, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 2, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 3, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 4, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 5, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 6, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 7, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 8, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 9, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 10, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 11, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (9, 12, 4);

-- store_code 10
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 2, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 3, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 4, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 5, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 6, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 7, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 8, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 9, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 10, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 11, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 12, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 13, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (10, 14, 7);

-- store_code 11
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 1, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 2, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 3, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 4, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 5, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 6, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 7, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 8, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 9, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 10, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 11, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (11, 12, 4);

-- store_code 12
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 2, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 3, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 4, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 5, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 6, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 7, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 8, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 9, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 10, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 11, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 12, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 13, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (12, 14, 7);

-- store_code 13
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 1, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 2, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 3, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 4, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 5, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 6, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 7, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 8, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 9, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 10, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 11, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (13, 12, 4);

-- store_code 14
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 2, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 3, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 4, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 5, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 6, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 7, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 8, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 9, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 10, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 11, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 12, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 13, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (14, 14, 7);

-- store_code 15
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (15, 13, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (15, 14, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (15, 15, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (15, 16, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (15, 17, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (15, 18, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (15, 19, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (15, 20, 4);

-- store_code 16
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 15, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 16, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 17, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 18, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 19, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 20, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 1, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 2, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 3, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (16, 4, 8);

-- store_code 17
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 15, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 16, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 17, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 18, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 19, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 20, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 2, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 3, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 4, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 5, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (17, 6, 3);

-- store_code 18
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 15, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 16, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 17, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 18, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 19, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 20, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 1, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 2, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 3, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 4, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (18, 5, 3);

-- store_code 19
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 15, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 16, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 17, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 18, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 19, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 20, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 1, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 2, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 3, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 4, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 5, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (19, 6, 3);

-- store_code 20
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 15, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 16, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 17, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 18, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 19, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 20, 8);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 1, 6);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 2, 5);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 3, 4);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 4, 7);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 5, 3);
INSERT INTO `tbl_StoreMenu` (`store_code`, `menu_code`, `menu_count`) VALUES (20, 6, 8);

# 매장별 예약
INSERT INTO `tbl_StoreReservation` (
    `reservation_code`,
    `member_code`,
    `store_code`,
    `table_code`
) VALUES
    (1, 22, 1, 1),
    (2, 22, 1, 2),
    (3, 22, 1, 3),

    (4, 23, 2, 1),
    (5, 23, 2, 2),
    (6, 23, 2, 3),

    (7, 24, 3, 1),
    (8, 24, 3, 2),
    (9, 24, 3, 3),
    (10, 24, 3, 4),

    (11, 25, 4, 1),
    (12, 25, 4, 2),
    (13, 25, 4, 3),
    (14, 25, 4, 4),

    (15, 26, 5, 1),
    (16, 26, 5, 2),
    (17, 26, 5, 3),
    (18, 26, 5, 4),
    (19, 26, 5, 5),

    (20, 27, 6, 1),
    (21, 27, 6, 2),
    (22, 27, 6, 3),

    (23, 28, 7, 1),
    (24, 28, 7, 2),
    (25, 28, 7, 3),

    (26, 29, 8, 1),
    (27, 29, 8, 2),
    (28, 29, 8, 3),
    (29, 29, 8, 4),

    (30, 30, 9, 1),
    (31, 30, 9, 2),
    (32, 30, 9, 3),

    (33, 31, 10, 1),
    (34, 31, 10, 2),
    (35, 31, 10, 3),

    (36, 32, 11, 1),
    (37, 32, 11, 2),
    (38, 32, 11, 3);
